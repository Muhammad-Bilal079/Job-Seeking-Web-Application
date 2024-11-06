import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate message
        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message cannot be empty" });
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],  // Initialize messages array
                lastMessage: null,  // Initialize lastMessage to null
                unread: [receiverId],  // Initialize unread array with receiver
            });
        }

        // Create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Update conversation with new message and last message
        conversation.messages.push(newMessage._id);
        conversation.lastMessage = newMessage._id;

        // Add receiver to unread list if not already present
        if (!conversation.unread.includes(receiverId)) {
            conversation.unread.push(receiverId);
        }

        // Save both conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        // debugging console
        console.log("Updated Conversation: ", conversation);

        // Emit to receiver
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // Send response
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//************************************************* */
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find conversation
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json({ messages: [], lastMessage: null });

        // Update conversation to remove unread status for the current user
        if (conversation.unread.includes(senderId)) {
            conversation.unread = conversation.unread.filter(id => id.toString() !== senderId.toString());
            await conversation.save();
        }

        res.status(200).json({ messages: conversation.messages, lastMessage: conversation.lastMessage });
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
//********************************************** */
export const getConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.find({
            participants: userId,
        })
        .populate("lastMessage")
        .sort({ "lastMessage.createdAt": -1 })
        .lean();

        const formattedConversations = conversations.map(convo => ({
            ...convo,
            isUnread: convo.unread.includes(userId),
        }));

        res.status(200).json(formattedConversations);
    } catch (error) {
        console.error("Error in getConversations:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
