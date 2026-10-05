export type XpertsApplication = {
  id: string;
  name: string;
  email: string;
  school: string;
  year: string;
  major: string;
  hasProject: 'yes' | 'no';
  projectTitle: string;
  projectDescription: string;
  motivation: string;
  resume: { name: string; base64: string } | null;
  choices: { id: string; name: string; reason: string }[];
};
export default function validateXperts(data: unknown, mentorNames: Record<string, string>): XpertsApplication;
