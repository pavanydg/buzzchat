'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, MoreVertical, Phone, Video, Loader } from "lucide-react"
import { getSession, useSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import { prismaClient } from '@/app/lib/db'
import axios from 'axios'

// Placeholder data
const conversations = [
  { id: 1, name: "Alice Johnson", lastMessage: "See you tomorrow!", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Bob Smith", lastMessage: "How's the project going?", time: "Yesterday", unread: 0 },
  { id: 3, name: "Charlie Brown", lastMessage: "Thanks for your help!", time: "Tuesday", unread: 1 },
  { id: 4, name: "Diana Prince", lastMessage: "Movie night on Friday?", time: "Monday", unread: 0 },
  { id: 5, name: "Ethan Hunt", lastMessage: "Mission accomplished!", time: "25/05/2023", unread: 0 },
]

const messages = [
  { id: 1, sender: "Alice Johnson", content: "Hey there! How's it going?", time: "10:00 AM", isSent: false },
  { id: 2, sender: "You", content: "Hi Alice! I'm doing well, thanks. How about you?", time: "10:05 AM", isSent: true },
  { id: 3, sender: "Alice Johnson", content: "I'm great! Just finished a big project at work.", time: "10:10 AM", isSent: false },
  { id: 4, sender: "You", content: "That's awesome! Congratulations!", time: "10:15 AM", isSent: true },
  { id: 5, sender: "Alice Johnson", content: "Thanks! We should catch up soon. Coffee next week?", time: "10:20 AM", isSent: false },
  { id: 6, sender: "You", content: "Sounds perfect! How about Wednesday afternoon?", time: "10:25 AM", isSent: true },
  { id: 7, sender: "Alice Johnson", content: "Wednesday works for me. See you then!", time: "10:30 AM", isSent: false },
]

interface UserProp {
  id: number;
  name: string;
  email: string;
  password: string | null;
  isOnline: boolean;
  isTyping: boolean;
}
interface Chat {
  id: number,
  participants: Participant[];
}
interface Participant {
  id: number;
  name: string
}
interface Message {
  id: number,
  text: string,
  senderId: number,
  createdAt: string
}

export default function ChatPage() {
  const { data: session } = useSession();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat,setSelectedChat] = useState<Chat | null>(null)
  const [messages,setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await axios.get("/api/chat");
        setChats(res.data.chats);
      } catch (error) {
        console.error("Error while fetching", error);
      }
    }
    fetchChats()
  }, [])

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
  }

  const fetchMessages = async (chatId: number) => {
    try{
      const res = await axios.get(`/api/chat/${chatId}`);
      setMessages(res.data.messages);
    }catch(error){
      console.log("Error fetching messages",error);
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if(newMessage.trim() !== "" && selectedChat){
      try{
        const res = await axios.post("/api/sendMessage",{
          text: newMessage,
          recieverId: selectedChat?.participants[0].id,
          chatId: selectedChat.id
        })
      }catch(error){
        console.error("Error sending message:", error)
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Left sidebar - Conversations list */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4">Chats</h1>
          <div className="relative">
            <Input
              placeholder="Search conversations"
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-5rem)]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b border-gray-200 hover:border-gray-300 dark:border-gray-700 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 ${selectedConversation.id === chat.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }
              `}
              // onClick={() => setSelectedConversation(chat)}
              onClick={() => handleChatSelect(chat)}
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
                    {/* <span className="text-sm text-gray-500 dark:text-gray-400">{participant.time}</span> */}
                  </div>
                  {/* <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conversation.lastMessage}</p> */}
                </div>
                {/* {conversation.unread > 0 && (
                  <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {conversation.unread}
                  </div>
                )} */}
              </div>
              ))}
              
            </div>
          ))}
        </ScrollArea>
      </div>
      
      {/* Right side - Chat messages */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}

        {selectedChat && (
          <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/placeholder-avatar.jpg`} alt={selectedChat.participants[0].name} />
              <AvatarFallback>{selectedChat.participants[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h2 className="ml-4 text-xl font-semibold">{selectedChat.participants[0].name}</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        )}

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          {messages.length != 0 ? (messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.senderId === session?.user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === session?.user?.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.senderId === session?.user?.id ? 'text-primary-foreground' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))): (<div className='flex justify-center'><Loader></Loader></div>)}
        </ScrollArea>

        {/* Message input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}