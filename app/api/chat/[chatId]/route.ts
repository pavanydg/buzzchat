import { prismaClient } from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {chatId: string}}){
    const chatId = params.chatId;

    if(!chatId){
        return NextResponse.json({message: "Invalid chat Id"},{status: 400})
    }

    try {
        const messages = await prismaClient.message.findMany({
          where: {
            chatId: parseInt(chatId),
          },
          orderBy: {
            createdAt: 'asc',
          },
          select: {
            id: true,
            text: true,
            senderId: true,
            createdAt: true,
          },
        });
    

        return NextResponse.json({messages})
    }catch(error){
        return NextResponse.json({message: "Internal server error"},{status: 500})
    }
}   