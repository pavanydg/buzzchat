import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import NewChat from "./NewChat";


export default function () {

  const [newChat, setNewChat] = useState(false);

  const handleNewChat = () => {
    setNewChat(prev => !prev)
  }

  return <div>
    {!newChat && (
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-center ">
          <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-4 ">Chats</h1>
          </div>
          <div className="flex justify-center border border-black rounded-lg items-center mb-4 p-1  hover:text-white hover:bg-black">
            <div className="cursor-pointer ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div className='text-lg cursor-pointer'
              onClick={handleNewChat}
            >New Chat</div>
          </div>
        </div>
        <div className="relative">
          <Input
            placeholder="Search conversations"
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    )}
    {newChat && (
      <div className="p-4 h-svh">
        <div className="cursor-pointer flex justify-end" 
          onClick={handleNewChat}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 bg-black text-white rounded-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
        <NewChat/>
      </div>
    )}
  </div>
}