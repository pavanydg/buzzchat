"use client"
import axios from "axios"
import { useEffect } from "react"

export default function (){
    useEffect(() => {
        fetch("/api/socket")
    },[])

    return <div>
        hello
    </div>
}