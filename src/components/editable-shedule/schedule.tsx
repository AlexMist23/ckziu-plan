"use client";

import React, { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { saveData } from "./actions";
import { LucideClock, LucideDoorClosed, LucideUser } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type LessonData = {
  Subject: string;
  Teacher_Initials: string;
  Location: number;
  Time: [string, string];
};

type DaySchedule = {
  [key: string]: LessonData[];
};

type ScheduleData = {
  [key: string]: DaySchedule;
};

export default function DateTabbedEditableSchedule({
  initialData,
}: {
  initialData: ScheduleData;
}) {
  const [data, setData] = useState(initialData);
  const [editingCell, setEditingCell] = useState<{
    date: string;
    period: string;
    index: number;
    field: keyof LessonData;
  } | null>(null);

  const sortedDates = useMemo(() => {
    return Object.keys(data).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, [data]);

  const nearestDate = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    return sortedDates.reduce((nearest, date) => {
      const diff = Math.abs(new Date(date).getTime() - today);
      const nearestDiff = Math.abs(new Date(nearest).getTime() - today);
      return diff < nearestDiff ? date : nearest;
    }, sortedDates[0]);
  }, [sortedDates]);

  const handleEdit = (
    date: string,
    period: string,
    index: number,
    field: keyof LessonData
  ) => {
    setEditingCell({ date, period, index, field });
  };

  const handleSave = async () => {
    setEditingCell(null);
    try {
      await saveData(data);
      alert("Schedule saved successfully!");
    } catch (error) {
      console.error("Failed to save schedule:", error);
      alert("Failed to save schedule. Please try again.");
    }
  };

  const handleChange = (
    date: string,
    period: string,
    index: number,
    field: keyof LessonData,
    value: string
  ) => {
    setData((prevData) => ({
      ...prevData,
      [date]: {
        ...prevData[date],
        [period]: prevData[date][period].map((lesson, i) =>
          i === index
            ? {
                ...lesson,
                [field]: field === "Location" ? parseInt(value) : value,
              }
            : lesson
        ),
      },
    }));
  };

  return (
    <Tabs defaultValue={nearestDate}>
      <TabsList className="mb-4">
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
          <Card>
            <CardContent className="px-0 md:px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>
                      <LucideClock />
                    </TableHead>
                    <TableHead>Przedmiot</TableHead>
                    <TableHead>
                      <LucideDoorClosed />
                    </TableHead>
                    <TableHead>
                      <LucideUser />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(data[date]).map(([period, lessons]) =>
                    lessons.map((lesson, index) => (
                      <TableRow key={`${date}-${period}-${index}`}>
                        <TableCell>{period}</TableCell>
                        <TableCell>{`${lesson.Time[0]} - ${lesson.Time[1]}`}</TableCell>
                        <TableCell>
                          {editingCell?.date === date &&
                          editingCell?.period === period &&
                          editingCell?.index === index &&
                          editingCell?.field === "Subject" ? (
                            <Input
                              value={lesson.Subject}
                              onChange={(e) =>
                                handleChange(
                                  date,
                                  period,
                                  index,
                                  "Subject",
                                  e.target.value
                                )
                              }
                              onBlur={handleSave}
                            />
                          ) : (
                            <span
                              onClick={() =>
                                handleEdit(date, period, index, "Subject")
                              }
                            >
                              {lesson.Subject}
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          {editingCell?.date === date &&
                          editingCell?.period === period &&
                          editingCell?.index === index &&
                          editingCell?.field === "Location" ? (
                            <Input
                              type="number"
                              value={lesson.Location}
                              onChange={(e) =>
                                handleChange(
                                  date,
                                  period,
                                  index,
                                  "Location",
                                  e.target.value
                                )
                              }
                              onBlur={handleSave}
                            />
                          ) : (
                            <span
                              onClick={() =>
                                handleEdit(date, period, index, "Location")
                              }
                            >
                              {lesson.Location}
                            </span>
                          )}
                        </TableCell>

                        <TableCell>
                          {editingCell?.date === date &&
                          editingCell?.period === period &&
                          editingCell?.index === index &&
                          editingCell?.field === "Teacher_Initials" ? (
                            <Input
                              value={lesson.Teacher_Initials}
                              onChange={(e) =>
                                handleChange(
                                  date,
                                  period,
                                  index,
                                  "Teacher_Initials",
                                  e.target.value
                                )
                              }
                              onBlur={handleSave}
                            />
                          ) : (
                            <span
                              onClick={() =>
                                handleEdit(
                                  date,
                                  period,
                                  index,
                                  "Teacher_Initials"
                                )
                              }
                            >
                              {lesson.Teacher_Initials}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
