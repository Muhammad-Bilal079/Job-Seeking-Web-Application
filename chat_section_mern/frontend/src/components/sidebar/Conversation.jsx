import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();

    // Check if the conversation is selected and if the user is online
    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id);

    // Check for unread messages
    const hasUnreadMessages = conversation.lastMessage && !conversation.lastMessage.read; // Assuming `read` field exists
    
    //debugging consoles
 
    console.log("selectedConversation", selectedConversation);
    console.log('conversation',conversation);
    console.log("last message id check",conversation.lastMessage);
    console.log("last message id check",conversation.lastMessage?._id);

    // Log conversation details to console for debugging
    console.log(`Conversation with ${conversation.fullName} - Last Message:`, conversation.lastMessage);

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}
                ${hasUnreadMessages ? "bg-yellow-100" : ""} // Highlight if unread
                `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-black-200'>{conversation.fullName}</p>
                        {conversation.lastMessage && (
                            <p className='text-gray-500'>{conversation.lastMessage.message}</p>
                        )}
                    </div>
                    {conversation.lastMessage && (
                        <span className='text-sm text-gray-400'>
                            {new Date(conversation.lastMessage.createdAt).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation;
