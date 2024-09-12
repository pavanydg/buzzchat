// 'use client';

// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function SignIn() {
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");
//   const router = useRouter()

//   const handleSignIn = async () => {
//     const res = await signIn("credentials",{
//       email: email,
//       password: password,
//       redirect: false
//     })
//     router.push("/")
//   };
//   return (
//     <div>
//       <input placeholder='email' onChange={(e) => 
//         setEmail(e.target.value)
//       }></input>
//       <input placeholder='password' onChange={(e) => {
//         setPassword(e.target.value)
//       }}></input>
//       <button onClick={() => handleSignIn()}>Sign in with Credentials</button><br></br>
//       <button onClick={async () => {
//         await signIn("google")
//       }}>Sign in with Google</button>
//     </div>
//   );
// }
'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/Icons"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { NextResponse } from 'next/server'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Here you would typically send the data to your backend for authentication
    console.log('Signing in with:', email, password)
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false
      })
      if (res?.error) {
        setIsLoading(false);
        alert("Invalid Credentials");
      } else {
        setIsLoading(false);
        router.push("/chats")
      }
    } catch (error) {
      alert("Invalid login credentials")
      return NextResponse.json({
        msg: error
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="demo@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" name="password" type="password" required placeholder='123456' />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}