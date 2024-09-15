import { Search } from "lucide-react";
import { Input } from "./ui/input";


export default function(){
    return <div>
        <div className="p-4 bg-white dark:bg-gray-800">
          <div className='flex justify-between'>
            <h1 className="text-2xl font-bold mb-4">Chats</h1>
            <div>
              <div className='border cursor-pointer'>+ New Chat</div>
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
    </div>
}