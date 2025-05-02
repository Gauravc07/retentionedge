"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Bell,
} from "lucide-react"

interface SidebarNavProps {
  role: "student" | "professor" | "parent"
}

export function SidebarNav({ role }: SidebarNavProps) {
  const pathname = usePathname()

  // Define navigation items based on role
  const navItems = {
    student: [
      {
        title: "Dashboard",
        href: "/dashboard/student",
        icon: LayoutDashboard,
      },
      {
        title: "Courses",
        href: "/dashboard/student/courses",
        icon: BookOpen,
      },
      {
        title: "Grades",
        href: "/dashboard/student/grades",
        icon: GraduationCap,
      },
      {
        title: "Calendar",
        href: "/dashboard/student/calendar",
        icon: Calendar,
      },
      {
        title: "Messages",
        href: "/dashboard/student/messages",
        icon: MessageSquare,
      },
    ],
    professor: [
      {
        title: "Dashboard",
        href: "/dashboard/professor",
        icon: LayoutDashboard,
      },
      {
        title: "Calendar",
        href: "/dashboard/professor/calendar",
        icon: Calendar,
      },
      {
        title: "Students",
        href: "/dashboard/professor/students",
        icon: Users,
      },
      {
        title: "Courses",
        href: "/dashboard/professor/courses",
        icon: BookOpen,
        submenu: [
          {
            title: "My Courses",
            href: "/dashboard/professor/courses",
          },
          {
            title: "Classroom",
            href: "/dashboard/professor/classroom",
          },
          {
            title: "Course Management",
            href: "/dashboard/professor/course-management",
          },
          {
            title: "Create Course",
            href: "/dashboard/professor/courses/create",
          },
          {
            title: "Assignments",
            href: "/dashboard/professor/assignments",
          },
        ],
      },
      {
        title: "Analytics",
        href: "/dashboard/professor/analytics",
        icon: BarChart3,
      },
      {
        title: "Alerts",
        href: "/dashboard/professor/alerts",
        icon: Bell,
      },
      {
        title: "Messages",
        href: "/dashboard/professor/messages",
        icon: MessageSquare,
      },
      {
        title: "Settings",
        href: "/dashboard/professor/settings",
        icon: Settings,
      },
    ],
    parent: [
      {
        title: "Dashboard",
        href: "/dashboard/parent",
        icon: LayoutDashboard,
      },
      {
        title: "Students",
        href: "/dashboard/parent/students",
        icon: Users,
      },
      {
        title: "Progress",
        href: "/dashboard/parent/progress",
        icon: BarChart3,
      },
      {
        title: "Messages",
        href: "/dashboard/parent/messages",
        icon: MessageSquare,
      },
    ],
  }

  const items = navItems[role]

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const isActive = item.submenu
          ? item.submenu.some((subItem) => pathname === subItem.href)
          : pathname === item.href

        return (
          <div key={item.href} className="flex flex-col">
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
            {item.submenu && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-1.5 text-sm transition-all hover:text-primary",
                      pathname === subItem.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                    )}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
