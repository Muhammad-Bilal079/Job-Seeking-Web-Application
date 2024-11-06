import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    // Function to set the selected conversation
    setSelectedConversation: (conversation) => {
        console.log("Setting selected conversation:", conversation);  // Debug line
        set({ selectedConversation: conversation });
    },
    
    messages: [],
    // Function to set messages for the selected conversation
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;
