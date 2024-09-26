"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getData } from "@/components/editable-shedule/actions"; // Adjust the import path as needed

type ScheduleEntry = {
  Subject: string;
  Teacher_Initials: string;
  Location: number | string;
  Time: [string, string];
};

type ScheduleData = {
  [date: string]: {
    [period: string]: ScheduleEntry;
  };
};

type SubjectHours = {
  [subject: string]: number;
};

const ScheduleAnalysis = () => {
  const [subjectHours, setSubjectHours] = useState<SubjectHours>({});
  const [userAttendance, setUserAttendance] = useState<SubjectHours>({});
  const [attendancePercentage, setAttendancePercentage] = useState<
    { subject: string; percentage: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      calculateSubjectHours(data);
    };
    fetchData();
  }, []);

  const calculateSubjectHours = (data: ScheduleData) => {
    const hours: SubjectHours = {};
    Object.values(data).forEach((day) => {
      Object.values(day).forEach((entry) => {
        hours[entry.Subject] = (hours[entry.Subject] || 0) + 2;
      });
    });
    setSubjectHours(hours);
    setUserAttendance(
      Object.keys(hours).reduce(
        (acc, subject) => ({ ...acc, [subject]: 0 }),
        {}
      )
    );
  };

  const handleAttendanceChange = (subject: string, hours: string) => {
    setUserAttendance((prev) => ({ ...prev, [subject]: Number(hours) }));
  };

  const calculateAttendancePercentage = () => {
    const percentages = Object.entries(subjectHours).map(
      ([subject, totalHours]) => ({
        subject,
        percentage: (userAttendance[subject] / totalHours) * 100,
      })
    );
    setAttendancePercentage(percentages);
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Attendance Hours</TableHead>
                <TableHead>Max Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(subjectHours).map(([subject, maxHours]) => (
                <TableRow key={subject}>
                  <TableCell>{subject}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      step="1"
                      max={maxHours}
                      value={userAttendance[subject]}
                      onChange={(e) =>
                        handleAttendanceChange(subject, e.target.value)
                      }
                      placeholder="Hours attended"
                    />
                  </TableCell>
                  <TableCell>{maxHours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button onClick={calculateAttendancePercentage}>
              Calculate Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {attendancePercentage.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Attendance Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendancePercentage}>
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="percentage"
                    fill="#8884d8"
                    name="Attendance %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ScheduleAnalysis;
