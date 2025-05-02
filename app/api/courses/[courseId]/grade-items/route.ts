import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// GET all grade items for a course
export async function GET(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId

    const gradeItems = await prisma.gradeItem.findMany({
      where: {
        courseId: courseId,
      },
    })

    return NextResponse.json(gradeItems)
  } catch (error) {
    console.error("Error fetching grade items:", error)
    return NextResponse.json({ error: "Failed to fetch grade items" }, { status: 500 })
  }
}

// POST to create a new grade item
export async function POST(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const courseId = params.courseId
    const { title, description, type, maxScore, weight, dueDate } = await request.json()

    const gradeItem = await prisma.gradeItem.create({
      data: {
        title,
        description,
        type,
        maxScore: Number(maxScore),
        weight: Number(weight),
        dueDate: dueDate ? new Date(dueDate) : null,
        courseId,
      },
    })

    return NextResponse.json(gradeItem)
  } catch (error) {
    console.error("Error creating grade item:", error)
    return NextResponse.json({ error: "Failed to create grade item" }, { status: 500 })
  }
}
