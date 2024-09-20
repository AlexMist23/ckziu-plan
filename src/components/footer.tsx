import { LucideCopyright, LucideMail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-sm p-4 mt-auto row-start-3 flex gap-6 flex-wrap items-center justify-center text-foreground/50 ">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4 hover:text-foreground/60"
        href="mailto:aleksander.misterkiewicz@outlook.com"
      >
        <LucideMail />
        aleksander.misterkiewicz@outlook.com
      </a>
      <span className="flex items-center gap-2">
        <LucideCopyright />
        2024
      </span>
    </footer>
  );
}
