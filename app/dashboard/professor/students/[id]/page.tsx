"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft } from "lucide-react"
import { parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const studentId = params.id
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")

  // Mock student data - in a real app, this would be fetched from the database
  const student = {
    id: studentId,
    name: "Emma Wilson",
    email: "emma.wilson@university.edu",
    studentId: "S12345",
    course: "CS301",
    gpa: 3.2,
    riskScore: 85,
    riskTrend: "up",
    attendanceRate: 78,
    completedAssignments: "7/10",
    factors: ["Poor attendance", "Missing assignments", "Declining quiz scores"],
    courses: [
      { id: 1, name: "Data Structures", code: "CS301", grade: "C+" },
      { id: 2, name: "Database Systems", code: "CS305", grade: "B-" },
      { id: 3, name: "Web Development", code: "CS310", grade: "B+" },
      { id: 4, name: "Algorithms", code: "CS302", grade: "C" },
    ],
  }

  // Sample data for charts
  const performanceData = [
    { date: "Assignment 1", value: 85 },
    { date: "Quiz 1", value: 78 },
    { date: "Assignment 2", value: 72 },
    { date: "Midterm", value: 65 },
    { date: "Assignment 3", value: 68 },
    { date: "Quiz 2", value: 62 },
    { date: "Assignment 4", value: 70 },
  ]

  const attendanceData = [
    { date: "Week 1", value: 100 },
    { date: "Week 2", value: 100 },
    { date: "Week 3", value: 80 },
    { date: "Week 4", value: 60 },
    { date: "Week 5", value: 80 },
    { date: "Week 6", value: 60 },
    { date: "Week 7", value: 40 },
    { date: "Week 8", value: 80 },
  ]

  // Generate daily attendance data for the current month
  const getDailyAttendanceData = () => {
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    const days = eachDayOfInterval({ start, end })

    // Mock attendance data - in a real app, this would come from the database
    const attendanceDays = [
      "2025-04-01",
      "2025-04-02",
      "2025-04-03",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-15",
      "2025-04-16",
      "2025-04-17",
      "2025-04-23",
      "2025-04-24",
      "2025-04-29",
      "2025-04-30",
    ].map((day) => parseISO(day))

    const absentDays = ["2025-04-07", "2025-04-14", "2025-04-21", "2025-04-22", "2025-04-28"].map((day) =>
      parseISO(day),
    )

    return days.map((day) => {
      const isPresent = attendanceDays.some((d) => isSameDay(d, day))
      const isAbsent = absentDays.some((d) => isSameDay(d, day))

      return {
        date: day,
        status: isPresent ? "present" : isAbsent ? "absent" : "no-class",
      }
    })
  }

  // Detailed weekly attendance records
  const weeklyAttendanceRecords = [
    {
      week: "Week 1 (Apr 1-7)",
      days: [
        { date: "Apr 1", day: "Mon", status: "present", course: "Data Structures" },
        { date: "Apr 2", day: "Tue", status: "present", course: "Database Systems" },
        { date: "Apr 3", day: "Wed", status: "present", course: "Web Development" },
        { date: "Apr 4", day: "Thu", status: "no-class", course: "" },
        { date: "Apr 5", day: "Fri", status: "no-class", course: "" },
      ],
      percentage: "100%",
    },
    {
      week: "Week 2 (Apr 8-14)",
      days: [
        { date: "Apr 8", day: "Mon", status: "present", course: "Data Structures" },
        { date: "Apr 9", day: "Tue", status: "present", course: "Database Systems" },
        { date: "Apr 10", day: "Wed", status: "present", course: "Web Development" },
        { date: "Apr 11", day: "Thu", status: "no-class", course: "" },
        { date: "Apr 12", day: "Fri", status: "no-class", course: "" },
      ],
      percentage: "100%",
    },
    {
      week: "Week 3 (Apr 15-21)",
      days: [
        { date: "Apr 15", day: "Mon", status: "present", course: "Data Structures" },
        { date: "Apr 16", day: "Tue", status: "present", course: "Database Systems" },
        { date: "Apr 17", day: "Wed", status: "present", course: "Web Development" },
        { date: "Apr 18", day: "Thu", status: "no-class", course: "" },
        { date: "Apr 19", day: "Fri", status: "no-class", course: "" },
      ],
      percentage: "100%",
    },
    {
      week: "Week 4 (Apr 22-28)",
      days: [
        { date: "Apr 22", day: "Mon", status: "absent", course: "Data Structures" },
        { date: "Apr 23", day: "Tue", status: "present", course: "Database Systems" },
        { date: "Apr 24", day: "Wed", status: "present", course: "Web Development" },
        { date: "Apr 25", day: "Thu", status: "no-class", course: "" },
        { date: "Apr 26", day: "Fri", status: "no-class", course: "" },
      ],
      percentage: "67%",
    },
  ]

  const handleBack = () => {
    router.back()
  }

  const viewAttendance = () => {
    setShowAttendanceDialog(true)
  }

  const openEmailDialog = () => {
    setShowEmailDialog(true)
  }

  const sendEmail = () => {
    // In a real app, this would send an email to the student
    console.log(`Sending email to ${student.name}: ${emailSubject}`)
    alert(`Email sent to ${student.name}`)
    setShowEmailDialog(false)
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Student Profile</h1>
        </div>

        {/* Student Overview */}
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="md:w-1/3">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`/placeholder.svg?height=96&width=96`} alt={student.name} />
                  <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{student.name}</h2>
                  <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <div className="flex gap-2 mt-2\
