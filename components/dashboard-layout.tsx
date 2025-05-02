"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarNav } from "@/components/sidebar-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "student" | "professor" | "parent"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState("User Name")
  const [userEmail, setUserEmail] = useState("user@example.com")
  const [userAvatar, setUserAvatar] = useState("")

  // In a real app, you would fetch user data from your backend
  useEffect(() => {
    // Simulate fetching user data
    const mockUserData = {
      student: {
        name: "Alex Johnson",
        email: "alex@university.edu",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      },
      professor: {
        name: "Dr. Sarah Miller",
        email: "miller@university.edu",
        avatar: "/placeholder.svg?height=40&width=40&text=SM",
      },
      parent: {
        name: "Michael Chen",
        email: "mchen@example.com",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
      },
    }

    setUserName(mockUserData[role].name)
    setUserEmail(mockUserData[role].email)
    setUserAvatar(mockUserData[role].avatar)
  }, [role])

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens/cookies here
    console.log("Logging out...")
    // Redirect to login page
    router.push("/login")
  }

  // Get role-specific title
  const getRoleTitle = () => {
    switch (role) {
      case "student":
        return "Student Portal"
      case "professor":
        return "Professor Portal"
      case "parent":
        return "Parent Portal"
      default:
        return "Retention Edge"
    }
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen">
        {/* Sidebar for desktop */}
        <Sidebar className="hidden md:flex border-r">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-teal-600"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">Retention Edge</span>
                <span className="text-xs text-muted-foreground">{getRoleTitle()}</span>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav role={role} />
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-gray-500">{userEmail}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${role}/settings`}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile header and sidebar */}
        <div className="flex flex-col w-full">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 sm:max-w-xs">
                <div className="flex h-14 items-center border-b px-4">
                  <Link href="/" className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-teal-600"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold leading-none">Retention Edge</span>
                      <span className="text-xs text-muted-foreground">{getRoleTitle()}</span>
                    </div>
                  </Link>
                </div>
                <div className="py-4">
                  <SidebarNav role={role} />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-teal-600"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className="text-xl font-bold">Retention Edge</span>
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
