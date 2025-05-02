"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowUpRight, Calendar, Search, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChartBar,
  type ChartAxisOptions,
  ChartContainer,
  ChartGrid,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ProfessorDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showInterventionDialog, setShowInterventionDialog] = useState(false)

  // Sample data for charts and metrics
  const classPerformanceData = [
    { course: "CS101", value: 78 },
    { course: "CS201", value: 82 },
    { course: "CS301", value: 75 },
    { course: "CS401", value: 88 },
  ]

  const riskDistributionData = [
    { risk: "High", count: 12 },
    { risk: "Medium", count: 28 },
    { risk: "Low", count: 85 },
  ]

  const atRiskStudents = [
    {
      id: 1,
      name: "Emma Wilson",
      course: "CS301",
      riskScore: 85,
      trend: "up",
      factors: ["Poor attendance", "Missing assignments"],
    },
    {
      id: 2,
      name: "James Rodriguez",
      course: "CS201",
      riskScore: 78,
      trend: "down",
      factors: ["Low test scores", "Late submissions"],
    },
    {
      id: 3,
      name: "Sophia Chen",
      course: "CS401",
      riskScore: 72,
      trend: "up",
      factors: ["Declining grades", "Participation issues"],
    },
    {
      id: 4,
      name: "Michael Johnson",
      course: "CS101",
      riskScore: 68,
      trend: "down",
      factors: ["Attendance issues", "Missing assignments"],
    },
  ]

  const recentInterventions = [
    { id: 1, student: "Emma Wilson", action: "Email sent", date: "Apr 15, 2025", status: "Pending" },
    { id: 2, student: "James Rodriguez", action: "Tutoring assigned", date: "Apr 12, 2025", status: "In Progress" },
    { id: 3, student: "Sophia Chen", action: "Meeting scheduled", date: "Apr 10, 2025", status: "Completed" },
  ]

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleIntervene = (student) => {
    setSelectedStudent(student)
    setShowInterventionDialog(true)
  }

  const handleViewStudentProfile = (student) => {
    // In a real app, this would navigate to the student's profile page
    router.push(`/dashboard/professor/students/${student.id}`)
  }

  const handleInterventionAction = (action) => {
    // In a real app, this would create an intervention record in the database
    console.log(`Creating ${action} intervention for ${selectedStudent.name}`)
    setShowInterventionDialog(false)
    alert(`${action} intervention created for ${selectedStudent.name}`)
  }

  const filteredStudents = atRiskStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Professor Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full sm:w-[250px] pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Apr 17, 2025
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">Across 4 courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">+2% from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">9.6% of total students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Intervention Success</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <div className="mt-2">
                <Progress value={78} className="h-2 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Average grades across your courses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={classPerformanceData} xAxisKey="course" yAxisKey="value" className="h-full">
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
                <ChartBar className="fill-teal-500" />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription>Student risk levels across all courses</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer data={riskDistributionData} xAxisKey="risk" yAxisKey="count" className="h-full">
                <ChartGrid />
                <ChartYAxis tickCount={5} />
                <ChartXAxis />
                <ChartBar
                  className="fill-current text-primary"
                  style={{
                    fill: (d) => {
                      if (d.risk === "High") return "#ef4444"
                      if (d.risk === "Medium") return "#f59e0b"
                      return "#22c55e"
                    },
                  }}
                />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for At-Risk Students and Interventions */}
        <Tabs defaultValue="at-risk" className="w-full">
          <TabsList>
            <TabsTrigger value="at-risk">At-Risk Students</TabsTrigger>
            <TabsTrigger value="interventions">Recent Interventions</TabsTrigger>
          </TabsList>
          <TabsContent value="at-risk">
            <Card>
              <CardHeader>
                <CardTitle>Students Requiring Attention</CardTitle>
                <CardDescription>Students with high dropout risk scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <div className="flex items-center">
                            <span className="font-medium text-red-500">{student.riskScore}%</span>
                            {student.trend === "up" ? (
                              <TrendingUp className="ml-1 h-4 w-4 text-red-500" />
                            ) : (
                              <TrendingDown className="ml-1 h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{student.factors.join(", ")}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Intervene
                              <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewStudentProfile(student)}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleIntervene(student)}>
                              Create Intervention
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="interventions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Interventions</CardTitle>
                <CardDescription>Track the status of your intervention efforts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterventions.map((intervention) => (
                    <div
                      key={intervention.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{intervention.student}</p>
                        <p className="text-sm text-muted-foreground">{intervention.action}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">{intervention.date}</div>
                        <div
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            intervention.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : intervention.status === "In Progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}
                        >
                          {intervention.status}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/professor/interventions/${intervention.id}`)}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Intervention Dialog */}
      {selectedStudent && (
        <Dialog open={showInterventionDialog} onOpenChange={setShowInterventionDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Intervention for {selectedStudent.name}</DialogTitle>
              <DialogDescription>
                Choose an intervention type to help this student improve their performance.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Risk Factors:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {selectedStudent.factors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Intervention Options:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start" onClick={() => handleInterventionAction("Email")}>
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleInterventionAction("Tutoring")}
                  >
                    Assign Tutoring
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleInterventionAction("Meeting")}
                  >
                    Schedule Meeting
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleInterventionAction("Counseling")}
                  >
                    Refer to Counseling
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowInterventionDialog(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}
