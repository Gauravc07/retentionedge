"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, BookOpen, Calendar, Clock, TrendingUp } from "lucide-react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function StudentDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false)

  // Sample data for charts and metrics
  const attendanceData = [
    { date: "Week 1", value: 100 },
    { date: "Week 2", value: 100 },
    { date: "Week 3", value: 80 },
    { date: "Week 4", value: 100 },
    { date: "Week 5", value: 90 },
    { date: "Week 6", value: 100 },
    { date: "Week 7", value: 70 },
    { date: "Week 8", value: 90 },
  ]

  const performanceData = [
    { date: "Assignment 1", value: 85 },
    { date: "Quiz 1", value: 78 },
    { date: "Assignment 2", value: 92 },
    { date: "Midterm", value: 76 },
    { date: "Assignment 3", value: 88 },
    { date: "Quiz 2", value: 82 },
    { date: "Assignment 4", value: 90 },
    { date: "Final", value: 85 },
  ]

  const upcomingAssignments = [
    {
      id: 1,
      title: "Research Paper",
      course: "Advanced Data Structures",
      dueDate: "Apr 25, 2025",
      status: "Not Started",
    },
    { id: 2, title: "Group Project", course: "Machine Learning", dueDate: "May 2, 2025", status: "In Progress" },
    { id: 3, title: "Final Exam", course: "Database Systems", dueDate: "May 15, 2025", status: "Not Started" },
  ]

  const recommendations = [
    {
      id: 1,
      title: "Attend tutoring sessions",
      description: "Based on your recent quiz performance, we recommend attending tutoring for Database Systems",
      priority: "High",
    },
    {
      id: 2,
      title: "Improve attendance",
      description:
        "Your attendance has dropped in the past two weeks. Regular attendance is strongly correlated with better grades.",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Join study group",
      description: "Students who participate in study groups show 15% better performance on average",
      priority: "Low",
    },
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

  // Detailed weekly attendance records
  const weeklyAttendanceRecords = [
    {
      week: "Week 1 (Apr 1-7)",
      days: [
        { date: "Apr 1", day: "Mon", status: "present", course: "Data Structures" },
        { date: "Apr 2", day: "Tue", status: "present", course: "Database Systems" },
        { date: "Apr 3", day: "Wed", status: "present", course: "Web Development" },
        { date: "Apr 4", day: "Thu", status: "present", course: "Algorithms" },
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
        { date: "Apr 11", day: "Thu", status: "present", course: "Algorithms" },
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
        { date: "Apr 18", day: "Thu", status: "present", course: "Algorithms" },
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
        { date: "Apr 25", day: "Thu", status: "present", course: "Algorithms" },
        { date: "Apr 26", day: "Fri", status: "no-class", course: "" },
      ],
      percentage: "75%",
    },
  ]

  const handleAddToCalendar = (assignment) => {
    // In a real app, this would integrate with the calendar API
    console.log(`Adding to calendar: ${assignment.title}`)
    alert(`${assignment.title} has been added to your calendar`)
  }

  const handleTakeAction = (recommendation) => {
    // In a real app, this would trigger specific actions based on the recommendation
    console.log(`Taking action on: ${recommendation.title}`)
    alert(`Action taken on: ${recommendation.title}`)
  }

  const viewAttendance = () => {
    setShowAttendanceDialog(true)
  }

  return (
    <DashboardLayout role="student">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={viewAttendance}>
              <Calendar className="mr-2 h-4 w-4" />
              View Attendance
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
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
              <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
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
              <CardDescription>Your grades across all assessments</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={performanceData} xAxisKey="date" yAxisKey="value" className="h-full">
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
              <CardDescription>Your weekly attendance record</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={attendanceData} xAxisKey="date" yAxisKey="value" className="h-full">
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

        {/* Tabs for Assignments and Recommendations */}
        <Tabs defaultValue="assignments" className="w-full">
          <TabsList>
            <TabsTrigger value="assignments">Upcoming Assignments</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Log</TabsTrigger>
          </TabsList>
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Assignments</CardTitle>
                <CardDescription>Manage your upcoming deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">Due: {assignment.dueDate}</div>
                        <Button variant="outline" size="sm" onClick={() => handleAddToCalendar(assignment)}>
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
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>AI-powered suggestions to improve your performance</CardDescription>
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
                      <Button variant="outline" size="sm" onClick={() => handleTakeAction(recommendation)}>
                        Take Action
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Log</CardTitle>
                <CardDescription>Detailed record of your attendance by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyAttendanceRecords.map((week, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{week.week}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Attendance Rate:</span>
                          <span
                            className={`text-sm font-bold ${
                              week.percentage === "100%" ? "text-green-600" : "text-amber-600"
                            }`}
                          >
                            {week.percentage}
                          </span>
                        </div>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead className="w-[80px]">Day</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {week.days.map((day, dayIndex) => (
                            <TableRow key={dayIndex}>
                              <TableCell>{day.date}</TableCell>
                              <TableCell>{day.day}</TableCell>
                              <TableCell>{day.course || "—"}</TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                    day.status === "present"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : day.status === "absent"
                                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                        : "bg-gray-100 text-gray-500 dark:bg-gray-800/30 dark:text-gray-400"
                                  }`}
                                >
                                  {day.status === "present"
                                    ? "Present"
                                    : day.status === "absent"
                                      ? "Absent"
                                      : "No Class"}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
            <DialogDescription>Your daily attendance record for the current semester.</DialogDescription>
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
    </DashboardLayout>
  )
}
