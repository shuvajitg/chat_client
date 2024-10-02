import { useState, useEffect, useContext, createContext } from "react";
import supabase from "@/supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  let myChannel = null;
  const [messageData, setMessage] = useState([]);
  const [error, setError] = useState("");
  const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
    useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    getMessageAndSubscribe();
    return () => {
      supabase.removeChannel(myChannel);
    };
  }, [myChannel]);

  useEffect(() => {
    if (newIncomingMessageTrigger) {
      handleNewMessage(newIncomingMessageTrigger);
      setNewIncomingMessageTrigger(null);
    }
  }, [newIncomingMessageTrigger]);

  const handleNewMessage = async (payload) => {
    setMessage((pre) => [...pre, payload.new]);
    setNewIncomingMessageTrigger(payload.new);
  };

  const getInitialMessage = async () => {
    if (messageData.length) {
      return;
    }
    const { error, data } = await supabase
      .from("chat")
      .select("*")
      .range(0, 10)
      .order("id", { ascending: false });
    setLoadingInitial(false);
    if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(true);
    await setMessage(data);
  };

  const getMessageAndSubscribe = async () => {
    setError("");
    await getInitialMessage();
    if (!myChannel) {
      myChannel = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "chat",
          },
          (payload) => {
            handleNewMessage(payload);
          }
        )
        .subscribe();
    }
  };

  return (
    <AppContext.Provider
      value={{
        messageData,
        error,
        loadingInitial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };
