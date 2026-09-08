import InitiativePage, { type InitiativePageConfig } from './InitiativePage';

const config: InitiativePageConfig = {
  title: "X'perts",
  heroDescription: 'A flexible way for students to learn from people already building, treating, researching, and investing in healthcare.',
  ctaLabel: 'Become an expert',
  purpose: "X'perts is a curated network that connects students with clinicians, researchers, engineers, founders, and investors. Students share what they are trying to learn; experts choose a format and level of involvement that works for them.\n\nThe result is focused, useful contact rather than another networking event. There is no expectation to hire, invest, supervise, or refer.",
  pillarsHeading: 'Ways to contribute',
  cards: [
    { title: 'Office hours', description: 'Make space for one-to-one or small-group conversations at a cadence that suits you.' },
    { title: 'Expert panels', description: 'Join a focused discussion and answer questions from students who have prepared in advance.' },
    { title: 'Project feedback', description: "Read a student's work and offer a practical perspective before they take it further." },
    { title: 'Career guidance', description: 'Explain how your part of the field works and what it takes to build a career in it.' },
    { title: 'Opportunity connection', description: 'Point a student towards a lab, company, programme, or person who could help.' },
    { title: 'Long-term mentorship', description: 'If the first conversation is a good fit, continue the relationship at a pace that works for both sides.' },
  ],
  archiveDescription: "No past events published for X'perts yet.",
  archiveHint: 'Add a markdown file under content/programmes/ to make one appear here.',
};

export default function Xperts() {
  return <InitiativePage config={config} />;
}
