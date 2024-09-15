import { Suspense } from "react";
import EditableSchedule from "./schedule";
import { getData } from "./actions";

export default async function SchedulePage() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Class Schedule</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditableSchedule initialData={data} />
      </Suspense>
    </div>
  );
}
