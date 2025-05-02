"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Users, BookOpen, Calendar, BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCourses } from "@/lib/mock-data"

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [semesterFilter, setSemesterFilter] = useState("all")

  // Filter courses
  const filteredCourses = mockCourses.filter((course) => {
    // Search filter
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Semester filter
    const matchesSemester = semesterFilter === "all" || course.semester === semesterFilter

    return matchesSearch && matchesSemester
  })

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <Button asChild>
            <Link href="/dashboard/professor/courses/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="grid">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex justify-between items-start">
                        <Badge>{course.code}</Badge>
                        <Badge variant="outline">
                          {course.enrolledStudents}/{course.maxCapacity}
                        </Badge>
                      </div>
                      <CardTitle className="line-clamp-1">{course.name}</CardTitle>
                      <CardDescription>
                        {course.semester} {course.academicYear} • {course.credits} Credits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground">Students</span>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{course.enrolledStudents}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-muted-foreground">Capacity</span>
                          <div className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{course.maxCapacity}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/30 px-6 py-4 flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href={`/dashboard/professor/course-management?course=${course.id}`}>Manage</Link>
                      </Button>
                      <Button variant="ghost" asChild>
                        <Link href={`/dashboard/professor/classroom?course=${course.id}`}>Classroom</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or filters, or create a new course.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/professor/courses/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Course
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Badge>{course.code}</Badge>
                            <h3 className="font-medium">{course.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {course.semester} {course.academicYear} • {course.credits} Credits
                          </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {course.enrolledStudents}/{course.maxCapacity}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/professor/course-management?course=${course.id}`}>Manage</Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/dashboard/professor/classroom?course=${course.id}`}>Classroom</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or filters, or create a new course.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/dashboard/professor/courses/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Course
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
              <CardDescription>Overview of your teaching load</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Courses</span>
                  <span className="font-bold">{mockCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Students</span>
                  <span className="font-bold">
                    {mockCourses.reduce((acc, course) => acc + course.enrolledStudents, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Credit Hours</span>
                  <span className="font-bold">{mockCourses.reduce((acc, course) => acc + course.credits, 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important dates for your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-md" />
                  <div>
                    <p className="font-medium">CS301 Midterm</p>
                    <p className="text-sm text-muted-foreground">Apr 20, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-md" />
                  <div>
                    <p className="font-medium">CS405 Assignment Due</p>
                    <p className="text-sm text-muted-foreground">Apr 25, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Average grades across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">CS301</p>
                      <p className="font-medium">78%</p>
                    </div>
                    <div className="mt-1 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">CS405</p>
                      <p className="font-medium">82%</p>
                    </div>
                    <div className="mt-1 h-2 w-full bg-muted overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
