"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { AlertCircle, Bell, Check, Clock, Eye, GraduationCap, TrendingDown, TrendingUp, X } from "lucide-react"

// Mock alerts data
const mockAlerts = [
  {
    id: "1",
    type: "risk",
    student: {
      id: "3",
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40&text=AK",
    },
    course: "CS301",
    message: "Student's risk score has increased to high risk level (72%).",
    date: "2025-04-15T10:30:00",
    read: false,
    trend: "up",
  },
  {
    id: "2",
    type: "attendance",
    student: {
      id: "5",
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=40&width=40&text=VS",
    },
    course: "CS405",
    message: "Student has missed 3 consecutive classes.",
    date: "2025-04-14T14:15:00",
    read: false,
    trend: "down",
  },
  {
    id: "3",
    type: "grade",
    student: {
      id: "7",
      name: "Rajesh Khanna",
      avatar: "/placeholder.svg?height=40&width=40&text=RK",
    },
    course: "CS301",
    message: "Student's grade has dropped below passing threshold in recent assignment.",
    date: "2025-04-13T09:45:00",
    read: true,
    trend: "down",
  },
  {
    id: "4",
    type: "system",
    message: "New course evaluation results are available for CS405.",
    date: "2025-04-12T16:20:00",
    read: true,
  },
  {
    id: "5",
    type: "risk",
    student: {
      id: "2",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
    },
    course: "CS405",
    message: "Student's risk score has increased to medium risk level (45%).",
    date: "2025-04-11T11:10:00",
    read: true,
    trend: "up",
  },
]

export default function AlertsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState("all")

  // Filter alerts
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "unread") return !alert.read
    return alert.type === filter
  })

  // Mark alert as read
  const markAsRead = (alertId: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, read: true } : alert)))
    toast({
      title: "Alert marked as read",
      description: "The alert has been marked as read.",
    })
  }

  // Dismiss alert
  const dismissAlert = (alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    toast({
      title: "Alert dismissed",
      description: "The alert has been dismissed.",
    })
  }

  // Mark all as read
  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, read: true })))
    toast({
      title: "All alerts marked as read",
      description: "All alerts have been marked as read.",
    })
  }

  // View student profile
  const viewStudentProfile = (studentId: string) => {
    router.push(`/dashboard/professor/students/${studentId}`)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Get alert badge variant
  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "risk":
        return "destructive"
      case "attendance":
        return "warning"
      case "grade":
        return "default"
      case "system":
        return "outline"
      default:
        return "default"
    }
  }

  // Get alert icon
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "risk":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "attendance":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "grade":
        return <GraduationCap className="h-5 w-5 text-blue-500" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Get alert type text
  const getAlertTypeText = (type: string) => {
    switch (type) {
      case "risk":
        return "Risk Alert"
      case "attendance":
        return "Attendance Alert"
      case "grade":
        return "Grade Alert"
      case "system":
        return "System Notification"
      default:
        return "Alert"
    }
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={!alerts.some((alert) => !alert.read)}>
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="outline" className="ml-2">
                {alerts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="outline" className="ml-2">
                {alerts.filter((alert) => !alert.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grade">Grades</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {filter === "all"
                    ? "All Alerts"
                    : filter === "unread"
                      ? "Unread Alerts"
                      : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Alerts`}
                </CardTitle>
                <CardDescription>
                  {filter === "all"
                    ? "View all alerts and notifications"
                    : filter === "unread"
                      ? "Alerts that require your attention"
                      : `Alerts related to ${filter}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.length > 0 ? (
                    filteredAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${!alert.read ? "bg-muted/50" : ""}`}
                      >
                        <div className="flex-shrink-0">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Badge variant={getAlertBadgeVariant(alert.type)}>{getAlertTypeText(alert.type)}</Badge>
                            {!alert.read && <Badge variant="outline">New</Badge>}
                          </div>
                          <div className="mt-2">
                            {alert.student && (
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={alert.student.avatar || "/placeholder.svg"}
                                    alt={alert.student.name}
                                  />
                                  <AvatarFallback>{alert.student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{alert.student.name}</span>
                                {alert.trend && (
                                  <>
                                    {alert.trend === "up" ? (
                                      <TrendingUp className="h-4 w-4 text-red-500" />
                                    ) : (
                                      <TrendingDown className="h-4 w-4 text-green-500" />
                                    )}
                                  </>
                                )}
                              </div>
                            )}
                            <p className="text-sm">{alert.message}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              {alert.course && <span>{alert.course}</span>}
                              <span>•</span>
                              <span>{formatDate(alert.date)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {alert.student && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => viewStudentProfile(alert.student.id)}
                              title="View Student Profile"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          {!alert.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(alert.id)}
                              title="Mark as Read"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => dismissAlert(alert.id)} title="Dismiss">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-3">
                        <Bell className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No alerts found</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {filter === "all"
                          ? "You don't have any alerts or notifications."
                          : filter === "unread"
                            ? "You don't have any unread alerts."
                            : `You don't have any ${filter} alerts.`}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
