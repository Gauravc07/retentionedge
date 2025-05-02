import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all grades for a grade item
export async function GET(request: Request, { params }: { params: { courseId: string; gradeItemId: string } }) {
  try {
    const { gradeItemId } = params

    const grades = await prisma.grade.findMany({
      where: {
        gradeItemId: gradeItemId,
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

    return NextResponse.json(grades)
  } catch (error) {
    console.error("Error fetching grades:", error)
    return NextResponse.json({ error: "Failed to fetch grades" }, { status: 500 })
  }
}

// POST to update or create grades for multiple students
export async function POST(request: Request, { params }: { params: { courseId: string; gradeItemId: string } }) {
  try {
    const { gradeItemId } = params
    const { grades } = await request.json()

    // grades should be an array of { studentId, score }
    const results = await Promise.all(
      grades.map(async (grade: { studentId: string; score: number }) => {
        // Check if grade already exists
        const existingGrade = await prisma.grade.findFirst({
          where: {
            studentId: grade.studentId,
            gradeItemId: gradeItemId,
          },
        })

        if (existingGrade) {
          // Update existing grade
          return prisma.grade.update({
            where: {
              id: existingGrade.id,
            },
            data: {
              score: Number(grade.score),
              submissionDate: new Date(),
            },
          })
        } else {
          // Create new grade
          return prisma.grade.create({
            data: {
              studentId: grade.studentId,
              gradeItemId: gradeItemId,
              score: Number(grade.score),
              submissionDate: new Date(),
            },
          })
        }
      }),
    )

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error updating grades:", error)
    return NextResponse.json({ error: "Failed to update grades" }, { status: 500 })
  }
}
