'use client'

import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucideClock, LucideDoorClosed, LucideUser } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type LessonData = {
  Subject: string;
  Teacher_Initials: string;
  Location: string | number;
  Time: [string, string];
};

type DaySchedule = {
  [key: string]: LessonData;
};

type ScheduleData = {
  [key: string]: DaySchedule;
};

export default function DateTabbedReadOnlySchedule({
  initialData,
}: {
  initialData: ScheduleData;
}) {
  const sortedDates = useMemo(() => {
    return Object.keys(initialData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [initialData]);

  const nearestDate = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return sortedDates.reduce((nearest, date) => {
      const diff = Math.abs(new Date(date).getTime() - today);
      const nearestDiff = Math.abs(new Date(nearest).getTime() - today);
      return diff < nearestDiff ? date : nearest;
    }, sortedDates[0]);
  }, [sortedDates]);

  return (
    <Tabs defaultValue={nearestDate} className="p-0">
      <TabsList className="mb-4 mx-4">
        {sortedDates.map((date) => (
          <TabsTrigger key={date} value={date}>
            {new Date(date).toLocaleDateString("pl-PL", {
              day: "2-digit",
              month: "short",
            })}
          </TabsTrigger>
        ))}
      </TabsList>
      {sortedDates.map((date) => (
        <TabsContent key={date} value={date}>
          <Card className="p-0">
            <CardContent className="px-0 md:px-6 pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">#</TableHead>
                    <TableHead>
                      <LucideClock className="h-4 w-4" />
                    </TableHead>
                    <TableHead>Przedmiot</TableHead>
                    <TableHead>
                      <LucideDoorClosed className="h-4 w-4" />
                    </TableHead>
                    <TableHead>
                      <LucideUser className="h-4 w-4" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(initialData[date]).map(([period, lesson]) => (
                    <TableRow key={`${date}-${period}`}>
                      <TableCell className="hidden md:table-cell">
                        {period}
                      </TableCell>
                      <TableCell>
                        {`${lesson.Time[0]} - ${lesson.Time[1]}`}
                      </TableCell>
                      <TableCell>{lesson.Subject}</TableCell>
                      <TableCell>{lesson.Location}</TableCell>
                      <TableCell>{lesson.Teacher_Initials}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
