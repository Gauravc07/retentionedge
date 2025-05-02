"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Download, BarChart3, PieChart, LineChart, Users, AlertCircle } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"

// Mock analytics data
const mockPerformanceData = [
  { course: "CS301", average: 78, highest: 95, lowest: 62, atRisk: 5, excellent: 12 },
  { course: "CS405", average: 82, highest: 98, lowest: 65, atRisk: 3, excellent: 15 },
  { course: "CS210", average: 75, highest: 92, lowest: 58, atRisk: 8, excellent: 10 },
]

const mockAttendanceData = [
  { course: "CS301", average: 85, excellent: 20, good: 15, poor: 10 },
  { course: "CS405", average: 88, excellent: 18, good: 16, poor: 4 },
  { course: "CS210", average: 78, excellent: 15, good: 20, poor: 17 },
]

const mockRiskFactors = [
  { factor: "Poor attendance", count: 15, percentage: 35 },
  { factor: "Missing assignments", count: 12, percentage: 28 },
  { factor: "Low test scores", count: 10, percentage: 23 },
  { factor: "Declining grades", count: 6, percentage: 14 },
]

const mockInterventionSuccess = [
  { type: "Email", success: 65, total: 100 },
  { type: "Meeting", success: 85, total: 100 },
  { type: "Tutoring", success: 78, total: 100 },
  { type: "Counseling", success: 72, total: 100 },
]

export default function AnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [timeRange, setTimeRange] = useState("semester")

  // Get course-specific data if a course is selected
  const courseData = selectedCourse === "all"
    ? null
    : mockPerformanceData.find(course => course.course === selectedCourse)

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+2% from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16</div>
              <p className="text-xs text-muted-foreground">12.8% of total students</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Intervention Success</CardTitle>
              <LineChart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <div className="mt-2">
                <Progress value={75} className="h-2 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>
                    {selectedCourse === "all" ? "Average across all courses" : `${selectedCourse} grade distribution`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>
                    {selectedCourse === "all" ? "All courses" : selectedCourse}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Average Grade</span>
                        <span className="font-bold">{courseData ? courseData.average : 78}%</span>
                      </div>
                      <Progress value={courseData ? courseData.average : 78} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Highest Grade</span>
                        <span className="font-bold">{courseData ? courseData.highest : 95}%</span>
                      </div>
                      <Progress value={courseData ? courseData.highest : 95} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Lowest Grade</span>
                        <span className="font-bold">{courseData ? courseData.lowest : 62}%</span>
                      </div>
                      <Progress value={courseData ? courseData.lowest : 62} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <span className="text-sm font-medium">At-Risk Students</span>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-bold">{courseData ? courseData.atRisk : 16}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Excellent Performers</span>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span className="font-bold">{courseData ? courseData.excellent : 37}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>
                    {selectedCourse === "all" ? "All courses" : selectedCourse}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <BarChart3 className="h-40 w-40 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attendance Breakdown</CardTitle>
                  <CardDescription>Student attendance categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {(selectedCourse === "all" ? mockAttendanceData : [mockAttendanceData.find(c => c.course === selectedCourse)].filter(Boolean)).map((course) => (
                      <div key={course.course} className="space-y-4">
                        {selectedCourse === "all" && (
                          <h3 className="font-medium">{course.course}</h3>
                        )}
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Average Attendance</span>
                            <span className="font-bold">{course.average}%</span>
                          </div>
                          <Progress value={course.average} className="h-2" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Excellent (90%+)</span>
                            <div className="font-bold">{course.excellent} students</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground">Good (75-90%)</span>
                            <div className="font-bold">{course.good} students</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs text-muted-foreground\">Poor (<75%)</span>
                            <div className="font-bold">{course.poor} students</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                  <CardDescription>Primary factors contributing to dropout risk</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockRiskFactors.map((factor) => (
                      <div key={factor.factor} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{factor.factor}</span>
                          <span className="text-sm text-muted-foreground">{factor.count} students</span>
                        </div>
                        <Progress value={factor.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">{factor.percentage}% of at-risk cases</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Student risk levels across courses</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <PieChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intervention Success Rate</CardTitle>
                  <CardDescription>Effectiveness of different intervention types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockInterventionSuccess.map((intervention) => (
                      <div key={intervention.type} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{intervention.type}</span>
                          <span className="font-bold">{intervention.success}%</span>
                        </div>
                        <Progress value={intervention.success} className="h-2" />
                        <p className="text-xs text-muted-foreground text-right">
                          {intervention.success} of {intervention.total} successful cases
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Intervention Timeline</CardTitle>
                  <CardDescription>Success rate over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex items-center justify-center h-full">
                    <LineChart className="h-40 w-40 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
