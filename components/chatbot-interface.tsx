"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, Send, Volume2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample chatbot messages
const initialMessages = [
  {
    id: 1,
    role: "bot",
    content: "Hello! I'm Suraksha Sathi, your disaster management assistant. How can I help you today?",
    timestamp: new Date().toISOString(),
  },
]

// Sample suggested queries
const suggestedQueries = [
  "What should I do during a flood?",
  "How to prepare for a cyclone?",
  "Emergency contacts in Kerala",
  "Evacuation routes near me",
  "Current disaster alerts",
]

export function ChatbotInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes("flood")) {
        botResponse = {
          id: messages.length + 2,
          role: "bot",
          content:
            "During a flood, move to higher ground immediately. Avoid walking or driving through flood waters. Stay away from power lines and electrical wires. If you need to evacuate, follow designated evacuation routes. Would you like to see the nearest evacuation centers?",
          timestamp: new Date().toISOString(),
        }
      } else if (lowerInput.includes("cyclone") || lowerInput.includes("hurricane")) {
        botResponse = {
          id: messages.length + 2,
          role: "bot",
          content:
            "To prepare for a cyclone: 1) Secure your home by covering windows and moving outdoor furniture inside. 2) Create an emergency kit with food, water, and medications. 3) Stay informed through official channels. 4) Know your evacuation route. 5) Keep your phone charged. Would you like me to show you the cyclone preparedness checklist?",
          timestamp: new Date().toISOString(),
        }
      } else if (lowerInput.includes("contact") || lowerInput.includes("emergency")) {
        botResponse = {
          id: messages.length + 2,
          role: "bot",
          content:
            "Emergency contacts for Kerala:\n• State Emergency Operations Center: 1070\n• District Emergency Operations Center: 1077\n• Police: 100\n• Fire & Rescue: 101\n• Ambulance: 108\n• Kerala State Disaster Management Authority: 0471-2364424\n\nWould you like me to show emergency contacts for a specific district?",
          timestamp: new Date().toISOString(),
        }
      } else {
        botResponse = {
          id: messages.length + 2,
          role: "bot",
          content:
            "I understand you're asking about disaster management. Could you please provide more specific details about what you need help with? I can provide information on flood safety, cyclone preparedness, earthquake response, evacuation procedures, or emergency contacts.",
          timestamp: new Date().toISOString(),
        }
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  // Handle suggested query click
  const handleSuggestedQuery = (query) => {
    setInput(query)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex h-full flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] items-start gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Suraksha Sathi" />
                      <AvatarFallback className="bg-india-green text-white">SS</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] items-start gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Suraksha Sathi" />
                    <AvatarFallback className="bg-india-green text-white">SS</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {messages.length === 1 && (
          <div className="mx-4 mb-4 flex flex-wrap gap-2">
            {suggestedQueries.map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleSuggestedQuery(query)}
              >
                {query}
              </Badge>
            ))}
          </div>
        )}

        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                // Text-to-speech functionality would go here
              }}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!input.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Suraksha Sathi can provide disaster information, safety tips, and emergency guidance
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
