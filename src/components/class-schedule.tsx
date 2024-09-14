"use client";

import React, { use } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import scheduleData from "@/lib/scheduleData";
import ScheduleTable from "./schedule-table";

// type ClassInfo = {
//   Subject: string;
//   Teacher_Initials: string;
//   Location: number;
//   Time: [string, string];
// };
//
// type DaySchedule = {
//   [key: string]: ClassInfo[];
// };
//
// type ScheduleData = {
//   [date: string]: DaySchedule;
// };
//
// async function fetchScheduleData(url: string): Promise<ScheduleData> {
//   const response = await fetch(url);
//   if (!response.ok) {
//     console.error("Failed to parse JSON", response.status);
//   }
//   let responseJSON = null;
//   try {
//     responseJSON = response.json();
//   } catch (error) {
//     console.error("Failed to parse JSON", error);
//   }
//   return responseJSON;
// }

export default function ClassSchedule() {
  const dates = Object.keys(scheduleData);

  return (
    <Tabs defaultValue={dates[0]} className="max-w-[40rem] mx-auto my-10">
      <TabsList className="w-full bg-primary">
        {dates.map((date) => (
          <TabsTrigger key={date} value={date} className="w-full">
            {new Date(date).toLocaleDateString("pl-PL", {
              month: "short",
              day: "numeric",
            })}
          </TabsTrigger>
        ))}
      </TabsList>
      {dates.map((date) => (
        <TabsContent key={date} value={date}>
          <ScheduleTable data={scheduleData} date={date} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
