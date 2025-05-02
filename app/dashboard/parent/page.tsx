"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, BookOpen, Calendar, Clock, Mail, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChartArea,
  type ChartAxisOptions,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartTooltipContent,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"
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
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

export default function ParentDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showMeetingDialog, setShowMeetingDialog] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailContent, setEmailContent] = useState("")
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingReason, setMeetingReason] = useState("")

  // Sample data for charts and metrics
  const gradesTrendData = [
    { month: "Sep", value: 82 },
    { month: "Oct", value: 78 },
    { month: "Nov", value: 75 },
    { month: "Dec", value: 80 },
    { month: "Jan", value: 85 },
    { month: "Feb", value: 82 },
    { month: "Mar", value: 78 },
    { month: "Apr", value: 80 },
  ]

  const attendanceData = [
    { month: "Sep", value: 95 },
    { month: "Oct", value: 92 },
    { month: "Nov", value: 88 },
    { month: "Dec", value: 90 },
    { month: "Jan", value: 94 },
    { month: "Feb", value: 91 },
    { month: "Mar", value: 89 },
    { month: "Apr", value: 92 },
  ]

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Conference", date: "Apr 25, 2025", time: "4:00 PM", location: "Room 203" },
    { id: 2, title: "End of Term Exams", date: "May 10-15, 2025", time: "All Day", location: "Various" },
    { id: 3, title: "School Science Fair", date: "May 20, 2025", time: "1:00 PM", location: "Main Hall" },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Encourage regular study habits",
      description: "Setting aside consistent study time each day can help improve performance in Database Systems",
      priority: "High",
    },
    {
      id: 2,
      title: "Monitor assignment completion",
      description: "Your child has missed 2 assignments in the past month. Regular check-ins may help.",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Consider additional math support",
      description: "Recent test scores indicate some challenges with advanced calculus concepts",
      priority: "Medium",
    },
  ]

  // Child information
  const childName = "Alex Johnson"
  const childGrade = "11th Grade"
  const childSchool = "Metropolitan High School"

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
      "2025-04-04",
      "2025-04-07",
      "2025-04-08",
      "2025-04-09",
      "2025-04-10",
      "2025-04-11",
      "2025-04-14",
      "2025-04-15",
      "2025-04-16",
      "2025-04-17",
      "2025-04-18",
      "2025-04-21",
      "2025-04-23",
      "2025-04-24",
      "2025-04-25",
      "2025-04-28",
      "2025-04-29",
      "2025-04-30",
    ].map((day) => parseISO(day))

    const absentDays = ["2025-04-22"].map((day) => parseISO(day))

    return days.map((day) => {
      const isPresent = attendanceDays.some((d) => isSameDay(d, day))
      const isAbsent = absentDays.some((d) => isSameDay(d, day))

      return {
        date: day,
        status: isPresent ? "present" : isAbsent ? "absent" : "no-class",
      }
    })
  }

  const handleAddToCalendar = (event) => {
    // In a real app, this would integrate with the calendar API
    console.log(`Adding to calendar: ${event.title}`)
    alert(`${event.title} has been added to your calendar`)
  }

  const viewAttendance = () => {
    setShowAttendanceDialog(true)
  }

  const openEmailDialog = () => {
    setShowEmailDialog(true)
  }

  const openMeetingDialog = () => {
    setShowMeetingDialog(true)
  }

  const sendEmail = () => {
    // In a real app, this would send an email to the professor
    console.log(`Sending email to professor: ${emailSubject}`)
    alert("Email sent to professor")
    setShowEmailDialog(false)
  }

  const scheduleMeeting = () => {
    // In a real app, this would schedule a meeting with the professor
    console.log(`Scheduling meeting for ${meetingDate} at ${meetingTime}`)
    alert("Meeting request sent to professor")
    setShowMeetingDialog(false)
  }

  return (
    <DashboardLayout role="parent">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={childName} />
              <AvatarFallback>{childName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{childName}'s Progress</h1>
              <p className="text-sm text-muted-foreground">
                {childGrade} • {childSchool}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={viewAttendance}>
              <Calendar className="mr-2 h-4 w-4" />
              View Attendance
            </Button>
            <Button variant="outline" size="sm" onClick={openEmailDialog}>
              <Mail className="mr-2 h-4 w-4" />
              Contact Professor
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.75</div>
              <p className="text-xs text-muted-foreground">+0.12 from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">-3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18/20</div>
              <p className="text-xs text-muted-foreground">90% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dropout Risk</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Low</div>
              <div className="mt-2">
                <Progress value={15} className="h-2 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Grade trends over the academic year</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={gradesTrendData} xAxisKey="month" yAxisKey="value" className="h-full">
                <ChartGrid />
                <ChartYAxis
                  tickCount={5}
                  tickFormat={(value) => `${value}%`}
                  axisOptions={
                    {
                      domain: [0, 100],
                    } as ChartAxisOptions
                  }
                />
                <ChartXAxis />
                <ChartArea className="fill-teal-100/20" />
                <ChartLine className="stroke-teal-500" />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Monthly attendance record</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={attendanceData} xAxisKey="month" yAxisKey="value" className="h-full">
                <ChartGrid />
                <ChartYAxis
                  tickCount={5}
                  tickFormat={(value) => `${value}%`}
                  axisOptions={
                    {
                      domain: [0, 100],
                    } as ChartAxisOptions
                  }
                />
                <ChartXAxis />
                <ChartArea className="fill-blue-100/20" />
                <ChartLine className="stroke-blue-500" />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Events and Recommendations */}
        <Tabs defaultValue="events" className="w-full">
          <TabsList>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>School Events</CardTitle>
                <CardDescription>Important dates and events to remember</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date} • {event.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">{event.location}</div>
                        <Button variant="outline" size="sm" onClick={() => handleAddToCalendar(event)}>
                          Add to Calendar
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Parental Support Recommendations</CardTitle>
                <CardDescription>Suggestions to help your child succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((recommendation) => (
                    <div
                      key={recommendation.id}
                      className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div
                        className={`mt-0.5 rounded-full px-2 py-1 text-xs font-medium ${
                          recommendation.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : recommendation.priority === "Medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {recommendation.priority} Priority
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="font-medium">{recommendation.title}</p>
                        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={openMeetingDialog}>
                        Schedule Meeting
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Attendance Dialog */}
      <Dialog open={showAttendanceDialog} onOpenChange={setShowAttendanceDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Attendance Record - {format(selectedDate, "MMMM yyyy")}</DialogTitle>
            <DialogDescription>Your child's daily attendance record for the current semester.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-7 gap-2 mt-4">
            <div className="text-center font-medium text-sm">Mon</div>
            <div className="text-center font-medium text-sm">Tue</div>
            <div className="text-center font-medium text-sm">Wed</div>
            <div className="text-center font-medium text-sm">Thu</div>
            <div className="text-center font-medium text-sm">Fri</div>
            <div className="text-center font-medium text-sm">Sat</div>
            <div className="text-center font-medium text-sm">Sun</div>

            {getDailyAttendanceData().map((day, i) => (
              <div
                key={i}
                className={`h-12 flex items-center justify-center rounded-md text-sm ${
                  day.status === "present"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : day.status === "absent"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-gray-100 text-gray-400 dark:bg-gray-800/30 dark:text-gray-500"
                }`}
              >
                {format(day.date, "d")}
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Present</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Absent</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
              <span>No Class</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Professor</DialogTitle>
            <DialogDescription>Send an email to your child's professor.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Enter email subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Write your message here..."
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
              Cancel
            </Button>
            <Button onClick={sendEmail}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Meeting Dialog */}
      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule a Meeting</DialogTitle>
            <DialogDescription>Request a meeting with your child's professor.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input id="date" type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Input id="time" type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Meeting</Label>
              <Textarea
                id="reason"
                value={meetingReason}
                onChange={(e) => setMeetingReason(e.target.value)}
                placeholder="Please describe the reason for this meeting..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={scheduleMeeting}>Request Meeting</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

const Input = ({ id, type = "text", value, onChange, placeholder = "", className = "" }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}
