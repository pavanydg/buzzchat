import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";

const UserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

export async function GET(res: NextResponse){
    return NextResponse.json({
        message: "Hello"
    })
}

export async function POST(req: NextRequest){
    try{
        const userData = UserSchema.parse(await req.json());

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if(existingUser){
            return NextResponse.json({
                message: "User already exists with that email"
            })
        }

        const user = await prismaClient.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: userData.password,
            }
        })
        return NextResponse.json({
            message: "User signed Up successfully"
        })

    }
    catch(error){
        console.log("Error creating user: ",error);
        return NextResponse.json({
            message: "Error while adding user"
        })
    }
} 