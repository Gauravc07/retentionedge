"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Search, Send, Plus, PaperclipIcon, Smile, MoreVertical } from "lucide-react"

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    user: {
      id: "3",
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40&text=AK",
      role: "student",
    },
    lastMessage: {
      content: "I had a question about the upcoming assignment deadline.",
      timestamp: "2025-04-15T10:30:00",
      read: false,
      sender: "them",
    },
    unread: 2,
  },
  {
    id: "2",
    user: {
      id: "5",
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
      role: "student",
    },
    lastMessage: {
      content: "Thank you for the feedback on my project.",
      timestamp: "2025-04-14T14:15:00",
      read: true,
      sender: "them",
    },
    unread: 0,
  },
  {
    id: "3",
    user: {
      id: "8",
      name: "Dr. Sharma",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
      role: "professor",
    },
    lastMessage: {
      content: "Can we discuss the department meeting agenda?",
      timestamp: "2025-04-13T09:45:00",
      read: true,
      sender: "them",
    },
    unread: 0,
  },
  {
    id: "4",
    user: {
      id: "9",
      name: "Prof. Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=PG",
      role: "professor",
    },
    lastMessage: {
      content: "I've shared the research paper we discussed.",
      timestamp: "2025-04-12T16:20:00",
      read: true,
      sender: "you",
    },
    unread: 0,
  },
  {
    id: "5",
    user: {
      id: "2",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
      role: "student",
    },
    lastMessage: {
      content: "I'll submit the revised version by tomorrow.",
      timestamp: "2025-04-11T11:10:00",
      read: true,
      sender: "them",
    },
    unread: 0,
  },
]

// Mock messages for a conversation
const mockMessages = [
  {
    id: "1",
    content: "Hello Professor, I had a question about the upcoming assignment deadline.",
    timestamp: "2025-04-15T10:25:00",
    sender: "them",
  },
  {
    id: "2",
    content: "Is it possible to get a short extension? I've been dealing with some health issues.",
    timestamp: "2025-04-15T10:26:00",
    sender: "them",
  },
  {
    id: "3",
    content: "Hi Amit, I hope you're feeling better. Can you tell me more about your situation?",
    timestamp: "2025-04-15T10:30:00",
    sender: "you",
  },
  {
    id: "4",
    content:
      "Thank you for understanding. I've been sick with the flu for the past few days and haven't been able to work on the assignment as much as I planned.",
    timestamp: "2025-04-15T10:32:00",
    sender: "them",
  },
  {
    id: "5",
    content: "I can provide a doctor's note if needed.",
    timestamp: "2025-04-15T10:32:30",
    sender: "them",
  },
  {
    id: "6",
    content: "That won't be necessary. I can give you an extension until Friday. Would that be enough time?",
    timestamp: "2025-04-15T10:35:00",
    sender: "you",
  },
  {
    id: "7",
    content: "Yes, that would be perfect. Thank you so much for your understanding!",
    timestamp: "2025-04-15T10:36:00",
    sender: "them",
  },
]

export default function MessagesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [conversations, setConversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)

  // Filter conversations
  const filteredConversations = conversations.filter((conversation) => {
    // Search filter
    const matchesSearch = conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Role filter
    const matchesRole = filter === "all" || conversation.user.role === filter

    return matchesSearch && matchesRole
  })

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)

    // If today, show time
    if (date.toDateString() === now.toDateString()) {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
      }).format(date)
    }

    // If yesterday, show "Yesterday"
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }

    // Otherwise show date
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Format message time
  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Select conversation
  const selectConversation = (conversation: any) => {
    // Mark conversation as read
    if (conversation.unread > 0) {
      setConversations((prev) => prev.map((conv) => (conv.id === conversation.id ? { ...conv, unread: 0 } : conv)))
    }
    setSelectedConversation(conversation)
  }

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return

    // Add new message
    const newMsg = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      timestamp: new Date().toISOString(),
      sender: "you",
    }
    setMessages((prev) => [...prev, newMsg])

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: {
                content: newMessage,
                timestamp: new Date().toISOString(),
                read: true,
                sender: "you",
              },
            }
          : conv,
      ),
    )

    // Clear input
    setNewMessage("")

    // Simulate reply after delay
    if (selectedConversation.id === "1") {
      setTimeout(() => {
        const replyMsg = {
          id: `msg-${Date.now() + 1}`,
          content: "Thank you for the extension, Professor!",
          timestamp: new Date().toISOString(),
          sender: "them",
        }
        setMessages((prev) => [...prev, replyMsg])

        // Update conversation last message
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation.id
              ? {
                  ...conv,
                  lastMessage: {
                    content: "Thank you for the extension, Professor!",
                    timestamp: new Date().toISOString(),
                    read: false,
                    sender: "them",
                  },
                  unread: 1,
                }
              : conv,
          ),
        )
      }, 3000)
    }
  }

  // Start new conversation
  const startNewConversation = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to start new conversations will be available soon.",
    })
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <Button onClick={startNewConversation}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Conversations List */}
          <Card className="md:col-span-1 flex flex-col h-full">
            <CardHeader className="pb-2">
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <div className="px-4 pb-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="px-4 pb-2">
              <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="student" className="flex-1">
                    Students
                  </TabsTrigger>
                  <TabsTrigger value="professor" className="flex-1">
                    Faculty
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                <div className="px-4 py-2">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedConversation?.id === conversation.id ? "bg-accent" : "hover:bg-muted"
                        }`}
                        onClick={() => selectConversation(conversation)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={conversation.user.avatar || "/placeholder.svg"}
                            alt={conversation.user.name}
                          />
                          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{conversation.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage.sender === "you" ? "You: " : ""}
                              {conversation.lastMessage.content}
                            </span>
                            {conversation.unread > 0 && <Badge className="ml-2">{conversation.unread}</Badge>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <p className="text-sm text-muted-foreground">No conversations found</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col h-full">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b px-4 py-3 flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.user.avatar || "/placeholder.svg"}
                        alt={selectedConversation.user.name}
                      />
                      <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedConversation.user.name}</CardTitle>
                      <p className="text-xs text-muted-foreground capitalize">{selectedConversation.user.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full">
                    <div className="flex flex-col gap-4 p-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "you" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.sender === "you" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs text-right mt-1 opacity-70">{formatMessageTime(message.timestamp)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="border-t p-4">
                  <div className="flex items-end gap-2">
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <PaperclipIcon className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Type a message..."
                      className="min-h-10 resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="flex-shrink-0">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button className="flex-shrink-0" onClick={sendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="rounded-full bg-muted p-3">
                  <Send className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select a conversation from the list to start messaging.
                </p>
                <Button className="mt-4" onClick={startNewConversation}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
