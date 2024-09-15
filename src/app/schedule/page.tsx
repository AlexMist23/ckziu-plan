// import ClassSchedule from "@/components/class-schedule";
import JsonTable from "@/components/table-schedule/shedule-table-container";

export default function Home() {
  return (
    <main className="flex-col min-h-screen">
      {
        //<ClassSchedule />}
      }
      <div className="container h-40 self-center">
        <JsonTable />
      </div>
    </main>
  );
}
