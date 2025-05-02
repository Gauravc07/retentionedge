import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    const formattedStudents = students.map((student) => ({
      id: student.id,
      userId: student.userId,
      studentId: student.studentId,
      name: student.user.name,
      email: student.user.email,
    }))

    return NextResponse.json(formattedStudents)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}
