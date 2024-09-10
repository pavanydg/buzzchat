'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const router = useRouter()

  const handleSignIn = async () => {
    const res = await signIn("credentials",{
      email: email,
      password: password,
      redirect: false
    })
    router.push("/")
  };
  return (
    <div>
      <input placeholder='email' onChange={(e) => 
        setEmail(e.target.value)
      }></input>
      <input placeholder='password' onChange={(e) => {
        setPassword(e.target.value)
      }}></input>
      <button onClick={() => handleSignIn()}>Sign in with Credentials</button><br></br>
      <button onClick={async () => {
        await signIn("google")
      }}>Sign in with Google</button>
    </div>
  );
}
