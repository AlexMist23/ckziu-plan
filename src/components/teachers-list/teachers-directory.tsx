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
import { ArrowUpDown, SearchIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

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
    name: "teresa",
    surname: "kubiarczyk-kazalska",
    "e-mail": "t.kubiarczyk-kazalska@ckzu1.edu.gdansk.pl",
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
    <div className="container mx-auto p-4">
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Szukaj..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <Card className="">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">
                  <Button variant="ghost" onClick={() => handleSort("subject")}>
                    Przedmiot <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("name")}>
                    Imię <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("surname")}>
                    Nazwisko <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button variant="ghost" onClick={() => handleSort("e-mail")}>
                    E-mail <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher, index) => (
                <>
                  <TableRow key={index} className="">
                    <TableCell className="font-semibold">
                      {teacher.subject}
                    </TableCell>
                    <TableCell className="capitalize">{teacher.name}</TableCell>
                    <TableCell className="capitalize">
                      {teacher.surname}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {teacher["e-mail"]}
                    </TableCell>
                  </TableRow>

                  <TableRow key={"2/" + index} className="md:hidden">
                    <TableCell className="text-background">
                      {"."}
                      <span className="text-primary absolute w-full cl">
                        <a href={`mailto:${teacher["e-mail"]}}`}>
                          {teacher["e-mail"]}
                        </a>
                      </span>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
