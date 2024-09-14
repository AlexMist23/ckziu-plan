import { promises as fs } from "fs";
import path from "path";
export const dynamic = "force-static";

type ClassInfo = {
  Subject: string;
  Teacher_Initials: string;
  Location: number;
  Time: [string, string];
};

type DaySchedule = {
  [key: string]: ClassInfo[];
};

type ScheduleData = {
  [date: string]: DaySchedule;
};

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), "public");
    const fileContents = await fs.readFile(
      jsonDirectory + "/schedule.json",
      "utf8"
    );
    const data: ScheduleData = JSON.parse(fileContents);
    return Response.json(data);
  } catch (error) {
    console.error("Error reading schedule data:", error);
    return Response.json(
      { error: "Failed to load schedule data" },
      { status: 500 }
    );
  }
}
