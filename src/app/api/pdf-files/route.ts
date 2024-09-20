import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface Book {
  title: string;
  subject: string;
  class: string;
  pdf: string;
  image: string;
}

const PDF_DIRECTORY = path.join(process.cwd(), "public/static/pdf");

function parseFileName(fileName: string): Book {
  const parts = fileName.split("-");
  return {
    subject: parts[0],
    title: parts.slice(1).join(" ").replace(".pdf", ""),
    class: parts[parts.length - 1].split(".")[0],
    pdf: fileName,
    image: `${fileName.slice(0, -4)}.webp`,
  };
}

export async function GET() {
  try {
    const files = await fs.readdir(PDF_DIRECTORY);
    const books: Book[] = files
      .filter((file) => file.toLowerCase().endsWith(".pdf"))
      .map(parseFileName);

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error reading PDF directory:", error);
    return NextResponse.json(
      { error: "Unable to read PDF files" },
      { status: 500 }
    );
  }
}
