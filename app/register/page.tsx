"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("student")
  const [institution, setInstitution] = useState("")
  const [studentId, setStudentId] = useState("")
  const [department, setDepartment] = useState("")
  const [childName, setChildName] = useState("")

  // Engineering departments in Indian colleges
  const engineeringDepartments = [
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biotechnology",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Petroleum Engineering",
    "Production Engineering",
    "Textile Engineering",
    "Agricultural Engineering",
    "Industrial Engineering",
    "Instrumentation Engineering",
    "Marine Engineering",
    "Automobile Engineering",
    "Other",
  ]

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would register with your backend here
    console.log("Registering with:", {
      name,
      email,
      password,
      role,
      institution,
      studentId,
      department,
      childName,
    })

    // Redirect to login page after registration
    router.push("/login")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
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
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create your account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Choose your role and fill in your details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="grid w-full items-center gap-4">
                <Tabs defaultValue="student" className="w-full" onValueChange={setRole}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="student">Student</TabsTrigger>
                    <TabsTrigger value="professor">Professor</TabsTrigger>
                    <TabsTrigger value="parent">Parent</TabsTrigger>
                  </TabsList>
                  <TabsContent value="student">
                    <div className="grid gap-2 py-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          placeholder="Your student ID"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          placeholder="Your school or university"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="professor">
                    <div className="grid gap-2 py-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="department">Department</Label>
                        <Select value={department} onValueChange={setDepartment} required>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select your department" />
                          </SelectTrigger>
                          <SelectContent>
                            {engineeringDepartments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          placeholder="Your school or university"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="parent">
                    <div className="grid gap-2 py-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="childName">Child's Name</Label>
                        <Input
                          id="childName"
                          placeholder="Your child's full name"
                          value={childName}
                          onChange={(e) => setChildName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="institution">Institution</Label>
                        <Input
                          id="institution"
                          placeholder="Your child's school or university"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Create a password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-6" type="submit">
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-500">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
