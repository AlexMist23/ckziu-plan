import { Suspense } from "react";
import EditableSchedule from "./schedule";
import { getData } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function Schedule() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Class Schedule</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Card>
          <CardHeader>
            <CardTitle>Plan Zajęć</CardTitle>
            <CardDescription>
              Dane z: https://ckziu1.gda.pl/plan-zajec#lo-tryb-zaoczny
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditableSchedule initialData={data} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
