"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Lock, User, Mail, Phone } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [profileData, setProfileData] = useState({
    name: "Dr. Rajiv Mehta",
    email: "rajiv.mehta@university.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    title: "Associate Professor",
    bio: "Associate Professor of Computer Science with 10+ years of experience in teaching and research. Specializing in machine learning, data science, and educational technology.",
    avatar: "/placeholder.svg?height=100&width=100&text=RM",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    studentRiskAlerts: true,
    attendanceAlerts: true,
    gradeAlerts: true,
    systemNotifications: true,
    dailyDigest: false,
    weeklyReport: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: "30",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to update the profile
      // await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle notification settings submission
  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to update notification settings
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle security settings submission
  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call to update security settings
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Security settings updated",
        description: "Your security preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update security settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle input change for profile
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle switch change for notifications
  const handleNotificationSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle switch change for security
  const handleSecuritySwitchChange = (name: string, checked: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: checked }))
  }

  // Handle select change for security
  const handleSecuritySelectChange = (name: string, value: string) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                      <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">{profileData.name}</h3>
                      <p className="text-sm text-muted-foreground">{profileData.title}</p>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={profileData.name} onChange={handleProfileChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        name="title"
                        value={profileData.title}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input id="phone" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={profileData.department}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleProfileChange} rows={4} />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <form onSubmit={handleNotificationSubmit}>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive notifications and alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-alerts">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-alerts"
                          checked={notificationSettings.emailAlerts}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("emailAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-alerts">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          id="sms-alerts"
                          checked={notificationSettings.smsAlerts}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("smsAlerts", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="student-risk-alerts">Student Risk Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications when students are flagged as at-risk
                          </p>
                        </div>
                        <Switch
                          id="student-risk-alerts"
                          checked={notificationSettings.studentRiskAlerts}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("studentRiskAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
                          <p className="text-sm text-muted-foreground">Notifications about student attendance issues</p>
                        </div>
                        <Switch
                          id="attendance-alerts"
                          checked={notificationSettings.attendanceAlerts}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("attendanceAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="grade-alerts">Grade Alerts</Label>
                          <p className="text-sm text-muted-foreground">Notifications about significant grade changes</p>
                        </div>
                        <Switch
                          id="grade-alerts"
                          checked={notificationSettings.gradeAlerts}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("gradeAlerts", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-notifications">System Notifications</Label>
                          <p className="text-sm text-muted-foreground">Updates about the system and new features</p>
                        </div>
                        <Switch
                          id="system-notifications"
                          checked={notificationSettings.systemNotifications}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("systemNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Summary Reports</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="daily-digest">Daily Digest</Label>
                          <p className="text-sm text-muted-foreground">Receive a daily summary of all activities</p>
                        </div>
                        <Switch
                          id="daily-digest"
                          checked={notificationSettings.dailyDigest}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("dailyDigest", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weekly-report">Weekly Report</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of student performance
                          </p>
                        </div>
                        <Switch
                          id="weekly-report"
                          checked={notificationSettings.weeklyReport}
                          onCheckedChange={(checked) => handleNotificationSwitchChange("weeklyReport", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Preferences"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <form onSubmit={handleSecuritySubmit}>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Authentication</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          id="two-factor-auth"
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSecuritySwitchChange("twoFactorAuth", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-notifications">Login Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when someone logs into your account
                          </p>
                        </div>
                        <Switch
                          id="login-notifications"
                          checked={securitySettings.loginNotifications}
                          onCheckedChange={(checked) => handleSecuritySwitchChange("loginNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Select
                          value={securitySettings.sessionTimeout}
                          onValueChange={(value) => handleSecuritySelectChange("sessionTimeout", value)}
                        >
                          <SelectTrigger id="session-timeout">
                            <SelectValue placeholder="Select timeout duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Automatically log out after a period of inactivity
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    <div className="space-y-3">
                      <Button variant="outline" type="button">
                        <Lock className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Security Settings"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
