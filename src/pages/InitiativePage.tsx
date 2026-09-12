import { Link } from 'react-router';
import FadeIn from '../components/FadeIn';

type InitiativeCard = {
  title: string;
  description: string;
};

export type InitiativePageConfig = {
  title: string;
  heroDescription: string;
  ctaLabel: string;
  purpose: string;
  pillarsHeading: string;
  cards: InitiativeCard[];
  archiveDescription: string;
  archiveHint: string;
  stats?: string[];
};

const defaultStats = ['Students Engaged', 'Projects Incubated', 'Digital Engagement'];

export function InitiativeHero({
  eyebrow = 'Programme',
  title,
  description,
  ctaLabel,
  ctaHref = '#content',
}: {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="grain-bg px-6 py-32 text-center lg:py-40">
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-teal-400">{eyebrow}</p>
        <h1 className="serif mb-6 text-[clamp(52px,9vw,104px)] font-bold leading-[0.95] text-white">{title}</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-navy-200 md:text-xl">{description}</p>
        {ctaLabel && (
          <a href={ctaHref} className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20">
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
      <p className="mx-auto mt-20 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">Scroll to explore</p>
    </section>
  );
}

export function InitiativeSectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-brand-cyan">{eyebrow}</p>}
      <h2 className="serif text-4xl font-bold text-navy-950 md:text-5xl">{title}</h2>
    </div>
  );
}

export function InitiativeCta({
  title,
  description,
  ctaLabel,
  href = '/',
}: {
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
}) {
  return (
    <section id="get-involved" className="grain-bg cta-section px-6 py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-teal-400">Get involved</p>
        <h2 className="serif mb-5 text-5xl font-bold text-white">{title}</h2>
        <p className="mb-8 leading-relaxed text-navy-200">{description}</p>
        <Link to={href} className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-950 transition-colors hover:bg-navy-50">
          {ctaLabel.toLowerCase().includes('telegram') && (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
            </svg>
          )}
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

function PlaceholderPhoto({ label }: { label: string }) {
  return (
    <div className="flex min-h-64 items-center justify-center rounded-2xl border border-navy-100 bg-gradient-to-br from-white to-navy-50 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">
      {label}
    </div>
  );
}

export default function InitiativePage({ config }: { config: InitiativePageConfig }) {
  const stats = config.stats ?? defaultStats;

  return (
    <div className="bg-white">
      <InitiativeHero title={config.title} description={config.heroDescription} ctaLabel={config.ctaLabel} ctaHref="#get-involved" />

      <section id="content" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10">
            <InitiativeSectionHeader eyebrow="The programme" title="How it works" />
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn>
              <div className="initiative-card h-full min-h-72 p-8 md:p-10">
                <p className="mb-6 text-sm font-bold text-navy-950">Purpose</p>
                <p className="max-w-xl whitespace-pre-line text-lg leading-relaxed text-slate-500">{config.purpose}</p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <PlaceholderPhoto label="Insert photo" />
            </FadeIn>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {stats.map((stat, index) => (
              <FadeIn key={stat} delay={index * 80}>
                <div className="initiative-card flex min-h-44 flex-col items-center justify-center p-7 text-center">
                  <span className="serif mb-2 text-6xl font-bold leading-none text-navy-950">X</span>
                  <p className="text-sm font-bold text-navy-950">{stat}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10">
            <h2 className="serif text-5xl font-bold text-navy-950">{config.pillarsHeading}</h2>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {config.cards.map((card, index) => (
              <FadeIn key={card.title} delay={index * 80}>
                <article className="initiative-card h-full min-h-64 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/8">
                  <h3 className="serif mb-5 text-3xl font-bold leading-tight text-navy-950">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-500">{card.description}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-10">
            <h2 className="serif text-5xl font-bold text-navy-950">What we&apos;ve run</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="initiative-card flex min-h-52 flex-col items-center justify-center p-8 text-center">
              <p className="mb-2 text-base text-slate-500">{config.archiveDescription}</p>
              <p className="max-w-lg text-sm leading-relaxed text-slate-400">{config.archiveHint}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <InitiativeCta title="Stay in the loop" description="Join the HealthX Telegram channel for programme updates, event announcements, and registration links." ctaLabel="Join Telegram" href="#" />
    </div>
  );
}
