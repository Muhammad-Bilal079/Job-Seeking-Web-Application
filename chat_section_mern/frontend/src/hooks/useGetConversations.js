import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    
    console.log('Conversations before fetching:', conversations); // Console log initial state

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                // Log the fetched data
                console.log("Fetched Data:", data);

                // Sort conversations by last message timestamp
                data.sort((a, b) => {
                    const lastMessageA = a.lastMessage ? new Date(a.lastMessage.createdAt) : new Date(0); // Default to epoch if no lastMessage
                    const lastMessageB = b.lastMessage ? new Date(b.lastMessage.createdAt) : new Date(0); // Default to epoch if no lastMessage
                    return lastMessageB - lastMessageA; // Sort in descending order
                });

                // Log sorted conversations
                console.log("Sorted Conversations:", data);

                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
   
    
};

export default useGetConversations;
