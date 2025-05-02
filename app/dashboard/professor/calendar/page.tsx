"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { format, isSameDay } from "date-fns"
import { Plus, Clock, MapPin } from "lucide-react"

// Mock events data
const mockEvents = [
  {
    id: "1",
    title: "CS301 Lecture",
    description: "Data Structures and Algorithms lecture",
    date: new Date(2025, 3, 15),
    startTime: "10:00",
    endTime: "11:30",
    location: "Room 101",
    type: "lecture",
  },
  {
    id: "2",
    title: "Office Hours",
    description: "Weekly office hours for student consultations",
    date: new Date(2025, 3, 15),
    startTime: "14:00",
    endTime: "16:00",
    location: "Faculty Office 305",
    type: "office-hours",
  },
  {
    id: "3",
    title: "Department Meeting",
    description: "Monthly department meeting",
    date: new Date(2025, 3, 17),
    startTime: "13:00",
    endTime: "14:30",
    location: "Conference Room A",
    type: "meeting",
  },
  {
    id: "4",
    title: "CS405 Midterm",
    description: "Database Management Systems midterm exam",
    date: new Date(2025, 3, 20),
    startTime: "09:00",
    endTime: "11:00",
    location: "Examination Hall 2",
    type: "exam",
  },
  {
    id: "5",
    title: "Research Seminar",
    description: "AI and Machine Learning research seminar",
    date: new Date(2025, 3, 22),
    startTime: "15:00",
    endTime: "17:00",
    location: "Auditorium",
    type: "seminar",
  },
]

export default function CalendarPage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [showEventDetailsDialog, setShowEventDetailsDialog] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: new Date(),
    startTime: "",
    endTime: "",
    location: "",
    type: "lecture",
  })

  // Get events for the selected date
  const eventsForSelectedDate = date ? mockEvents.filter((event) => date && isSameDay(event.date, date)) : []

  // Handle adding a new event
  const handleAddEvent = () => {
    // In a real app, this would make an API call to add the event
    toast({
      title: "Event added",
      description: `${newEvent.title} has been added to your calendar.`,
    })
    setShowAddEventDialog(false)
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      location: "",
      type: "lecture",
    })
  }

  // Handle viewing event details
  const handleViewEvent = (event: any) => {
    setSelectedEvent(event)
    setShowEventDetailsDialog(true)
  }

  // Get badge color based on event type
  const getEventBadgeVariant = (type: string) => {
    switch (type) {
      case "lecture":
        return "default"
      case "office-hours":
        return "secondary"
      case "meeting":
        return "outline"
      case "exam":
        return "destructive"
      case "seminar":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <DashboardLayout role="professor">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <Button onClick={() => setShowAddEventDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  event: mockEvents.map((event) => event.date),
                }}
                modifiersStyles={{
                  event: {
                    fontWeight: "bold",
                    backgroundColor: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Events for selected date */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Events for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}</CardTitle>
            </CardHeader>
            <CardContent>
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => handleViewEvent(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={getEventBadgeVariant(event.type)}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1).replace("-", " ")}
                          </Badge>
                          <h3 className="font-medium">{event.title}</h3>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No events for this date</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Add a new event or select a different date.</p>
                  <Button className="mt-4" onClick={() => setShowAddEventDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>Create a new event in your calendar.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="office-hours">Office Hours</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Event location"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={showEventDetailsDialog} onOpenChange={setShowEventDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.date ? format(selectedEvent.date, "MMMM d, yyyy") : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Badge variant={selectedEvent ? getEventBadgeVariant(selectedEvent.type) : "default"}>
                  {selectedEvent?.type.charAt(0).toUpperCase() + selectedEvent?.type.slice(1).replace("-", " ")}
                </Badge>
              </div>
              <div className="text-sm">
                <p className="font-medium">Time:</p>
                <p>
                  {selectedEvent?.startTime} - {selectedEvent?.endTime}
                </p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Location:</p>
                <p>{selectedEvent?.location}</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Description:</p>
                <p>{selectedEvent?.description}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDetailsDialog(false)}>
              Close
            </Button>
            <Button variant="destructive">Delete Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
