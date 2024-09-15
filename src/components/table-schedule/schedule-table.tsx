"use client";

import { useState } from "react";
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
import { saveData } from "./actions";

type DataItem = {
  id: number;
  name: string;
  email: string;
};

export default function EditableTable({
  initialData,
}: {
  initialData: DataItem[];
}) {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = async () => {
    setEditingId(null);
    try {
      await saveData(data);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  const handleChange = (id: number, field: keyof DataItem, value: string) => {
    setData(
      data.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "id" ? parseInt(value) : value }
          : item
      )
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              {editingId === item.id ? (
                <Input
                  value={item.id}
                  onChange={(e) => handleChange(item.id, "id", e.target.value)}
                />
              ) : (
                item.id
              )}
            </TableCell>
            <TableCell>
              {editingId === item.id ? (
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleChange(item.id, "name", e.target.value)
                  }
                />
              ) : (
                item.name
              )}
            </TableCell>
            <TableCell>
              {editingId === item.id ? (
                <Input
                  value={item.email}
                  onChange={(e) =>
                    handleChange(item.id, "email", e.target.value)
                  }
                />
              ) : (
                item.email
              )}
            </TableCell>
            <TableCell>
              {editingId === item.id ? (
                <Button onClick={() => handleSave()}>Save</Button>
              ) : (
                <Button onClick={() => handleEdit(item.id)}>Edit</Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
