import { LucideMail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mb-5 mt-auto row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="mailto:aleksander.misterkiewicz@outlook.com"
        rel="noopener noreferrer"
      >
        <LucideMail />
        aleksander.misterkiewicz@outlook.com
      </a>
    </footer>
  );
}
