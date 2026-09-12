export type EventType = 'xposure' | 'xperience' | 'networking' | 'challenge' | 'workshop';

export interface TimelineEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  dateISO: string;
  location: string;
  description: string;
  speakers?: string[];
  registerUrl?: string;
  upcoming: boolean;
  slug?: string;
  category?: string;
  subPillar?: string;
}

export interface TimelineMonth {
  month: string;
  shortMonth: string;
  year: string;
  monthISO: string;
  events: TimelineEvent[];
}

export const eventTypeConfig: Record<EventType, { label: string; color: string; bg: string }> = {
  xposure: { label: "Health X'posure", color: 'text-navy-950', bg: 'bg-navy-50' },
  xperience: { label: "Health X'perience", color: 'text-teal-700', bg: 'bg-teal-50' },
  networking: { label: 'Networking', color: 'text-violet-700', bg: 'bg-violet-50' },
  challenge: { label: 'Challenge / Hackathon', color: 'text-amber-700', bg: 'bg-amber-50' },
  workshop: { label: 'Workshop', color: 'text-emerald-700', bg: 'bg-emerald-50' },
};

export const timelineData: TimelineMonth[] = [
  // ── SEMESTER 1 ──────────────────────────────────────
  {
    month: 'September 2025',
    shortMonth: 'Sep',
    year: '2025',
    monthISO: '2025-09',
    events: [
      {
        id: 'xeminar-1',
        title: 'Xeminar 1: AI in Cancer Care',
        type: 'xposure',
        date: '9 September 2025',
        dateISO: '2025-09-09',
        location: 'NUS',
        description:
          "The first Xeminar of AY25/26 kicks off with an in-depth look at how artificial intelligence is transforming cancer diagnostics, treatment planning, and patient outcomes. An expert-led session exploring cutting-edge AI applications across oncology.",
        upcoming: false,
        slug: 'ai-masterclass',
      },
      {
        id: 'ideate-masterclass',
        title: 'Coding for Healthcare Pilot with IDEATE (TBC)',
        type: 'workshop',
        date: 'September 2025 (TBC)',
        dateISO: '2025-09-18',
        location: 'NUS',
        description:
          "A pilot masterclass in collaboration with IDEATE, introducing students to hands-on healthcare software development and digital health tooling. Build real skills in coding for clinical contexts.",
        upcoming: false,
      },
    ],
  },
  {
    month: 'October 2025',
    shortMonth: 'Oct',
    year: '2025',
    monthISO: '2025-10',
    events: [
      {
        id: 'xeminar-2',
        title: 'Xeminar 2: LifeSync Robotics @ Co11ab',
        type: 'xposure',
        date: '1 October 2025',
        dateISO: '2025-10-01',
        location: 'Co11ab, Singapore',
        description:
          "Visit LifeSync Robotics at Co11ab to see cutting-edge surgical and rehabilitation robotics up close. Hear from founders and engineers on how they are bringing robotics solutions from lab to clinical reality.",
        upcoming: false,
      },
      {
        id: 'xeminar-3',
        title: 'Xeminar 3: Protecting MedTech IP',
        type: 'xposure',
        date: '2 October 2025',
        dateISO: '2025-10-02',
        location: 'NUS',
        description:
          "Understanding intellectual property is critical for any MedTech innovator. This session covers patents, trade secrets, licensing strategies, and how to protect your healthcare innovations in competitive global markets.",
        upcoming: false,
      },
      {
        id: 'gamedev-healthcare',
        title: 'GameDev for Healthcare Masterclass',
        type: 'workshop',
        date: '5–16 October 2025',
        dateISO: '2025-10-05',
        location: 'NUS',
        description:
          "A two-week intensive exploring how game design principles, virtual reality, and serious games are being applied in medical training, patient rehabilitation, and health behaviour change. Includes hands-on design sessions.",
        upcoming: false,
      },
      {
        id: 'xeminar-4',
        title: 'Xeminar 4: AI Agents for Primary Care (TBD)',
        type: 'xposure',
        date: 'October 2025 (TBD)',
        dateISO: '2025-10-23',
        location: 'NUS',
        description:
          "Explore how autonomous AI agents are being deployed in primary care settings, from triage and appointment scheduling to diagnostic support and chronic disease management. A forward-looking session on the future of AI in general practice.",
        upcoming: false,
      },
    ],
  },
  {
    month: 'November 2025',
    shortMonth: 'Nov',
    year: '2025',
    monthISO: '2025-11',
    events: [
      {
        id: 'xperience-kickoff',
        title: "Health X'perience Programme Kickoff",
        type: 'xperience',
        date: '12–13 November 2025',
        dateISO: '2025-11-12',
        location: 'NUS School of Medicine',
        description:
          "The inaugural Health X'perience cohort begins with two foundational sessions: an introduction to the Stanford Biodesign framework, covering design thinking, needs validation, and patient journey mapping, followed by MedTech commercialisation fundamentals including product-market fit, TAM-SAM-SOM, and business model development.",
        speakers: ['Dr. Ian Mathews', 'Mr. Harry W.'],
        upcoming: false,
      },
      {
        id: 'xperience-symposium',
        title: "X'perience Symposium (TBC)",
        type: 'xperience',
        date: '9–13 November 2025 (TBC)',
        dateISO: '2025-11-10',
        location: 'NUS',
        description:
          "An internal symposium for X'perience cohort members to present early-stage problem statements, share clinical observations, and receive peer and mentor feedback before finalising their project directions.",
        upcoming: false,
      },
      {
        id: 'fireside-chat',
        title: 'Fireside Chat (TBD)',
        type: 'xposure',
        date: 'Reading Week, Nov 2025 (TBD)',
        dateISO: '2025-11-17',
        location: 'NUS',
        description:
          "An intimate fireside chat with a seasoned MedTech leader, covering their career journey, the challenges of building healthcare companies, and advice for aspiring student innovators. Speaker to be confirmed.",
        upcoming: false,
      },
    ],
  },
  {
    month: 'December 2025 – January 2026',
    shortMonth: 'Dec',
    year: '2025',
    monthISO: '2025-12',
    events: [
      {
        id: 'ocip-trip-1',
        title: "X'perience OCIP Trip 1",
        type: 'xperience',
        date: '6 Dec 2025 – 10 Jan 2026',
        dateISO: '2025-12-06',
        location: 'Overseas (TBC)',
        description:
          "The first Overseas Community Involvement Project (OCIP) trip for Health X'perience participants. Members will engage with healthcare systems and communities in an overseas setting, gaining a global perspective on unmet clinical needs and health equity challenges.",
        upcoming: false,
      },
    ],
  },
  // ── SEMESTER 2 ──────────────────────────────────────
  {
    month: 'January – February 2026',
    shortMonth: 'Jan',
    year: '2026',
    monthISO: '2026-01',
    events: [
      {
        id: 'xperience-sutd-pilot',
        title: "X'perience × SUTD Pilot",
        type: 'xperience',
        date: 'January 2026 (Week 3, Sem 2)',
        dateISO: '2026-01-20',
        location: 'NUS / SUTD',
        description:
          "A collaborative pilot between NUS HealthX and SUTD, bringing together students from both universities to co-design solutions to shared healthcare challenges. Combines NUS's clinical insights with SUTD's design and engineering strengths.",
        upcoming: true,
      },
    ],
  },
  {
    month: 'March 2026',
    shortMonth: 'Mar',
    year: '2026',
    monthISO: '2026-03',
    events: [
      {
        id: 'sem2-xposure',
        title: "Sem 2 X'posure Events (TBC)",
        type: 'xposure',
        date: 'March 2026 (TBC)',
        dateISO: '2026-03-15',
        location: 'NUS',
        description:
          "Semester 2 X'posure events are being planned. Stay tuned for Xeminars, masterclasses, and industry visits. Join our Telegram channel for first-access announcements.",
        upcoming: true,
        registerUrl: '#',
      },
    ],
  },
  {
    month: 'April 2026',
    shortMonth: 'Apr',
    year: '2026',
    monthISO: '2026-04',
    events: [
      {
        id: 'healthx-conference',
        title: 'HealthX Year-End Conference',
        type: 'challenge',
        date: 'April 2026 (TBC)',
        dateISO: '2026-04-18',
        location: 'NUS University Cultural Centre',
        description:
          "The culminating event of AY25/26 is when Health X'perience teams present their validated MedTech prototypes to investors, hospital administrators, faculty, and the broader NUS community. Top projects are nominated for the Medical Grand Challenge.",
        upcoming: true,
        registerUrl: '#',
      },
      {
        id: 'nus-kcl-2026',
        title: 'NUS-KCL Medical Innovation Challenge 2026',
        type: 'challenge',
        date: 'April / May 2026 (TBC)',
        dateISO: '2026-04-25',
        location: "King's College London & NUS (Hybrid)",
        description:
          "The annual cross-institutional hackathon between NUS and King's College London. Interdisciplinary teams tackle real clinical problem statements from practising physicians at two world-class universities, competing for mentorship prizes and incubation support.",
        upcoming: true,
        registerUrl: '#',
      },
    ],
  },
];
