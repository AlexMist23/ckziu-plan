import React from "react";

interface Book {
  subject: string;
  title: string;
  class: string;
  fileName: string;
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:3000/api/pdf-files", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res.json();
}

export default async function PDFList() {
  const books = await getBooks();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Books</h1>
      {books.length === 0 ? (
        <p>No PDF books found.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((book, index) => (
            <li key={index} className="flex items-center">
              <ol>
                <ul>{book.title}</ul>
                <ul>{book.class}</ul>
                <ul>{book.subject}</ul>
                <ul>{book.fileName}</ul>
              </ol>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
