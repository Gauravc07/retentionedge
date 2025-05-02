"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Trash2, Edit, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// Mock data for courses
const mockCourses = [
  {
    id: "1",
    code: "CS301",
    name: "Data Structures and Algorithms",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 4,
    enrolledStudents: 45,
    maxCapacity: 60,
  },
  {
    id: "2",
    code: "CS405",
    name: "Database Management Systems",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 3,
    enrolledStudents: 38,
    maxCapacity: 50,
  },
  {
    id: "3",
    code: "CS210",
    name: "Object-Oriented Programming",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 4,
    enrolledStudents: 52,
    maxCapacity: 55,
  },
]

// Mock data for students
const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    studentId: "2021CS01",
    email: "rahul.sharma@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
  },
  {
    id: "2",
    name: "Priya Patel",
    studentId: "2021CS02",
    email: "priya.patel@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
  },
  {
    id: "3",
    name: "Amit Kumar",
    studentId: "2021CS03",
    email: "amit.kumar@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    studentId: "2021CS04",
    email: "sneha.gupta@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=SG",
  },
  {
    id: "5",
    name: "Vikram Singh",
    studentId: "2021CS05",
    email: "vikram.singh@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
  },
]

// Mock data for enrollments
const mockEnrollments = {
  "1": [
    { studentId: "1", grades: { assignment1: 85, midterm: 78, quiz1: 90 } },
    { studentId: "2", grades: { assignment1: 92, midterm: 88, quiz1: 85 } },
    { studentId: "3", grades: { assignment1: 78, midterm: 72, quiz1: 80 } },
    { studentId: "5", grades: { assignment1: 88, midterm: 90, quiz1: 92 } },
  ],
  "2": [
    { studentId: "1", grades: { assignment1: 90, midterm: 85, quiz1: 88 } },
    { studentId: "4", grades: { assignment1: 95, midterm: 92, quiz1: 90 } },
  ],
  "3": [
    { studentId: "2", grades: { assignment1: 85, midterm: 80, quiz1: 82 } },
    { studentId: "3", grades: { assignment1: 90, midterm: 85, quiz1: 88 } },
    { studentId: "4", grades: { assignment1: 78, midterm: 75, quiz1: 80 } },
  ],
}

// Mock grade items for each course
const mockGradeItems = {
  "1": [
    { id: "g1", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 15 },
    { id: "g2", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g3", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 30 },
  ],
  "2": [
    { id: "g6", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 10 },
    { id: "g7", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g8", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 25 },
  ],
  "3": [
    { id: "g11", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 15 },
    { id: "g12", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g13", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 25 },
  ],
}

// Mock grades for students
const mockGrades = {
  "1": {
    g1: { "1": 85, "2": 92, "3": 78, "5": 88 },
    g2: { "1": 90, "2": 85, "3": 80, "5": 92 },
    g3: { "1": 78, "2": 88, "3": 72, "5": 90 },
  },
  "2": {
    g6: { "1": 90, "4": 95 },
    g7: { "1": 88, "4": 90 },
    g8: { "1": 85, "4": 92 },
  },
  "3": {
    g11: { "2": 85, "3": 90, "4": 78 },
    g12: { "2": 82, "3": 88, "4": 80 },
    g13: { "2": 80, "3": 85, "4": 75 },
  },
}

export default function ClassroomPage() {
  const { toast } = useToast()
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
  const [showAddGradeItemDialog, setShowAddGradeItemDialog] = useState(false)
  const [showEditGradesDialog, setShowEditGradesDialog] = useState(false)
  const [selectedGradeItem, setSelectedGradeItem] = useState<string | null>(null)
  const [newGradeItem, setNewGradeItem] = useState({
    title: "",
    type: "ASSIGNMENT",
    maxScore: 100,
    weight: 10,
  })
  const [editedGrades, setEditedGrades] = useState<Record<string, number>>({})

  // Filter students based on search query
  const filteredStudents = selectedCourse
    ? mockStudents
        .filter((student) => {
          const enrolledStudentIds = mockEnrollments[selectedCourse]?.map((e) => e.studentId) || []
          return enrolledStudentIds.includes(student.id)
        })
        .filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : []

  // Get non-enrolled students for the selected course
  const nonEnrolledStudents = selectedCourse
    ? mockStudents.filter((student) => {
        const enrolledStudentIds = mockEnrollments[selectedCourse]?.map((e) => e.studentId) || []
        return !enrolledStudentIds.includes(student.id)
      })
    : []

  // Get grade items for the selected course
  const gradeItems = selectedCourse ? mockGradeItems[selectedCourse] || [] : []

  // Handle course selection
  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    setSearchQuery("")
  }

  // Handle adding a student to the course
  const handleAddStudent = (studentId: string) => {
    // In a real app, this would make an API call to add the student to the course
    toast({
      title: "Student added to course",
      description: `Student has been successfully added to the course.`,
    })
    setShowAddStudentDialog(false)
  }

  // Handle removing a student from the course
  const handleRemoveStudent = (studentId: string) => {
    // In a real app, this would make an API call to remove the student from the course
    toast({
      title: "Student removed from course",
      description: `Student has been successfully removed from the course.`,
    })
  }

  // Handle adding a new grade item
  const handleAddGradeItem = () => {
    // In a real app, this would make an API call to add the grade item
    toast({
      title: "Grade item added",
      description: `${newGradeItem.title} has been added to the course.`,
    })
    setShowAddGradeItemDialog(false)
    setNewGradeItem({
      title: "",
      type: "ASSIGNMENT",
      maxScore: 100,
      weight: 10,
    })
  }

  // Handle opening the edit grades dialog
  const handleOpenEditGrades = (gradeItemId: string) => {
    setSelectedGradeItem(gradeItemId)

    // Initialize edited grades with current grades
    if (selectedCourse && gradeItemId) {
      const currentGrades = mockGrades[selectedCourse][gradeItemId] || {}
      setEditedGrades(currentGrades)
    }

    setShowEditGradesDialog(true)
  }

  // Handle saving edited grades
  const handleSaveGrades = () => {
    // In a real app, this would make an API call to update the grades
    toast({
      title: "Grades updated",
      description: "Student grades have been successfully updated.",
    })
    setShowEditGradesDialog(false)
  }

  // Handle grade change
  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      setEditedGrades((prev) => ({
        ...prev,
        [studentId]: numValue,
      }))
    }
  }

  // Get the selected course object
  const currentCourse = selectedCourse ? mockCourses.find((course) => course.id === selectedCourse) : null

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Classroom Management</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Course Selection Sidebar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Select a course to manage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockCourses.map((course) => (
                  <Button
                    key={course.id}
                    variant={selectedCourse === course.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleCourseSelect(course.id)}
                  >
                    <div className="flex flex-col items-start">
                      <div className="font-medium">{course.code}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-full">{course.name}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            {selectedCourse ? (
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <CardTitle>
                        {currentCourse?.code}: {currentCourse?.name}
                      </CardTitle>
                      <CardDescription>
                        {currentCourse?.semester} {currentCourse?.academicYear} • {currentCourse?.credits} Credits
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {mockEnrollments[selectedCourse]?.length || 0}/{currentCourse?.maxCapacity} Students
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="students">Students</TabsTrigger>
                      <TabsTrigger value="grades">Grades</TabsTrigger>
                    </TabsList>

                    {/* Students Tab */}
                    <TabsContent value="students">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
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
                          <Button onClick={() => setShowAddStudentDialog(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Student
                          </Button>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Email</TableHead>
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
                                        <span>{student.name}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>{student.studentId}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell className="text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm">
                                            <span className="sr-only">Open menu</span>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="h-4 w-4"
                                            >
                                              <circle cx="12" cy="12" r="1" />
                                              <circle cx="12" cy="5" r="1" />
                                              <circle cx="12" cy="19" r="1" />
                                            </svg>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuItem
                                            onClick={() =>
                                              window.open(`/dashboard/professor/students/${student.id}`, "_blank")
                                            }
                                          >
                                            View Profile
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleRemoveStudent(student.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Remove from Course
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    No students found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Grades Tab */}
                    <TabsContent value="grades">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-lg font-medium">Grade Items</h3>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => {}}>
                              <Download className="mr-2 h-4 w-4" />
                              Export Grades
                            </Button>
                            <Button onClick={() => setShowAddGradeItemDialog(true)}>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Grade Item
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-center">Max Score</TableHead>
                                <TableHead className="text-center">Weight (%)</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {gradeItems.length > 0 ? (
                                gradeItems.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{item.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">{item.maxScore}</TableCell>
                                    <TableCell className="text-center">{item.weight}%</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenEditGrades(item.id)}
                                              >
                                                <Edit className="h-4 w-4" />
                                              </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit Grades</TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No grade items found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-lg font-medium mb-4">Student Grade Summary</h3>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Student</TableHead>
                                  {gradeItems.map((item) => (
                                    <TableHead key={item.id} className="text-center">
                                      {item.title}
                                    </TableHead>
                                  ))}
                                  <TableHead className="text-center">Overall</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {filteredStudents.length > 0 ? (
                                  filteredStudents.map((student) => {
                                    // Calculate overall grade
                                    let totalWeightedScore = 0
                                    let totalWeight = 0

                                    gradeItems.forEach((item) => {
                                      const grades = mockGrades[selectedCourse]?.[item.id] || {}
                                      const score = grades[student.id]

                                      if (score !== undefined) {
                                        const weightedScore = (score / item.maxScore) * item.weight
                                        totalWeightedScore += weightedScore
                                        totalWeight += item.weight
                                      }
                                    })

                                    const overallPercentage =
                                      totalWeight > 0 ? Math.round((totalWeightedScore / totalWeight) * 100) : "-"

                                    return (
                                      <TableRow key={student.id}>
                                        <TableCell>
                                          <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage
                                                src={student.avatar || "/placeholder.svg"}
                                                alt={student.name}
                                              />
                                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{student.name}</span>
                                          </div>
                                        </TableCell>
                                        {gradeItems.map((item) => {
                                          const grades = mockGrades[selectedCourse]?.[item.id] || {}
                                          const score = grades[student.id]

                                          return (
                                            <TableCell key={item.id} className="text-center">
                                              {score !== undefined ? score : "-"}
                                            </TableCell>
                                          )
                                        })}
                                        <TableCell className="text-center font-medium">
                                          {overallPercentage !== "-" ? `${overallPercentage}%` : "-"}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })
                                ) : (
                                  <TableRow>
                                    <TableCell
                                      colSpan={gradeItems.length + 2}
                                      className="text-center py-6 text-muted-foreground"
                                    >
                                      No students found
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-muted p-4">
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
                      className="h-8 w-8 text-muted-foreground"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Select a Course</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    Choose a course from the sidebar to view and manage students and grades.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Student to Course</DialogTitle>
            <DialogDescription>
              Select students to add to {currentCourse?.code}: {currentCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="search-students">Search Students</Label>
              <Input
                id="search-students"
                placeholder="Search by name or ID..."
                className="mt-1"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[300px] rounded-md border p-2">
              {nonEnrolledStudents.length > 0 ? (
                nonEnrolledStudents
                  .filter(
                    (student) =>
                      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((student) => (
                    <div key={student.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleAddStudent(student.id)}>
                        Add
                      </Button>
                    </div>
                  ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <p className="text-muted-foreground">No students available to add</p>
                </div>
              )}
            </ScrollArea>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Grade Item Dialog */}
      <Dialog open={showAddGradeItemDialog} onOpenChange={setShowAddGradeItemDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Grade Item</DialogTitle>
            <DialogDescription>
              Create a new grade item for {currentCourse?.code}: {currentCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g., Assignment 1, Midterm Exam"
                value={newGradeItem.title}
                onChange={(e) => setNewGradeItem({ ...newGradeItem, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newGradeItem.type}
                onValueChange={(value) => setNewGradeItem({ ...newGradeItem, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                  <SelectItem value="QUIZ">Quiz</SelectItem>
                  <SelectItem value="MIDTERM">Midterm</SelectItem>
                  <SelectItem value="FINAL">Final Exam</SelectItem>
                  <SelectItem value="PROJECT">Project</SelectItem>
                  <SelectItem value="LAB">Lab</SelectItem>
                  <SelectItem value="ATTENDANCE">Attendance</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="max-score">Max Score</Label>
                <Input
                  id="max-score"
                  type="number"
                  value={newGradeItem.maxScore}
                  onChange={(e) => setNewGradeItem({ ...newGradeItem, maxScore: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (%)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newGradeItem.weight}
                  onChange={(e) => setNewGradeItem({ ...newGradeItem, weight: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddGradeItemDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddGradeItem}>Add Grade Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Grades Dialog */}
      <Dialog open={showEditGradesDialog} onOpenChange={setShowEditGradesDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Grades: {gradeItems.find((item) => item.id === selectedGradeItem)?.title}</DialogTitle>
            <DialogDescription>
              Update grades for {currentCourse?.code}: {currentCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          className="w-20 ml-auto"
                          value={editedGrades[student.id] || ""}
                          onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditGradesDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveGrades}>Save Grades</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
