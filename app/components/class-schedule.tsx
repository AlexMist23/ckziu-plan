import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const scheduleData = [
    { time: "09:00 AM - 10:30 AM", subject: "Mathematics", room: "Room 101" },
    { time: "10:45 AM - 12:15 PM", subject: "English Literature", room: "Room 203" },
    { time: "12:15 PM - 01:00 PM", subject: "Lunch Break", room: "Cafeteria" },
    { time: "01:00 PM - 02:30 PM", subject: "Physics", room: "Lab 3" },
    { time: "02:45 PM - 04:15 PM", subject: "History", room: "Room 105" },
  ]
  
  export default function ClassSchedule() {
    return (
      <div className="container mx-auto py-10">
        <Table>
          <TableCaption>Daily Class Schedule</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Time</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{schedule.time}</TableCell>
                <TableCell>{schedule.subject}</TableCell>
                <TableCell className="text-right">{schedule.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }