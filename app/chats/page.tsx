"use client"
import ChatPage from "@/components/Chatpage";
import { useSession } from "next-auth/react"

export default function () {
    const session = useSession();
    return <div>
        <ChatPage />
    </div>
}