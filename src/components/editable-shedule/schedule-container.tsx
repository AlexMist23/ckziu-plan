import { Suspense } from "react";
import EditableSchedule from "./schedule";
import { getData } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Schedule() {
  const data = await getData();

  return (
    <div className="max-w-[60rem] md:mx-auto mx-0">
      <Suspense fallback={<Skeleton className="w-full h-[420px]" />}>
        <EditableSchedule initialData={data} />
      </Suspense>
    </div>
  );
}
