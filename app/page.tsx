'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageCircle, Users, Zap, Lock, Menu, X, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div>
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageCircle className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">BuzzChat</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </header>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 items-center">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-800 py-4"
          >
            <nav className="flex flex-col items-center gap-4">
              <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
                Features
              </Link>
            </nav>
          </motion.div>
        )}
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800 dark:text-white">
                    Connect Instantly with BuzzChat
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Experience the future of one-on-one conversations with our chat platform. Stay connected, share ideas, and build meaningful relationships.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-x-4"
                >
                  <Link href="/signin">
                    <Button size="lg">Start Chatting</Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">Learn More</Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Cutting-Edge Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Connect With Friends</h3>
                  <p className="text-gray-500 dark:text-gray-400">Easily connect with your friends.</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <Zap className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">Real-Time Translation</h3>
                  <p className="text-gray-500 dark:text-gray-400">Chat with anyone, anywhere, in any language with our instant translation feature.</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                >
                  <Lock className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">End-to-End Encryption</h3>
                  <p className="text-gray-500 dark:text-gray-400">Your conversations are protected with state-of-the-art encryption technology.</p>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Transform Your Conversations?</h2>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of users who are already enjoying seamless, intelligent conversations on BuzzChat.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link href="/chat">
                    <Button size="lg" className="">Get Started for Free</Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 BuzzChat Inc. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Cookie Policy
            </Link>
          </nav>
        </footer>
      </div>
    </div>

  )
}