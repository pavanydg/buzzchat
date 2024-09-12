import { NEXT_AUTH } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await getServerSession(NEXT_AUTH);

    const loggedUserId = session.user.id;

    const chats = await prismaClient.chat.findMany({
        where: {
            participants: {
                some: {
                    id: loggedUserId
                }
            }
        },
        include: {
            participants: {
                where: {
                    NOT: {
                        id: loggedUserId
                    }
                },
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    return NextResponse.json({
        chats
    })

}