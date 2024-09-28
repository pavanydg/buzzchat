import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import axios from "axios"

export default function (){

    const [conversation,setConversation] = useState("")

    const handleCreateChat = async () => {
        try{
            await axios.post("/api/chat/create",{
                email: conversation
            })
        }
        catch(error){
            console.error("Error adding friend")
        }
    }

    return <div>
        <form onSubmit={handleCreateChat}>
            <div className="flex gap-1 pt-1">
                <Input
                    value={conversation}
                    onChange={(e) => setConversation(e.target.value)}
                    placeholder="Enter email"
                    className="flex-1"
                />
                <Button type="submit"/>
            </div>
        </form>
    </div>
}