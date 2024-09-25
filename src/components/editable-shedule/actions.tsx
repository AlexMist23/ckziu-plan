'use server'

import path from 'path'
import fs from 'fs/promises'

type LessonData = {
  Subject: string
  Teacher_Initials: string
  Location: number
  Time: [string, string]
}

type DaySchedule = {
  [key: string]: LessonData
}

type ScheduleData = {
  [key: string]: DaySchedule
}

const filePath = path.join(process.cwd(), 'public', 'schedule.json')

export async function getData(): Promise<ScheduleData> {
  const jsonData = await fs.readFile(filePath, 'utf8')
  return JSON.parse(jsonData)
}

export async function saveData(data: ScheduleData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}