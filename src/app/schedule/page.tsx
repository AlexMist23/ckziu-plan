// import ClassSchedule from "@/components/class-schedule";
import Schedule from "@/components/editable-shedule/schedule-container";

export default function Home() {
  return (
    <div className="mx-auto pt-4 min-h-[calc(100vh-20rem)] flex flex-col justify-center">
      <Schedule />
    </div>
  );
}
