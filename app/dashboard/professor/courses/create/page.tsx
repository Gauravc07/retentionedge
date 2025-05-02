"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courseData, setCourseData] = useState({
    name: "",
    code: "",
    description: "",
    semester: "",
    academicYear: "",
    credits: "3",
    maxCapacity: "50",
  })

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setCourseData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to create the course
      // await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(courseData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Course created",
        description: `${courseData.code}: ${courseData.name} has been created successfully.`,
      })

      // Redirect to courses page
      router.push("/dashboard/professor/courses")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/professor/courses">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Create New Course</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Enter the details for your new course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Data Structures and Algorithms"
                    value={courseData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    name="code"
                    placeholder="e.g., CS301"
                    value={courseData.code}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter course description"
                  value={courseData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={courseData.semester} onValueChange={(value) => handleSelectChange("semester", value)}>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Spring">Spring</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                      <SelectItem value="Fall">Fall</SelectItem>
                      <SelectItem value="Winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    name="academicYear"
                    placeholder="e.g., 2024-2025"
                    value={courseData.academicYear}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    name="credits"
                    type="number"
                    min="1"
                    max="6"
                    value={courseData.credits}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxCapacity">Maximum Capacity</Label>
                <Input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  min="1"
                  value={courseData.maxCapacity}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/professor/courses">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Course"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
