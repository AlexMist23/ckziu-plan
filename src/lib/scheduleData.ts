interface ScheduleEntry {
  Subject: string;
  Teacher_Initials: string;
  Location: number;
  Time: [string, string];
}

interface DaySchedule {
  [period: string]: ScheduleEntry[];
}

interface Schedule {
  [date: string]: DaySchedule;
}

// Declare and initialize the schedule data variable
const schedule: Schedule = {
  "2024-09-14": {
    "1": [
      {
        Subject: "Konferencja",
        Teacher_Initials: "B. Sz.Sz.",
        Location: 313,
        Time: ["08:00", "09:30"],
      },
    ],
    "2": [
      {
        Subject: "Wiedza o społeczeństwie",
        Teacher_Initials: "M.S.",
        Location: 106,
        Time: ["09:40", "11:10"],
      },
    ],
    "3": [
      {
        Subject: "Matematyka",
        Teacher_Initials: "A.L.",
        Location: 110,
        Time: ["11:40", "13:10"],
      },
    ],
    "4": [
      {
        Subject: "Biologia",
        Teacher_Initials: "D.J.",
        Location: 8,
        Time: ["13:20", "14:50"],
      },
    ],
    "5": [
      {
        Subject: "Biologia",
        Teacher_Initials: "D.J.",
        Location: 8,
        Time: ["15:00", "16:30"],
      },
    ],
  },
  "2024-09-15": {
    "1": [
      {
        Subject: "Język angielski - gr. 1",
        Teacher_Initials: "N.G.",
        Location: 9,
        Time: ["08:00", "09:30"],
      },
      {
        Subject: "Język angielski - gr. 2",
        Teacher_Initials: "N.G.",
        Location: 7,
        Time: ["08:00", "09:30"],
      },
    ],
    "2": [
      {
        Subject: "Geografia",
        Teacher_Initials: "A.S.",
        Location: 211,
        Time: ["09:40", "11:10"],
      },
    ],
    "3": [
      {
        Subject: "Historia",
        Teacher_Initials: "S.K",
        Location: 111,
        Time: ["11:40", "13:10"],
      },
    ],
    "4": [
      {
        Subject: "Biologia",
        Teacher_Initials: "D.J.",
        Location: 8,
        Time: ["13:20", "14:50"],
      },
    ],
    "5": [
      {
        Subject: "Chemia",
        Teacher_Initials: "J.K.",
        Location: 103,
        Time: ["15:00", "16:30"],
      },
    ],
  },
};

export default schedule;
