import InitiativePage, { type InitiativePageConfig } from './InitiativePage';

const config: InitiativePageConfig = {
  title: "X'perts",
  heroDescription: 'A flexible way for students to learn from people already building, treating, researching, and investing in healthcare.',
  ctaLabel: 'Apply for mentorship',
  ctaHref: '/xperts/apply',
  secondaryCta: { label: 'Meet our mentors', href: '/mentors' },
  purpose: "X'perts connects students with HealthX mentors. Browse the mentor directory to learn about their expertise before applying.\n\nApplications include your project details or reason for seeking mentorship, with one to three ranked mentor choices and a reason for each choice. Matching depends on mentor availability and fit.",
  pillarsHeading: 'Mentorship',
  cards: [],
};

export default function Xperts() {
  return <InitiativePage config={config} />;
}
