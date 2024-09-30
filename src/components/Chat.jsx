import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { useState } from "react";
import { Input } from "./ui/input";
// import { Button } from "./ui/button";
import supabase from "@/supabaseClient";
import toast from "react-hot-toast";
import { BiSend } from "react-icons/bi";
import { IconButton } from "@chakra-ui/react";

function Chat() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handelSend = async (e) => {
    e.preventDefault();
    setIsSending(true);
    if(!message) return;
    try {
      const {error} = await supabase.from("chat").insert([{message: message}])
      setMessage("")
      
      if(error) {
        toast.error("Error sending message:", {duration: 5000})
        throw new error.message
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }finally{
      setIsSending(false);
    }
  }

  return (
    <div className="flex items-center justify-center px-72 mt-10 rounded-sm">
      <Card className="w-full h-auto">
        <CardHeader className='h-20 mb-3 -mt-2'>
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="https://example.com/user-profile-picture.jpg"
              alt="User profile picture"
            />
            <div>
              <span className="text-sm font-semibold">User Name</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs">Last active 1 hour ago</span>
        </CardHeader>
        <CardContent className="h-96 flex gap-2 bg-slate-700 p-4 text-white overflow-hidden ">
          <div className="flex flex-col justify-start items-center space-x-2">
            <img
              className="w-8 h-8 rounded-full"
              src="https://example.com/user-profile-picture.jpg"
              alt="User profile picture"
            />
            <div>
              <span className="text-xs font-semibold">User Name</span>
            </div>
          </div>
          <div className="rounded ">
            <p className=" w-80 px-5 mb-2">
              Hello, how are you today? Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Impedit quae autem deserunt itaque modi
              voluptatem minus, perferendis quisquam inventore aliquid suscipit
              alias? Laboriosam facere, sequi omnis architecto velit temporibus
              nobis!
            </p>
            <span className="text-gray-400 flex justify-end">10:30 AM</span>
          </div>
        </CardContent>
        <CardFooter className="mt-3 flex gap-4">
          <Input
            className="max-w-full h-10 px-4 rounded-md"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <IconButton
              // variant="outline"
              colorScheme="teal"
              aria-label="Send"
              fontSize="25px"
              icon={<BiSend />}
              type="submit"
              disabled={!message}
              isLoading={isSending}
              onClick={handelSend}
            />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Chat;
