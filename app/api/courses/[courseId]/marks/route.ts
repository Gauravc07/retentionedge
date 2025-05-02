import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all marks for a course
export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId

    // Get all grade items for the course
    const gradeItems = await prisma.gradeItem.findMany({
      where: {
        courseId: courseId,
      },
    })

    // Get all students enrolled in the course
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
              },
            },
          },
        },
      },
    })

    // Get all grades for the course
    const grades = await prisma.grade.findMany({
      where: {
        gradeItem: {
          courseId: courseId,
        },
      },
    })

    // Format the data for the response
    const formattedData = {
      gradeItems,
      students: enrollments.map((enrollment) => ({
        id: enrollment.studentId,
        name: enrollment.student.user.name,
        studentId: enrollment.student.studentId,
      })),
      grades: grades.reduce(
        (acc, grade) => {
          if (!acc[grade.gradeItemId]) {
            acc[grade.gradeItemId] = {}
          }
          acc[grade.gradeItemId][grade.studentId] = grade.score
          return acc
        },
        {} as Record<string, Record<string, number>>,
      ),
    }

    return NextResponse.json(formattedData)
  } catch (error) {
    console.error("Error fetching marks:", error)
    return NextResponse.json({ error: "Failed to fetch marks" }, { status: 500 })
  }
}

// POST to update marks for a course
export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId
    const { marks } = await request.json()

    // marks should be an object like { gradeItemId: { studentId: score } }
    const results = []

    for (const gradeItemId in marks) {
      const studentMarks = marks[gradeItemId]

      for (const studentId in studentMarks) {
        const score = studentMarks[studentId]

        // Check if grade already exists
        const existingGrade = await prisma.grade.findFirst({
          where: {
            studentId,
            gradeItemId,
          },
        })

        if (existingGrade) {
          // Update existing grade
          const updatedGrade = await prisma.grade.update({
            where: {
              id: existingGrade.id,
            },
            data: {
              score: Number(score),
              submissionDate: new Date(),
            },
          })
          results.push(updatedGrade)
        } else {
          // Create new grade
          const newGrade = await prisma.grade.create({
            data: {
              studentId,
              gradeItemId,
              score: Number(score),
              submissionDate: new Date(),
            },
          })
          results.push(newGrade)
        }
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error updating marks:", error)
    return NextResponse.json({ error: "Failed to update marks" }, { status: 500 })
  }
}
