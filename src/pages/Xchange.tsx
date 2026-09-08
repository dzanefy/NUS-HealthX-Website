import InitiativePage, { type InitiativePageConfig } from './InitiativePage';

const config: InitiativePageConfig = {
  title: "X'change",
  heroDescription: 'See healthcare innovation through another system, another market, and another set of constraints.',
  ctaLabel: 'Register your interest',
  purpose: "X'change takes HealthX beyond Singapore through selected immersions, exchanges, and competitions. Students return with new references, new collaborators, and a sharper view of how healthcare problems can be approached in different contexts.",
  pillarsHeading: 'You could go',
  cards: [
    { title: 'Munich', description: 'A focused immersion across engineering, medicine, and business, built around exchange with people working in the local ecosystem.' },
    { title: 'Tokyo', description: 'A chance to compare approaches to healthcare innovation and learn from partners working in a different institutional setting.' },
    { title: 'London', description: "An international medical innovation competition with King's College London, bringing student teams together around real clinical problems." },
  ],
  archiveDescription: "No past events published for X'change yet.",
  archiveHint: 'Add a markdown file under content/programmes/ to make one appear here.',
};

export default function Xchange() {
  return <InitiativePage config={config} />;
}
