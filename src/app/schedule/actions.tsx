"use server";

import path from "path";
import fs from "fs/promises";

type DataItem = {
  id: number;
  name: string;
  email: string;
};

const filePath = path.join(process.cwd(), "public", "data.json");

export async function getData(): Promise<DataItem[]> {
  const jsonData = await fs.readFile(filePath, "utf8");
  return JSON.parse(jsonData);
}

export async function saveData(data: DataItem[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
