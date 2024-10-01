import { useState, useEffect } from "react";
import supabase from "@/supabaseClient";

function CreatContext() {
    const [messageData, setMessage] = useState([]);
    useEffect(() => {
        const fetchmessage = async () => {
            const { data, error } = await supabase
                .from('chat')
                .select()
                .range(0, messageData.length)
                .order('id', { ascending: false });
            if (error) {
                console.error('Error fetching message:', error);
            } else {
                await setMessage(data);
            }
        }
        fetchmessage();
        
    },[messageData.length])


    return{
        messageData
    }


}

export default CreatContext


