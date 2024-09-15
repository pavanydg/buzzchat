'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import ChatBar from './ChatBar'
import { Chat, Message } from '@/types/chat'
import Chats from './Chats'
import Messages from './Messages'

export default function ChatPage() {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState("")
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [chatId, setChatId] = useState<number>();
  const [messages, setMessages] = useState<Message[]>([]);

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
  }, []);

  useEffect(() => {
    if (!chatId) return;

    console.log(`Subscribing to channel: chat:${chatId}`);

    const channelName = toPusherKey(`chat:${chatId}`);

    pusherClient.subscribe(channelName);

    const messageHandler = (newMessage: Message) => {
      console.log('Received new message:', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };

    pusherClient.bind('incoming-message', messageHandler);

    return () => {
      console.log(`Unsubscribing from channel: chat:${chatId}`);
      pusherClient.unsubscribe(channelName);
      pusherClient.unbind('incoming-message', messageHandler);
    };
  }, [chatId]);


  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    fetchMessages(chat.id);
    setChatId(chat.id)
  }

  const fetchMessages = async (chatId: number) => {
    try {
      const res = await axios.get(`/api/chat/${chatId}`);
      setMessages(res.data.messages);
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  }

  const handleSendMessage = async (newMessage: string) => {
    if (newMessage.trim() !== "" && selectedChat) {
      try {
        const res = await axios.post("/api/sendMessage", {
          text: newMessage,
          recieverId: selectedChat.participants[0].id,
          chatId: selectedChat.id
        })
        if (res.data.message) {
          setMessages(prevMessages => [...prevMessages, res.data.message]);
        }
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <ChatBar />

        <Chats chats={chats} selectedChat={selectedChat} onChatSelect={handleChatSelect} />
      </div>

      <div className="flex-1 flex flex-col">
        <Messages
          selectedChat={selectedChat}
          messages={messages}
          session={session}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  )
}