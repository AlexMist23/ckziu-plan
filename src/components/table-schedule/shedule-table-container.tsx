import { Suspense } from "react";
import EditableTable from "@/components/table-schedule/schedule-table";
import { getData } from "./actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default async function SchedulePage() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <Card>
          <CardHeader>
            <CardTitle>Plan Zajęć</CardTitle>
            <CardDescription>
              Dane z: https://ckziu1.gda.pl/plan-zajec#lo-tryb-zaoczny
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditableTable initialData={data} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
