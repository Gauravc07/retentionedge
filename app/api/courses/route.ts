import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all courses for the logged-in professor
export async function GET(request: Request) {
  try {
    // In a real app, you would get the professor ID from the session
    const professorId = "your-professor-id" // Replace with actual auth logic

    const courses = await prisma.course.findMany({
      where: {
        professorId: professorId,
      },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    })

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

// POST to create a new course
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, code, description, semester, academicYear, credits, maxCapacity } = body

    // In a real app, you would get the professor ID from the session
    const professorId = "your-professor-id" // Replace with actual auth logic

    const course = await prisma.course.create({
      data: {
        name,
        code,
        description,
        semester,
        academicYear,
        credits: Number(credits),
        maxCapacity: maxCapacity ? Number(maxCapacity) : null,
        professorId,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
