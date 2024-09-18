"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileIcon, SearchIcon, BookOpenIcon, DownloadIcon } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Book {
  title: string;
  fileName: string;
  subject: string;
  image?: string;
}

const books: Book[] = [
  {
    title: "W Centrum Uwagi",
    subject: "Wiedza o społeczeństwie",
    fileName: "wos-w-centrum-uwagi.pdf",
    image: "/static/images/w-centrum-uwagi.webp",
  },
  {
    title: "Biologia Na Czasie 1",
    subject: "Biologia",
    fileName: "biologia-na-czasie-1.pdf",
    image: "/static/images/biologia-na-czasie-1.webp",
  },
  {
    title: "Biologia Na Czasie 3",
    subject: "Biologia",
    fileName: "biologia-na-czasie-3.pdf",
    image: "/static/images/biologia-na-czasie-3.webp",
  },
];

export default function PDFLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm]);

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
      <h1 className="text-3xl font-bold mb-6">Książki</h1>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Szukaj książki..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.fileName} className="flex flex-col group">
            <CardHeader>
              <CardTitle className="line-clamp-1">{book.title}</CardTitle>
              <CardDescription>{book.subject}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow relative overflow-hidden">
              <AspectRatio ratio={16 / 9} className="bg-muted">
                {book.image ? (
                  <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <BookOpenIcon className="text-white w-12 h-12" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileIcon size={64} className="text-gray-400" />
                  </div>
                )}
              </AspectRatio>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                className="flex-1 transition-colors duration-300 hover:bg-blue-600"
                onClick={() =>
                  window.open(`/static/pdf/${book.fileName}`, "_blank")
                }
              >
                <BookOpenIcon className="mr-2 h-4 w-4" /> Otwórz
              </Button>
              <Button
                variant="outline"
                className="flex-1 transition-colors duration-300 hover:bg-gray-100"
                onClick={() => handleDownload(book.fileName)}
              >
                <DownloadIcon className="mr-2 h-4 w-4" /> Pobierz
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
