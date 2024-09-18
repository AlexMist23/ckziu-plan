"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Teacher = {
  subject: string;
  name: string;
  surname: string;
  "e-mail": string;
};

const teachersData: Teacher[] = [
  {
    subject: "wychowawczyni",
    name: "barbara",
    surname: "szczemier-szczemierska",
    "e-mail": "b.szczemier-szczemierska@zsp7.edu.gdansk.pl",
  },
  {
    subject: "biologia",
    name: "danuta",
    surname: "jabłońska",
    "e-mail": "d.jablonska@ckzu1.edu.gdansk.pl",
  },
  {
    subject: "chemia",
    name: "teresa",
    surname: "kubiarczyk",
    "e-mail": "t.kubiarczyk-kazalska@ckzu1.edu.gdansk.pl",
  },
  {
    subject: "geografia",
    name: "andrzej",
    surname: "saładiak",
    "e-mail": "a.saladiak@ckzu1.edu.gdansk.pl",
  },
  {
    subject: "historia",
    name: "sławomir",
    surname: "komorowski",
    "e-mail": "s.komorowski@ckzu1.edu.gdansk.pl",
  },
  {
    subject: "j. angielski",
    name: "nikola",
    surname: "grzywacz",
    "e-mail": "n.grzywacz@ckzu1.edu.gdansk.pl",
  },
  {
    subject: "j. angielski",
    name: "iwona",
    surname: "lehman",
    "e-mail": "i.lehman@lo15.edu.gdansk.pl",
  },
  {
    subject: "j. polski",
    name: "barbara",
    surname: "szczemier-szczemierska",
    "e-mail": "b.szczemier-szczemierska@zsp7.edu.gdansk.pl",
  },
  {
    subject: "konferencja",
    name: "barbara",
    surname: "szczemier-szczemierska",
    "e-mail": "b.szczemier-szczemierska@zsp7.edu.gdansk.pl",
  },
  {
    subject: "matematyka",
    name: "anna",
    surname: "łotowska",
    "e-mail": "a.lotowska@sp2.edu.gdansk.pl",
  },
  {
    subject: "wos",
    name: "michał",
    surname: "stelmaszczyk",
    "e-mail": "m.stelmaszczyk@ckzu1.edu.gdansk.pl",
  },
];

export default function TeacherDirectory() {
  const [teachers, setTeachers] = useState<Teacher[]>(teachersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Teacher;
    direction: "ascending" | "descending";
  } | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredTeachers = teachersData.filter((teacher) =>
      Object.values(teacher).some((value) => value.toLowerCase().includes(term))
    );
    setTeachers(filteredTeachers);
  };

  const handleSort = (key: keyof Teacher) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedTeachers = [...teachers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setTeachers(sortedTeachers);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">Teacher Directory</h1>
      <Input
        type="text"
        placeholder="Search teachers..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <div className="overflow-x-auto flex-grow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                <Button variant="ghost" onClick={() => handleSort("subject")}>
                  Subject <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("surname")}>
                  Surname <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" onClick={() => handleSort("e-mail")}>
                  Email <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{teacher.subject}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.surname}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {teacher["e-mail"]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
