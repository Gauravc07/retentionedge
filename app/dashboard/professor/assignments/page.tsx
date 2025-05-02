"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { format, isAfter, parseISO } from "date-fns"

// Mock assignments data
const mockAssignments = [
  {
    id: "1",
    title: "Assignment 1: Data Structures",
    course: "CS301",
    dueDate: "2025-04-25",
    maxScore: 100,
    weight: 15,
    status: "active",
  },
  {
    id: "2",
    title: "Quiz 1: Database Fundamentals",
    course: "CS405",
    dueDate: "2025-04-18",
    maxScore: 50,
    weight: 10,
    status: "active",
  },
  {
    id: "3",
    title: "Midterm Exam",
    course: "CS301",
    dueDate: "2025-05-05",
    maxScore: 100,
    weight: 30,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Programming Project",
    course: "CS210",
    dueDate: "2025-05-15",
    maxScore: 100,
    weight: 25,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Lab Exercise 1",
    course: "CS405",
    dueDate: "2025-04-10",
    maxScore: 20,
    weight: 5,
    status: "completed",
  },
]

// Mock courses data
const mockCourses = [
  { id: "1", code: "CS301", name: "Data Structures and Algorithms" },
  { id: "2", code: "CS405", name: "Database Management Systems" },
  { id: "3", code: "CS210", name: "Object-Oriented Programming" },
]

export default function AssignmentsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    course: "",
    dueDate: "",
    maxScore: "100",
    weight: "10",
    description: "",
  })

  // Filter assignments
  const filteredAssignments = mockAssignments.filter((assignment) => {
    // Search filter
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

    // Course filter
    const matchesCourse = courseFilter === "all" || assignment.course === courseFilter

    // Status filter
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter

    return matchesSearch && matchesCourse && matchesStatus
  })

  // Handle adding a new assignment
  const handleAddAssignment = () => {
    // In a real app, this would make an API call to add the assignment
    toast({
      title: "Assignment added",
      description: `${newAssignment.title} has been added successfully.`,
    })
    setShowAddDialog(false)
    setNewAssignment({
      title: "",
      course: "",
      dueDate: "",
      maxScore: "100",
      weight: "10",
      description: "",
    })
  }

  // Handle editing an assignment
  const handleEditAssignment = () => {
    // In a real app, this would make an API call to update the assignment
    toast({
      title: "Assignment updated",
      description: `${selectedAssignment.title} has been updated successfully.`,
    })
    setShowEditDialog(false)
  }

  // Handle deleting an assignment
  const handleDeleteAssignment = () => {
    // In a real app, this would make an API call to delete the assignment
    toast({
      title: "Assignment deleted",
      description: `${selectedAssignment.title} has been deleted successfully.`,
    })
    setShowDeleteDialog(false)
  }

  // Open edit dialog
  const openEditDialog = (assignment: any) => {
    setSelectedAssignment(assignment)
    setShowEditDialog(true)
  }

  // Open delete dialog
  const openDeleteDialog = (assignment: any) => {
    setSelectedAssignment(assignment)
    setShowDeleteDialog(true)
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string, dueDate: string) => {
    const today = new Date()
    const due = parseISO(dueDate)

    if (status === "completed") return "success"
    if (isAfter(today, due)) return "destructive"
    if (status === "upcoming") return "outline"
    return "default"
  }

  // Get status text
  const getStatusText = (status: string, dueDate: string) => {
    const today = new Date()
    const due = parseISO(dueDate)

    if (status === "completed") return "Completed"
    if (isAfter(today, due)) return "Overdue"
    if (status === "upcoming") return "Upcoming"
    return "Active"
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Assignments</CardTitle>
            <CardDescription>Create, edit, and track assignments for your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search assignments..."
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
                      {mockCourses.map((course) => (
                        <SelectItem key={course.id} value={course.code}>
                          {course.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead className="text-center">Due Date</TableHead>
                      <TableHead className="text-center">Max Score</TableHead>
                      <TableHead className="text-center">Weight</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.length > 0 ? (
                      filteredAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.course}</TableCell>
                          <TableCell className="text-center">
                            {format(parseISO(assignment.dueDate), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-center">{assignment.maxScore}</TableCell>
                          <TableCell className="text-center">{assignment.weight}%</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={getStatusBadgeVariant(assignment.status, assignment.dueDate)}>
                              {getStatusText(assignment.status, assignment.dueDate)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(assignment)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(assignment)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No assignments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Assignment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Assignment</DialogTitle>
            <DialogDescription>Create a new assignment for your course</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                placeholder="Assignment title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Select
                value={newAssignment.course}
                onValueChange={(value) => setNewAssignment({ ...newAssignment, course: value })}
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.code}>
                      {course.code}: {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxScore">Max Score</Label>
                <Input
                  id="maxScore"
                  type="number"
                  value={newAssignment.maxScore}
                  onChange={(e) => setNewAssignment({ ...newAssignment, maxScore: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (%)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newAssignment.weight}
                  onChange={(e) => setNewAssignment({ ...newAssignment, weight: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newAssignment.description}
                onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                placeholder="Assignment description"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAssignment}>Add Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogDescription>Update assignment details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={selectedAssignment?.title || ""}
                onChange={(e) => setSelectedAssignment({ ...selectedAssignment, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-course">Course</Label>
              <Select
                value={selectedAssignment?.course || ""}
                onValueChange={(value) => setSelectedAssignment({ ...selectedAssignment, course: value })}
              >
                <SelectTrigger id="edit-course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.code}>
                      {course.code}: {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={selectedAssignment?.dueDate || ""}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-maxScore">Max Score</Label>
                <Input
                  id="edit-maxScore"
                  type="number"
                  value={selectedAssignment?.maxScore || ""}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, maxScore: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-weight">Weight (%)</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  value={selectedAssignment?.weight || ""}
                  onChange={(e) => setSelectedAssignment({ ...selectedAssignment, weight: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAssignment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Assignment Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assignment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="font-medium">{selectedAssignment?.title}</p>
            <p className="text-sm text-muted-foreground">
              Course: {selectedAssignment?.course} • Due:{" "}
              {selectedAssignment?.dueDate && format(parseISO(selectedAssignment.dueDate), "MMM d, yyyy")}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAssignment}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
