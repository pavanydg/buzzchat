import { useState, useEffect } from 'react'
import axios from 'axios'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { Chat, Message } from '@/types/chat'

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {
    if (!selectedChat) return

    const channelName = toPusherKey(`chat:${selectedChat.id}`)
    pusherClient.subscribe(channelName)

    const messageHandler = (newMessage: Message) => {
      setMessages((prev) => [newMessage, ...prev])
    }

    pusherClient.bind('incoming-message', messageHandler)

    fetchMessages(selectedChat.id)

    return () => {
      pusherClient.unsubscribe(channelName)
      pusherClient.unbind('incoming-message', messageHandler)
    }
  }, [selectedChat])

  const fetchChats = async () => {
    try {
      const res = await axios.get("/api/chat")
      setChats(res.data.chats)
    } catch (error) {
      console.error("Error fetching chats:", error)
    }
  }

  const fetchMessages = async (chatId: number) => {
    try {
      const res = await axios.get(`/api/chat/${chatId}`)
      setMessages(res.data.messages)
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = async (text: string) => {
    if (!selectedChat) return

    try {
      const res = await axios.post("/api/sendMessage", {
        text,
        receiverId: selectedChat.participants[0].id,
        chatId: selectedChat.id
      })
      setMessages((prev) => [res.data.message, ...prev])
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return {
    chats,
    selectedChat,
    messages,
    handleChatSelect,
    handleSendMessage
  }
}
