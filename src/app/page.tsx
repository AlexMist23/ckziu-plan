import ClassSchedule from "@/components/class-schedule";
import JsonTable from "@/components/json-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex-col min-h-screen">
      <Suspense
        fallback={
          <Skeleton className="h-[20em] m-w-[20em] max-w-[40rem] mx-auto my-10" />
        }
      >
        <ClassSchedule />
        <JsonTable />
      </Suspense>
    </main>
  );
}
