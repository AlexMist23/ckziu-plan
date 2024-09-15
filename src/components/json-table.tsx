"use client";

import { use, Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ErrorBoundary } from "react-error-boundary";
import { Skeleton } from "./ui/skeleton";

type DataItem = {
  id: number;
  name: string;
  email: string;
};

function fetchData(): Promise<DataItem[]> {
  return fetch("/data.json").then((res) => {
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  });
}

function DataTable() {
  const data = use(fetchData());

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Error Fallback component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

// Main component that wraps everything with Suspense and ErrorBoundary
export default function JsonTable() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Skeleton className="w-full h-full" />}>
        <DataTable />
      </Suspense>
    </ErrorBoundary>
  );
}
