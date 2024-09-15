import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Phone, Video, MoreVertical } from "lucide-react"
import { Chat, Message } from '@/types/chat'
import { Session } from 'next-auth'

interface MessagesProps {
  selectedChat: Chat | null
  messages: Message[]
  session: Session | null
  onSendMessage: (message: string) => void
}

export default function Messages({ selectedChat, messages, session, onSendMessage }: MessagesProps) {
  const [newMessage, setNewMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  },[messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    onSendMessage(newMessage)
    setNewMessage("")
  }

  if (!selectedChat) {
    return <div className="flex-1 flex items-center justify-center">Select a chat to start messaging</div>
  }

  return (
    <>
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

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {messages.map((message) => (
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
        ))}
        <div ref={messagesEndRef}></div>
      </ScrollArea>

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
    </>
  )
}