import { useState, useEffect, useContext, createContext } from "react";
import supabase from "@/supabaseClient";

const AppContext = createContext({});

// eslint-disable-next-line react/prop-types
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myChannel]);

  useEffect(() => {
    if (newIncomingMessageTrigger) {
      handleNewMessage(newIncomingMessageTrigger);
      setNewIncomingMessageTrigger(null);
    }
  }, [newIncomingMessageTrigger]);

  const handleNewMessage = async (payload) => {
    setMessage((pre) => [...pre, payload.new]);
    // setNewIncomingMessageTrigger(payload.new);
  };

  const getInitialMessage = async () => {
    if (messageData.length) {
      return;
    }
    const { error, data } = await supabase
      .from("chat")
      .select("*")
      .range(0, 10)
      .order("created_at", { ascending: false });
    setLoadingInitial(false);
    if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(true);
    await setMessage(data.reverse());
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

  // const login = async () => {
  //   const auth = 
  // }

  return (
    <AppContext.Provider
      value={{
        messageData,
        error,
        loadingInitial,
        getMessageAndSubscribe
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AppContext as default, AppContextProvider, useAppContext };
