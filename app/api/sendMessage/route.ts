import { NEXT_AUTH } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(NEXT_AUTH);

  const senderId = Number(session.user.id);
  const body = await req.json();

  try {
    const message = await prismaClient.message.create({
      data: {
        text: body.text,
        senderId,
        recieverId: body.recieverId,
        chatId: body.chatId,
      },
    });
    return NextResponse.json({
      msg: message,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error
    });
  }
}
