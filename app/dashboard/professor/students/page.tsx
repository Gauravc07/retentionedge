"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock students data
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    studentId: "2021CS01",
    email: "rahul.sharma@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
    course: "CS301",
    gpa: 3.8,
    attendance: 92,
    riskScore: 12,
    riskTrend: "down",
  },
  {
    id: "2",
    name: "Priya Patel",
    studentId: "2021CS02",
    email: "priya.patel@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
    course: "CS405",
    gpa: 3.5,
    attendance: 88,
    riskScore: 25,
    riskTrend: "up",
  },
  {
    id: "3",
    name: "Amit Kumar",
    studentId: "2021CS03",
    email: "amit.kumar@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=AK",
    course: "CS210",
    gpa: 3.2,
    attendance: 75,
    riskScore: 45,
    riskTrend: "up",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    studentId: "2021CS04",
    email: "sneha.gupta@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=SG",
    course: "CS301",
    gpa: 3.9,
    attendance: 95,
    riskScore: 8,
    riskTrend: "down",
  },
  {
    id: "5",
    name: "Vikram Singh",
    studentId: "2021CS05",
    email: "vikram.singh@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
    course: "CS405",
    gpa: 2.8,
    attendance: 68,
    riskScore: 72,
    riskTrend: "up",
  },
  {
    id: "6",
    name: "Neha Verma",
    studentId: "2021CS06",
    email: "neha.verma@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=NV",
    course: "CS210",
    gpa: 3.4,
    attendance: 85,
    riskScore: 30,
    riskTrend: "down",
  },
  {
    id: "7",
    name: "Rajesh Khanna",
    studentId: "2021CS07",
    email: "rajesh.khanna@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
    course: "CS301",
    gpa: 3.0,
    attendance: 72,
    riskScore: 55,
    riskTrend: "up",
  },
]

export default function StudentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Filter and sort students
  const filteredStudents = mockStudents
    .filter((student) => {
      // Search filter
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase())

      // Risk filter
      const matchesRisk =
        riskFilter === "all" ||
        (riskFilter === "high" && student.riskScore >= 50) ||
        (riskFilter === "medium" && student.riskScore >= 25 && student.riskScore < 50) ||
        (riskFilter === "low" && student.riskScore < 25)

      // Course filter
      const matchesCourse = courseFilter === "all" || student.course === courseFilter

      return matchesSearch && matchesRisk && matchesCourse
    })
    .sort((a, b) => {
      // Sort
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "id":
          return a.studentId.localeCompare(b.studentId)
        case "gpa":
          return b.gpa - a.gpa
        case "risk":
          return b.riskScore - a.riskScore
        default:
          return 0
      }
    })

  // Get risk level badge variant
  const getRiskBadgeVariant = (riskScore: number) => {
    if (riskScore >= 50) return "destructive"
    if (riskScore >= 25) return "warning"
    return "success"
  }

  // Get risk level text
  const getRiskLevelText = (riskScore: number) => {
    if (riskScore >= 50) return "High"
    if (riskScore >= 25) return "Medium"
    return "Low"
  }

  // Handle view student profile
  const handleViewStudentProfile = (studentId: string) => {
    router.push(`/dashboard/professor/students/${studentId}`)
  }

  // Get at-risk students
  const atRiskStudents = mockStudents.filter((student) => student.riskScore >= 50)

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Student Directory</CardTitle>
                <CardDescription>View and manage all students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search students..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={courseFilter} onValueChange={setCourseFilter}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Courses</SelectItem>
                          <SelectItem value="CS301">CS301</SelectItem>
                          <SelectItem value="CS405">CS405</SelectItem>
                          <SelectItem value="CS210">CS210</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={riskFilter} onValueChange={setRiskFilter}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Risk Level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="low">Low Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="id">Student ID</SelectItem>
                        <SelectItem value="gpa">GPA</SelectItem>
                        <SelectItem value="risk">Risk Score</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Course</TableHead>
                          <TableHead className="text-center">GPA</TableHead>
                          <TableHead className="text-center">Attendance</TableHead>
                          <TableHead className="text-center">Risk Level</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{student.name}</div>
                                    <div className="text-xs text-muted-foreground">{student.studentId}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{student.course}</TableCell>
                              <TableCell className="text-center">{student.gpa.toFixed(1)}</TableCell>
                              <TableCell className="text-center">{student.attendance}%</TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <Badge variant={getRiskBadgeVariant(student.riskScore)}>
                                    {getRiskLevelText(student.riskScore)}
                                  </Badge>
                                  {student.riskTrend === "up" ? (
                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 text-green-500" />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => handleViewStudentProfile(student.id)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              No students found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="at-risk">
            <Card>
              <CardHeader>
                <CardTitle>At-Risk Students</CardTitle>
                <CardDescription>Students requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atRiskStudents.length > 0 ? (
                    atRiskStudents.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.studentId}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-muted-foreground">{student.course}</div>
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <span className="font-medium text-red-500">{student.riskScore}% Risk</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleViewStudentProfile(student.id)}>
                            View Profile
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-3">
                        <AlertCircle className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No at-risk students</h3>
                      <p className="mt-2 text-sm text-muted-foreground">All students are currently in good standing.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
