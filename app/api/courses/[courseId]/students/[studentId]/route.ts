import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// DELETE to remove a student from a course
export async function DELETE(request: Request, { params }: { params: { courseId: string; studentId: string } }) {
  try {
    const { courseId, studentId } = params

    await prisma.enrollment.deleteMany({
      where: {
        courseId,
        studentId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing student from course:", error)
    return NextResponse.json({ error: "Failed to remove student from course" }, { status: 500 })
  }
}
