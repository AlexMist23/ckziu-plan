"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

type ClassInfo = {
  Subject: string;
  Teacher_Initials: string;
  Location: number;
  Time: [string, string];
};

type DaySchedule = {
  [key: string]: ClassInfo[];
};

type TableData = {
  [date: string]: DaySchedule;
};
export default function ScheduleTable({
  data,
  date,
}: {
  data: TableData;
  date: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Godzina</TableHead>
          <TableHead>Przedmiot</TableHead>
          <TableHead>Sala</TableHead>
          <TableHead>Nauczyciel</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(data[date]).map(([period, classes]) => (
          <>
            {classes.map((classInfo, index) => (
              <TableRow key={`${period}-${index}`}>
                {index === 0 && (
                  <TableCell className="text-nowrap" rowSpan={classes.length}>
                    {
                      <p>
                        {classInfo.Time[0]} - {classInfo.Time[1]}
                      </p>
                    }
                  </TableCell>
                )}
                <TableCell className="text-nowrap">
                  {classInfo.Subject}
                </TableCell>
                <TableCell className="text-nowrap">
                  {classInfo.Location}
                </TableCell>
                <TableCell className="text-nowrap">
                  {classInfo.Teacher_Initials}
                </TableCell>
              </TableRow>
            ))}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
