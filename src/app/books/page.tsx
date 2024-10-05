"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon, BookOpenIcon, DownloadIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Book {
  title: string;
  subject: string;
  pdf: string;
  image: string;
  class: number;
}

export default function PDFLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("1");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/pdf-files");
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();

        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const subjects = [
    "all",
    ...Array.from(new Set(books.map((book) => book.subject))),
  ];
  const classes = [
    "all",
    ...Array.from(new Set(books.map((book) => book.class.toString()))),
  ].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  useEffect(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject === "all" || book.subject === selectedSubject) &&
        (selectedClass === "all" || book.class.toString() === selectedClass)
    );
    setFilteredBooks(filtered);
  }, [searchTerm, selectedSubject, selectedClass, books]);

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a");
    link.href = `/static/pdf/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Szukaj..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select
          value={selectedSubject}
          onValueChange={(value) => setSelectedSubject(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Przedmiot" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject === "all" ? "Wszystkie przedmioty" : subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedClass}
          onValueChange={(value) => setSelectedClass(value)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Klasa" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((classNum) => (
              <SelectItem key={classNum} value={classNum}>
                {classNum === "all" ? "Wszystkie klasy" : "Klasa " + classNum}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
        {filteredBooks.map((book) => (
          <Card
            key={book.pdf}
            className="relative overflow-hidden shadow-lg rounded-lg"
          >
            <AspectRatio ratio={1 / 1.4} className="">
              <Image
                fill
                src={"/static/images/" + book.image}
                alt={book.title}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-75"></div>
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="text-white backdrop-blur-[1px] p-4 bg-gradient-to-b from-black to-transparent pb-10">
                  <CardTitle>{book.title}</CardTitle>
                  <CardDescription className="text-white">
                    {book.subject}
                  </CardDescription>
                </div>
                <div className="flex justify-between flex-row gap-2 md:gap-2 m-2">
                  <Button
                    className="w-1/2"
                    onClick={() =>
                      window.open(`/static/pdf/${book.pdf}`, "_blank")
                    }
                  >
                    <BookOpenIcon className="h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className=" w-1/2"
                    onClick={() => handleDownload(book.pdf)}
                  >
                    <DownloadIcon className="h-4 " />
                  </Button>
                </div>
              </div>
            </AspectRatio>
          </Card>
        ))}
      </div>
    </div>
  );
}
