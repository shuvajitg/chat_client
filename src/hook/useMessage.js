import { useState, useEffect } from "react";
import supabase from "@/supabaseClient";

function useMessage() {
  const [messages, setMessage] = useState('');
  useEffect(() => {
    const channel = supabase.channel("real message").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat",
      },
      (payload) => {
        console.log({payload});
        setMessage(pre => [...pre,payload.new]);
      }
    ).subscribe()
    return () => supabase.removeChannel(channel)
  }, [messages.length]);

  return {
    messages
  };
}

export default useMessage;
