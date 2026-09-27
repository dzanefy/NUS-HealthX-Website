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

export const eventTypeConfig: Record<EventType, { label: string }> = {
  xposure: { label: "Health X'posure" },
  xperience: { label: "Health X'perience" },
  networking: { label: 'Networking' },
  challenge: { label: 'Challenge / Hackathon' },
  workshop: { label: 'Workshop' },
};
