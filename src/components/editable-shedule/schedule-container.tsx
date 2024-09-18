import { Suspense } from "react";
import EditableSchedule from "./schedule";
import { getData } from "./actions";
import { Skeleton } from "../ui/skeleton";

export default async function Schedule() {
  const data = await getData();

  return (
    <div className="max-w-[60rem] mx-auto">
      <h1 className="text-3xl font-bold mb-6">Plan Zajęć</h1>
      <Suspense fallback={<Skeleton className="w-full h-[420px]" />}>
        <EditableSchedule initialData={data} />
      </Suspense>
    </div>
  );
}
