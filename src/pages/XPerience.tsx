import FadeIn from '../components/FadeIn';
import { InitiativeCta, InitiativeHero, InitiativeSectionHeader } from './InitiativePage';

// Programme facts come from the supplied X_Perience_Page_compressed.pdf.
export default function XPerience() {
  return (
    <div className="bg-white">
      <InitiativeHero
        eyebrow="Exclusive programme"
        title="Health X'perience"
        description="A year-long cohort for HealthX members who want to move from learning about healthcare innovation to working through real clinical challenges."
        ctaLabel="Programme updates"
        ctaHref="https://t.me/nushealthx"
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
                  { label: 'Medical Grand Challenge', sub: 'Top project nominations' },
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

          <div className="max-w-4xl space-y-5 leading-relaxed text-slate-600">
            <p>
              Across eight months, participants take part in seminars, hospital and industry visits, and interactive workshops. These experiences build skills in design thinking, prototyping, regulation, and commercialisation, while deepening understanding of clinical workflows and unmet needs.
            </p>
            <p>
              Teams will present their solutions at the HealthX Year-End Conference, with top projects nominated for the Medical Grand Challenge.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <InitiativeSectionHeader eyebrow="November 2025 kickoff" title="Inaugural programme sessions" />
          </FadeIn>

          <div className="max-w-4xl">
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
          </div>
        </div>
      </section>

      <InitiativeCta
        title="Stay in the loop"
        description="Join the HealthX Telegram channel for programme updates, event announcements, and registration links."
        ctaLabel="Join Telegram"
        href="https://t.me/nushealthx"
      />
    </div>
  );
}
