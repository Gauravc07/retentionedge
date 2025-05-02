// Helper functions for API calls

// Fetch all courses for the logged-in professor
export async function fetchProfessorCourses() {
  const response = await fetch("/api/courses")
  if (!response.ok) {
    throw new Error("Failed to fetch courses")
  }
  return response.json()
}

// Fetch students enrolled in a course
export async function fetchCourseStudents(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}/students`)
  if (!response.ok) {
    throw new Error("Failed to fetch students")
  }
  return response.json()
}

// Add a student to a course
export async function addStudentToCourse(courseId: string, studentId: string) {
  const response = await fetch(`/api/courses/${courseId}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studentId }),
  })
  if (!response.ok) {
    throw new Error("Failed to add student to course")
  }
  return response.json()
}

// Remove a student from a course
export async function removeStudentFromCourse(courseId: string, studentId: string) {
  const response = await fetch(`/api/courses/${courseId}/students/${studentId}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to remove student from course")
  }
  return response.json()
}

// Fetch grade items for a course
export async function fetchGradeItems(courseId: string) {
  const response = await fetch(`/api/courses/${courseId}/grade-items`)
  if (!response.ok) {
    throw new Error("Failed to fetch grade items")
  }
  return response.json()
}

// Create a new grade item
export async function createGradeItem(courseId: string, gradeItem: any) {
  const response = await fetch(`/api/courses/${courseId}/grade-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gradeItem),
  })
  if (!response.ok) {
    throw new Error("Failed to create grade item")
  }
  return response.json()
}

// Fetch grades for a grade item
export async function fetchGrades(courseId: string, gradeItemId: string) {
  const response = await fetch(`/api/courses/${courseId}/grade-items/${gradeItemId}/grades`)
  if (!response.ok) {
    throw new Error("Failed to fetch grades")
  }
  return response.json()
}

// Update grades for multiple students
export async function updateGrades(courseId: string, gradeItemId: string, grades: any[]) {
  const response = await fetch(`/api/courses/${courseId}/grade-items/${gradeItemId}/grades`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ grades }),
  })
  if (!response.ok) {
    throw new Error("Failed to update grades")
  }
  return response.json()
}

// Fetch all students (for adding to course)
export async function fetchAllStudents() {
  const response = await fetch("/api/students")
  if (!response.ok) {
    throw new Error("Failed to fetch students")
  }
  return response.json()
}
