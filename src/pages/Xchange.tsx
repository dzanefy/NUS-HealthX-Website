import InitiativePage, { type InitiativePageConfig } from './InitiativePage';

const config: InitiativePageConfig = {
  title: "X'change",
  heroDescription: 'Follow HealthX announcements for programme updates.',
  ctaLabel: 'Programme updates',
  ctaHref: 'https://t.me/nushealthx',
  purpose: "Follow the HealthX Telegram channel for X'change programme announcements.",
  pillarsHeading: 'Programme',
  cards: [],
};

export default function Xchange() {
  return <InitiativePage config={config} />;
}
