import { useState, useEffect } from "react";
import supabase from "@/supabaseClient";

function CreatContext() {
    const [messages, setMessage] = useState([]);
    useEffect(() => {
        const fetchmessage = async () => {
            const { data, error } = await supabase
                .from('chat')
                .select()
                .range(0, messages.length)
                .order('id', { ascending: false });
            if (error) {
                console.error('Error fetching message:', error);
            } else {
                await setMessage(data);
            }
        }
        fetchmessage();
        
    },[])


    return{
        messages
    }


}

export default CreatContext


