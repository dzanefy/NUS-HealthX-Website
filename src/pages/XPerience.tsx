import FadeIn from '../components/FadeIn';
import { InitiativeCta, InitiativeHero, InitiativeSectionHeader } from './InitiativePage';

const phases = [
  { num: '01', title: 'Needs finding', period: 'Sep to Oct', desc: 'Teams visit clinical environments, speak with people close to the problem, and identify genuine unmet needs before any design begins.' },
  { num: '02', title: 'Problem framing', period: 'Nov to Dec', desc: 'Working with clinical mentors, teams turn observations into focused problem statements through needs validation and patient journey mapping.' },
  { num: '03', title: 'Ideation and prototyping', period: 'Jan to Feb', desc: 'Teams develop and test possible solutions against clinical feasibility, user needs, regulatory constraints, and commercial viability.' },
  { num: '04', title: 'Validation and showcase', period: 'Mar to Apr', desc: 'Prototypes are tested with users and clinical stakeholders before teams present their work at the HealthX Year-End Conference.' },
];

export default function XPerience() {
  return (
    <div className="bg-white">
      <InitiativeHero
        eyebrow="Exclusive programme"
        title="Health X'perience"
        description="A year-long cohort for HealthX members who want to move from learning about healthcare innovation to working through real clinical challenges."
        ctaLabel="Join the cohort"
        ctaHref="#get-involved"
      />

      <section id="content" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <FadeIn>
            <div className="initiative-card h-full p-8 md:p-10">
              <InitiativeSectionHeader eyebrow="About the programme" title="Learn by working through the problem" />
              <p className="mb-4 leading-relaxed text-slate-600">
                Health X&apos;perience is HealthX&apos;s exclusive year-long MedTech immersion programme, created for our internal team members. It connects medicine, engineering, design, business, and technology, giving participants a structured way to explore healthcare innovation through clinical exposure and hands-on practice.
              </p>
              <p className="leading-relaxed text-slate-600">
                With guidance from clinicians, faculty, and industry mentors, participants build practical skills, lasting networks, and the confidence to turn ideas into impact.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="initiative-card h-full p-8 md:p-10">
              <InitiativeSectionHeader eyebrow="Eligibility and commitment" title="A cohort built for steady progress" />
              <p className="mb-6 leading-relaxed text-slate-600">
                Open to HealthX internal team members who can commit to consistent participation across the academic year. From September to April, participants engage with mentors, attend working sessions, and contribute to a team project.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '20 to 30 sessions', sub: 'September to April' },
                  { label: 'Clinician mentors', sub: 'Hospitals and industry' },
                  { label: 'Year-end showcase', sub: 'Partners and leaders' },
                  { label: 'Grand Challenge pathway', sub: 'For selected projects' },
                ].map(({ label, sub }) => (
                  <div key={label} className="rounded-2xl border border-navy-100 bg-navy-50/70 p-4">
                    <p className="text-sm font-bold text-navy-950">{label}</p>
                    <p className="mt-0.5 text-xs text-navy-500">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="journey" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <InitiativeSectionHeader eyebrow="The journey" title="Programme journey" />
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {phases.map(({ num, title, period, desc }, i) => (
              <FadeIn key={num} delay={i * 80}>
                <article className="initiative-card h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/8">
                  <span className="serif mb-4 block text-6xl font-bold text-navy-100">{num}</span>
                  <h3 className="serif mb-3 text-xl font-bold text-navy-950">{title}</h3>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-cyan">{period}</p>
                  <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            Across eight months, participants take part in seminars, hospital and industry visits, and interactive workshops. Together, these sessions build confidence in design thinking, prototyping, regulation, and commercialisation.
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <InitiativeSectionHeader eyebrow="AY25/26 kickoff" title="Programme sessions so far" />
          </FadeIn>

          <div className="grid items-start gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-5 leading-relaxed text-slate-600">
              <p>
                The inaugural Health X&apos;perience programme kicked off with two foundational learning sessions on 12 and 13 November 2025. The programme featured an engaging session by Dr Ian Mathews, who introduced the Stanford Biodesign framework and guided participants through design thinking, needs validation, and the identification of unmet clinical needs through patient journey mapping and problem framing.
              </p>
              <p>
                This was followed by a session led by Mr. Harry W., who unpacked key MedTech commercialisation fundamentals, including product-market fit, TAM-SAM-SOM analysis, competitive landscape evaluation, and business model development.
              </p>
              <p>
                Together, the sessions provided participants with both innovation and business foundations, while fostering active discussions among students and mentors committed to translating MedTech ideas into practical solutions.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="initiative-card overflow-hidden p-2">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=450&fit=crop&auto=format" alt="Health X'perience session" className="aspect-[4/3] h-full w-full rounded-2xl object-cover" />
              </div>
              <div className="initiative-card overflow-hidden p-2">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=450&fit=crop&auto=format" alt="Health X'perience workshop" className="aspect-[4/3] h-full w-full rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <InitiativeCta
        title="Stay in the loop"
        description="Join the HealthX Telegram channel for programme updates, event announcements, and registration links."
        ctaLabel="Join Telegram"
        href="#"
      />
    </div>
  );
}
