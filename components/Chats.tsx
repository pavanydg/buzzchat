"use client"
// import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
ScrollArea
import { Chat } from "@/types/chat";

interface ChatsProps {
    chats: Chat[],
    selectedChat: Chat | null,
    onChatSelect: (chat: Chat) => void
}

export default function Chats({ chats, selectedChat, onChatSelect }: ChatsProps) {
    return (
      <ScrollArea className="">
        {chats.length == 0 && (
          <div className="flex justify-center">
            No conversations found
          </div>
        )}
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`p-4 border-b border-gray-200 hover:border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${
              selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            onClick={() => onChatSelect(chat)}
          >
            {chat.participants.map((participant) => (
              <div key={participant.id} className="flex items-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder-avatar.jpg`} alt={participant.name} />
                  <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h2 className="text-lg font-semibold">{participant.name}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </ScrollArea>
    )
}