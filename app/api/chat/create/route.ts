import { prismaClient } from "@/app/lib/db";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,res: NextResponse){
    const session = await getServerSession();
    if(session){
        return NextResponse.json({user: session.user?.email})
    }else{
        return NextResponse.json({msg: "Unauthorized"})
    }
}

export async function POST(req: NextRequest,res: NextResponse){
    const session = await getServerSession();
    const user = session?.user?.email || "";
    const body = await req.json();
    try{
        const newChat = await prismaClient.chat.create({
            data: {
                participants: {
                    connect: [
                        {email: user},{email: body.email}
                    ]
                }
            }
        })
        return NextResponse.json({
            message: "New Chat created"
        })
    }catch(error){
        return NextResponse.json({
            error: error
        });
    }

}



// user1 = demo , eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..CI__ev7nfxmiS64Z.vevrSPRveQGh_JtgTTp0vU8lYFWNxXMRBhb_-9r92Bm3IcuEKKSVGeWosZz3JeyNC5nA-T0xUpYiL_OifBJOP2FDOKydU2ABxwxMDCHlvX_l2FSMmtp3a5LFjqV9zHofjsdZJDG3GBQGV5OvFA-JZRHXOCXO07IlQ5w8PvF9GxahSniTHFFZgQ.3aO-xZ3Uo1_kQHlHwALOaA
// user2 = demo1 , eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..sQAnFKtCbFahASH-.X8eiGNWkHMgY6jOyYunngRkaWp8EnD9ttUGot7u5Sqze4k4WxRGEVWiqw4tkZkmCp8EAentCMLUiEASTUrdUtPJrcik98bjuug95Pn4Owb6GLuqJSQs3Sa6FDvrK5Cvi9L89d1QiYFUn8S-SK7H3lREouhZTlRNkvCh4mL2FP0p5vTYdj5UMnviQ.nB9SCUo_r6l4_AuWE4E-Zg