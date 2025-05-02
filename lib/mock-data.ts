export const mockCourses = [
  {
    id: "1",
    code: "CS301",
    name: "Data Structures and Algorithms",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 4,
    enrolledStudents: 45,
    maxCapacity: 60,
  },
  {
    id: "2",
    code: "CS405",
    name: "Database Management Systems",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 3,
    enrolledStudents: 38,
    maxCapacity: 50,
  },
  {
    id: "3",
    code: "CS210",
    name: "Object-Oriented Programming",
    semester: "Spring",
    academicYear: "2024-2025",
    credits: 4,
    enrolledStudents: 52,
    maxCapacity: 55,
  },
]

export const mockStudents = [
  {
    id: "1",
    name: "Rahul Sharma",
    studentId: "2021CS01",
    email: "rahul.sharma@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=RS",
  },
  {
    id: "2",
    name: "Priya Patel",
    studentId: "2021CS02",
    email: "priya.patel@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
  },
  {
    id: "3",
    name: "Amit Kumar",
    studentId: "2021CS03",
    email: "amit.kumar@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=AK",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    studentId: "2021CS04",
    email: "sneha.gupta@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=SG",
  },
  {
    id: "5",
    name: "Vikram Singh",
    studentId: "2021CS05",
    email: "vikram.singh@university.edu",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
  },
]

export const mockEnrollments = {
  "1": [
    { studentId: "1", grades: { assignment1: 85, midterm: 78, quiz1: 90 } },
    { studentId: "2", grades: { assignment1: 92, midterm: 88, quiz1: 85 } },
    { studentId: "3", grades: { assignment1: 78, midterm: 72, quiz1: 80 } },
    { studentId: "5", grades: { assignment1: 88, midterm: 90, quiz1: 92 } },
  ],
  "2": [
    { studentId: "1", grades: { assignment1: 90, midterm: 85, quiz1: 88 } },
    { studentId: "4", grades: { assignment1: 95, midterm: 92, quiz1: 90 } },
  ],
  "3": [
    { studentId: "2", grades: { assignment1: 85, midterm: 80, quiz1: 82 } },
    { studentId: "3", grades: { assignment1: 90, midterm: 85, quiz1: 88 } },
    { studentId: "4", grades: { assignment1: 78, midterm: 75, quiz1: 80 } },
  ],
}

export const mockGradeItems = {
  "1": [
    { id: "g1", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 15 },
    { id: "g2", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g3", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 30 },
  ],
  "2": [
    { id: "g6", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 10 },
    { id: "g7", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g8", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 25 },
  ],
  "3": [
    { id: "g11", title: "Assignment 1", type: "ASSIGNMENT", maxScore: 100, weight: 15 },
    { id: "g12", title: "Quiz 1", type: "QUIZ", maxScore: 50, weight: 10 },
    { id: "g13", title: "Midterm", type: "MIDTERM", maxScore: 100, weight: 25 },
  ],
}

export const mockGrades = {
  "1": {
    g1: { "1": 85, "2": 92, "3": 78, "5": 88 },
    g2: { "1": 90, "2": 85, "3": 80, "5": 92 },
    g3: { "1": 78, "2": 88, "3": 72, "5": 90 },
  },
  "2": {
    g6: { "1": 90, "4": 95 },
    g7: { "1": 88, "4": 90 },
    g8: { "1": 85, "4": 92 },
  },
  "3": {
    g11: { "2": 85, "3": 90, "4": 78 },
    g12: { "2": 82, "3": 88, "4": 80 },
    g13: { "2": 80, "3": 85, "4": 75 },
  },
}
