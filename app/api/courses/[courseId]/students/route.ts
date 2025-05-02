import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all students in a course
export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId

    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    const students = enrollments.map((enrollment) => ({
      id: enrollment.student.id,
      userId: enrollment.student.userId,
      studentId: enrollment.student.studentId,
      name: enrollment.student.user.name,
      email: enrollment.student.user.email,
    }))

    return NextResponse.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

// POST to add a student to a course
export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId
    const { studentId } = await request.json()

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    })

    return NextResponse.json(enrollment)
  } catch (error) {
    console.error("Error adding student to course:", error)
    return NextResponse.json({ error: "Failed to add student to course" }, { status: 500 })
  }
}
