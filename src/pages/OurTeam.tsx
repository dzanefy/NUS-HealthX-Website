import FadeIn from '../components/FadeIn';

type TeamPerson = {
  name: string;
  role: string;
  study: string;
  initials: string;
};

const executiveCommittee: TeamPerson[] = [
  { name: 'Lucien Leong Guang Shian', role: 'President', study: 'Year 4, Medicine', initials: 'LL' },
  { name: 'Ng Chen Meng', role: 'Vice President', study: 'Year 2, AI & Business', initials: 'NC' },
  { name: 'Jon Yew', role: "Director, Health X'posure", study: 'Year 2, Medicine', initials: 'JY' },
  { name: 'Fatimah Rehman', role: "Deputy Director, Health X'posure", study: 'Year 4, Biomedical Engineering', initials: 'FR' },
  { name: 'Eugene Chua', role: 'Director, Partnerships (External)', study: 'Year 3, Life Sciences', initials: 'EC' },
  { name: 'Claire Hartawan', role: 'Director, Partnerships (Internal)', study: 'Year 4, Biomedical Engineering', initials: 'CH' },
  { name: 'Ellen Indraputri', role: 'Director, Marketing', study: 'Year 3, Life Sciences', initials: 'EI' },
];

const advisors: TeamPerson[] = [
  {
    name: 'Dr Ian Mathews',
    role: 'Key Clinician Advisor',
    study: 'Deputy Group CTO, NUHS · Senior Consultant, Emergency Medicine, NUH · Assistant Professor, YLL School of Medicine',
    initials: 'IM',
  },
];

function linkedInSearch(name: string) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`;
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function PersonCard({ person, index }: { person: TeamPerson; index: number }) {
  return (
    <FadeIn delay={index * 80}>
      <article className="group text-center">
        <div className="initiative-card flex aspect-square items-center justify-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-navy-950/8">
          <span className="text-5xl font-semibold tracking-tight text-navy-200 transition-colors duration-300 group-hover:text-navy-300">{person.initials}</span>
        </div>
        <div className="px-3 pt-6">
          <h3 className="text-xl font-semibold leading-tight text-navy-950">{person.name}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-500">{person.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{person.study}</p>
          <a
            href={linkedInSearch(person.name)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Find ${person.name} on LinkedIn`}
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-navy-700 transition-colors hover:text-teal-600"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </article>
    </FadeIn>
  );
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <FadeIn className="mb-12 text-center">
      <h2 className="serif text-4xl font-bold tracking-tight text-navy-950 md:text-5xl">{title}</h2>
      {description && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">{description}</p>}
    </FadeIn>
  );
}

export default function OurTeam() {
  return (
    <div className="bg-white">
      <section className="grain-bg px-6 py-32 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-teal-400">The people</p>
        <h1 className="serif mx-auto mb-6 max-w-4xl text-[clamp(48px,8vw,96px)] font-bold leading-tight text-white">Our Team</h1>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-navy-200">The people building a more connected healthcare innovation community at NUS.</p>
      </section>

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Executive Committee" description="AY 2026 / 2027" />
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {executiveCommittee.map((person, index) => <PersonCard key={person.name} person={person} index={index} />)}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Core Team" description="The wider Core Team for 2026 / 2027 will be listed here." />
          <div className="mx-auto flex min-h-56 max-w-4xl items-center justify-center rounded-3xl border border-dashed border-navy-200 bg-navy-50/40 px-6 text-center">
            <p className="text-sm text-slate-400">Core Team members will be added once the 2026 / 2027 appointments are confirmed.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Advisors" description="Guidance from clinicians and healthcare leaders who support the HealthX community." />
          <div className="mx-auto grid max-w-3xl gap-12 md:grid-cols-2">
            {advisors.map((person, index) => <PersonCard key={person.name} person={person} index={index} />)}
          </div>
        </div>
      </section>

      <section className="grain-bg cta-section px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">Open to all</p>
          <h2 className="serif mb-4 text-5xl font-bold text-white">All disciplines welcome</h2>
          <p className="mx-auto mb-10 max-w-xl leading-relaxed text-navy-200">Whether you&apos;re from Medicine, Engineering, Business, Computing, or any other faculty, if you care about healthcare innovation, there&apos;s a place for you here.</p>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {['Medicine', 'Engineering', 'Business', 'Computing', 'Design', 'Science', 'Law', 'Pharmacy', 'Dentistry'].map(d => <span key={d} className="cursor-default rounded-full border border-white/15 px-4 py-1.5 text-sm text-slate-300 transition-colors hover:border-teal-400 hover:text-teal-400">{d}</span>)}
          </div>
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-950 transition-colors hover:bg-navy-50">Join us on Telegram <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </div>
  );
}
