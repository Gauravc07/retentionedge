"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Search, FileText, Download, Upload, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { mockCourses, mockStudents, mockEnrollments, mockGradeItems, mockGrades } from "@/lib/mock-data"
import Link from "next/link"

export default function CourseManagementPage() {
  const { toast } = useToast()
  const [courses, setCourses] = useState(mockCourses)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddMarksDialog, setShowAddMarksDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [marks, setMarks] = useState<Record<string, string>>({})

  // Get the selected course object
  const currentCourse = selectedCourse ? courses.find((course) => course.id === selectedCourse) : null

  // Get enrolled students for the selected course
  const enrolledStudents = selectedCourse
    ? mockStudents.filter((student) => {
        const enrolledStudentIds = mockEnrollments[selectedCourse]?.map((e) => e.studentId) || []
        return enrolledStudentIds.includes(student.id)
      })
    : []

  // Filter students based on search query
  const filteredStudents = enrolledStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle course selection
  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    setSearchQuery("")
  }

  // Handle opening the add marks dialog
  const handleOpenAddMarks = (studentId: string) => {
    setSelectedStudent(studentId)

    // Initialize marks with existing grades if available
    const initialMarks: Record<string, string> = {}
    if (selectedCourse) {
      const gradeItems = mockGradeItems[selectedCourse] || []
      gradeItems.forEach((item) => {
        const grades = mockGrades[selectedCourse]?.[item.id] || {}
        initialMarks[item.id] = grades[studentId]?.toString() || ""
      })
    }

    setMarks(initialMarks)
    setShowAddMarksDialog(true)
  }

  // Handle saving marks
  const handleSaveMarks = () => {
    // In a real app, this would make an API call to update the grades
    toast({
      title: "Marks updated",
      description: "Student marks have been successfully updated.",
    })
    setShowAddMarksDialog(false)
  }

  // Handle mark change
  const handleMarkChange = (gradeItemId: string, value: string) => {
    setMarks((prev) => ({
      ...prev,
      [gradeItemId]: value,
    }))
  }

  // Handle importing marks from CSV
  const handleImportMarks = () => {
    // In a real app, this would process the uploaded CSV file
    toast({
      title: "Marks imported",
      description: "Student marks have been successfully imported from CSV.",
    })
    setShowImportDialog(false)
  }

  // Handle exporting marks to CSV
  const handleExportMarks = () => {
    // In a real app, this would generate and download a CSV file
    toast({
      title: "Marks exported",
      description: "Student marks have been exported to CSV.",
    })
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
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
                {courses.map((course) => (
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
                  <Tabs defaultValue="students">
                    <TabsList className="mb-4">
                      <TabsTrigger value="students">Students & Marks</TabsTrigger>
                      <TabsTrigger value="summary">Grade Summary</TabsTrigger>
                    </TabsList>

                    {/* Students & Marks Tab */}
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
                          <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => setShowImportDialog(true)}>
                              <Upload className="mr-2 h-4 w-4" />
                              Import Marks
                            </Button>
                            <Button variant="outline" onClick={handleExportMarks}>
                              <Download className="mr-2 h-4 w-4" />
                              Export Marks
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Current Grade</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => {
                                  // Calculate current grade
                                  let totalWeightedScore = 0
                                  let totalWeight = 0
                                  const gradeItems = mockGradeItems[selectedCourse] || []

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
                                      <TableCell>{student.studentId}</TableCell>
                                      <TableCell>{student.email}</TableCell>
                                      <TableCell className="text-center">
                                        {overallPercentage !== "-" ? (
                                          <Badge
                                            variant={
                                              Number.parseInt(overallPercentage as string) >= 80
                                                ? "success"
                                                : Number.parseInt(overallPercentage as string) >= 60
                                                  ? "warning"
                                                  : "destructive"
                                            }
                                          >
                                            {overallPercentage}%
                                          </Badge>
                                        ) : (
                                          "-"
                                        )}
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOpenAddMarks(student.id)}
                                          >
                                            <FileText className="mr-2 h-4 w-4" />
                                            Add/Edit Marks
                                          </Button>
                                          <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/dashboard/professor/students/${student.id}`}>
                                              <Eye className="mr-2 h-4 w-4" />
                                              View Profile
                                            </Link>
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    No students found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Grade Summary Tab */}
                    <TabsContent value="summary">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-lg font-medium">Grade Distribution</h3>
                          <Button variant="outline" onClick={handleExportMarks}>
                            <Download className="mr-2 h-4 w-4" />
                            Export Summary
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Grade Items</CardTitle>
                              <CardDescription>Assessment components for this course</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-center">Max Score</TableHead>
                                    <TableHead className="text-center">Weight (%)</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {(mockGradeItems[selectedCourse] || []).map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell className="font-medium">{item.title}</TableCell>
                                      <TableCell>
                                        <Badge variant="outline">{item.type}</Badge>
                                      </TableCell>
                                      <TableCell className="text-center">{item.maxScore}</TableCell>
                                      <TableCell className="text-center">{item.weight}%</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Class Statistics</CardTitle>
                              <CardDescription>Overall performance metrics</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Class Average:</span>
                                  <span className="font-bold">78%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Highest Grade:</span>
                                  <span className="font-bold">95%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Lowest Grade:</span>
                                  <span className="font-bold">62%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Students at Risk:</span>
                                  <Badge variant="destructive">3 Students</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Excellent Performers:</span>
                                  <Badge variant="success">8 Students</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle>Student Grade Summary</CardTitle>
                            <CardDescription>Complete grade breakdown for all students</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="rounded-md border">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Student</TableHead>
                                    {(mockGradeItems[selectedCourse] || []).map((item) => (
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
                                      const gradeItems = mockGradeItems[selectedCourse] || []

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
                                        colSpan={(mockGradeItems[selectedCourse] || []).length + 2}
                                        className="text-center py-6 text-muted-foreground"
                                      >
                                        No students found
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </TableBody>
                              </Table>
                            </div>
                          </CardContent>
                        </Card>
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

      {/* Add/Edit Marks Dialog */}
      <Dialog open={showAddMarksDialog} onOpenChange={setShowAddMarksDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Add/Edit Marks for {selectedStudent && filteredStudents.find((s) => s.id === selectedStudent)?.name}
            </DialogTitle>
            <DialogDescription>
              Enter marks for each assessment component in {currentCourse?.code}: {currentCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {(mockGradeItems[selectedCourse || ""] || []).map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-4 items-center">
                  <Label htmlFor={`mark-${item.id}`} className="text-right">
                    {item.title} <span className="text-muted-foreground">({item.weight}%)</span>:
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`mark-${item.id}`}
                      type="number"
                      min="0"
                      max={item.maxScore}
                      value={marks[item.id] || ""}
                      onChange={(e) => handleMarkChange(item.id, e.target.value)}
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">/ {item.maxScore}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMarksDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMarks}>Save Marks</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Marks Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import Marks from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file with student marks for {currentCourse?.code}: {currentCourse?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="csv-file">CSV File</Label>
                <Input id="csv-file" type="file" accept=".csv" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>The CSV file should have the following format:</p>
                <pre className="mt-2 rounded-md bg-muted p-4 overflow-x-auto">
                  studentId,assignment1,quiz1,midterm
                  <br />
                  2021CS01,85,90,78
                  <br />
                  2021CS02,92,85,88
                  <br />
                  ...
                </pre>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportMarks}>Import</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
