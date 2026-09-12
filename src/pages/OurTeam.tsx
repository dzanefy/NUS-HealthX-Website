import { useState } from 'react';
import FadeIn from '../components/FadeIn';

const photoBaseUrl = 'https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/team-photos/';
const teamPhotoUrl = `${photoBaseUrl}healthx-team-2026-2027.png`;
const portraitFiles: Record<string, string> = {
  'Lucien Leong Guang Shian': 'lucien-leong-guang-shian.jpg',
  'Ng Chen Meng': 'ng-chen-meng.png',
  'Eugene Chua': 'eugene-chua.jpg',
  'Claire Hartawan': 'claire-hartawan.jpg',
  'Elkan Chua': 'elkan-chua.jpg',
  'Ning Wanqing': 'ning-wanqing.jpg',
  'Ellen Indraputri': 'ellen-indraputri.png',
  'Vedika Binani': 'vedika-binani.png',
  'Hemil Batavia': 'hemil-batavia.jpg',
  'Esha Kejriwal': 'esha-kejriwal.jpg',
  'Jessica Chen': 'jessica-chen.jpg',
  'Danial-Zanefy': 'danial-zanefy.jpg',
  'Darren Chung': 'darren-chung.png',
  'Jon Yew': 'jon-yew.jpg',
  'Hibiki Nishiwaki': 'hibiki-nishiwaki.jpg',
  'Kavya Frances Thiagarajan': 'kavya-frances-thiagarajan.jpg',
  'Fatimah Rehman': 'fatimah-rehman.jpg',
  'Filip Tudose': 'filip-tudose.jpg',
  'Mohamad Naufal Hakeem': 'mohamad-naufal-hakeem.jpg',
  'Wesley Ong': 'wesley-ong.jpg',
};

function TeamPhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="overflow-hidden rounded-3xl border border-navy-100 bg-navy-50">
      {teamPhotoUrl && !failed ? (
        <div className="overflow-hidden">
          <img src={teamPhotoUrl} alt="NUS HealthX team, academic year 2026–2027" loading="lazy" onError={() => setFailed(true)} className="block h-auto w-full origin-[40%_75%] scale-150" />
        </div>
      ) : (
        <div className="flex aspect-[16/9] min-h-52 flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-50 to-navy-100 px-6 text-center">
          <span className="serif text-3xl font-bold text-navy-950 sm:text-5xl">One HealthX team</span>
          <p className="text-sm text-navy-700">Team photo coming soon</p>
        </div>
      )}
      <figcaption className="px-6 py-4 text-center text-sm font-semibold text-navy-700">NUS HealthX · AY 2026 / 2027</figcaption>
    </figure>
  );
}

type TeamPerson = {
  name: string;
  role: string;
  study: string;
  initials: string;
};

const teams: { id: string; name: string; members: TeamPerson[] }[] = [
  { id: 'presidents', name: 'Presidents', members: [
    { name: 'Lucien Leong Guang Shian', role: 'President', study: 'Year 4, Medicine', initials: 'LL' },
    { name: 'Ng Chen Meng', role: 'Vice President', study: 'Year 2, Business AI Systems', initials: 'NC' },
  ] },
  { id: 'partnerships', name: 'Partnerships', members: [
    { name: 'Eugene Chua', role: 'Director, Partnerships (External)', study: 'Year 3, Life Sciences', initials: 'EC' },
    { name: 'Claire Hartawan', role: 'Director, Partnerships (Internal)', study: 'Year 4, Biomedical Engineering', initials: 'CH' },
    { name: 'Elkan Chua', role: 'Associate, Partnerships (External)', study: 'Year 2, Business AI Systems', initials: 'EC' },
    { name: 'Ning Wanqing', role: 'Associate, Partnerships', study: 'Year 1, Medicine', initials: 'NW' },
  ] },
  { id: 'marketing', name: 'Marketing', members: [
    { name: 'Ellen Indraputri', role: 'Director, Marketing', study: 'Year 3, Life Sciences', initials: 'EI' },
    { name: 'Vedika Binani', role: 'Associate, Marketing', study: 'Year 1, Life Sciences', initials: 'VB' },
  ] },
  { id: 'finance-operations', name: 'Finance & Operations', members: [
    { name: 'Hemil Batavia', role: 'Director, Finance & Operations', study: 'Year 3, Finance', initials: 'HB' },
    { name: 'Esha Kejriwal', role: 'Associate, Finance & Operations', study: 'Year 4, Finance', initials: 'EK' },
  ] },
  { id: 'technology', name: 'Technology', members: [
    { name: 'Jessica Chen', role: 'Director, Technology', study: 'Year 2, Computer Science', initials: 'JC' },
    { name: 'Danial-Zanefy', role: 'Associate, Technology', study: 'Year 2, Business AI Systems', initials: 'DZ' },
    { name: 'Darren Chung', role: 'Associate, Technology', study: 'Year 3, Computer Science', initials: 'DC' },
  ] },
  { id: 'xposure', name: "Health X'posure", members: [
    { name: 'Jon Yew', role: "Director, Health X'posure", study: 'Year 2, Medicine', initials: 'JY' },
    { name: 'Hibiki Nishiwaki', role: "Associate, Health X'posure", study: 'Year 3, Computer Science', initials: 'HN' },
    { name: 'Kavya Frances Thiagarajan', role: "Associate, Health X'posure", study: 'Year 3, Public Health', initials: 'KT' },
  ] },
  { id: 'xperience', name: "Health X'perience", members: [
    { name: 'Fatimah Rehman', role: "Director, Health X'perience", study: 'Year 4, Biomedical Engineering', initials: 'FR' },
    { name: 'Filip Tudose', role: "Associate, Health X'perience", study: 'Year 3, Biomedical Engineering', initials: 'FT' },
    { name: 'Mohamad Naufal Hakeem', role: "Associate, Health X'perience", study: 'Year 1, Business Administration', initials: 'NH' },
  ] },
  { id: 'xccelerate', name: "Health X'ccelerate", members: [
    { name: 'Wesley Ong', role: "Associate, Health X'ccelerate", study: 'Year 2, Biomedical Engineering', initials: 'WO' },
  ] },
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
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoFile = portraitFiles[person.name];
  return (
    <FadeIn delay={index * 80}>
      <article className="group text-center">
        <div className="initiative-card relative flex aspect-square items-center justify-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-navy-950/8">
          {photoFile && !photoFailed ? (
            <img src={`${photoBaseUrl}${photoFile}`} alt={person.name} loading="lazy" onError={() => setPhotoFailed(true)} className={`absolute inset-0 h-full w-full object-cover ${person.name === 'Darren Chung' ? 'object-top' : person.name === 'Ng Chen Meng' ? 'object-[center_55%]' : 'object-bottom'}`} />
          ) : (
            <span className="text-5xl font-semibold tracking-tight text-navy-200 transition-colors duration-300 group-hover:text-navy-300">{person.initials}</span>
          )}
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

      <section aria-labelledby="whole-team-heading" className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-8 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-600">Together at HealthX</p>
            <h2 id="whole-team-heading" className="serif text-4xl font-bold text-navy-950 sm:text-5xl">The team behind it all</h2>
          </FadeIn>
          <FadeIn><TeamPhoto /></FadeIn>
        </div>
      </section>

      <nav aria-label="Jump to a team" className="border-b border-navy-100 px-6 py-10">
        <p className="mb-5 text-center text-sm font-semibold text-navy-950">Meet our teams · AY 2026 / 2027</p>
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
          {[...teams, { id: 'advisors', name: 'Advisors' }].map(team => <a key={team.id} href={`#team-${team.id}`} className="rounded-full border border-navy-100 bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-600">{team.name}</a>)}
        </div>
      </nav>

      {teams.map((team, teamIndex) => <section key={team.id} id={`team-${team.id}`} aria-label={team.name} className={`scroll-mt-28 px-6 py-20 ${teamIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={team.name} />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-14">
            {team.members.map((person, index) => <div key={person.name} className="w-full max-w-xs sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]"><PersonCard person={person} index={index} /></div>)}
          </div>
        </div>
      </section>)}

      <section id="team-advisors" className="scroll-mt-28 bg-slate-50 px-6 py-28">
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
