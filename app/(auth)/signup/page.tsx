// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await axios.post("/api/signup",{
//         name,
//         email,
//         password
//     },{
//         headers: {"Content-Type": "application/json"}
//     })

//     if (res) {
//       router.push('/signin');
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
//       <button type="submit">Sign Up</button>
//     </form>
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
import axios from 'axios'

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string


    // Here you would typically send the data to your backend
    console.log('Signing up with:', name, email, password)

    // Simulate API call

    const res = await axios.post("/api/signup", {
      name,
      email,
      password
    }, {
      headers: { "Content-Type": "application/json" }
    })

    setTimeout(() => {
      setIsLoading(false)
      router.push('/signin')
    }, 2000)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your details to get started</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="demo@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required placeholder='123456' />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
