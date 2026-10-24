import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import FadeIn from '../components/FadeIn';
import { useEvents } from '../hooks/useEvents';
import type { XPosureEvent } from '../data/events';
import { communityPhotos, communityGallery } from '../data/communityPhotos';

/* ── Scramble hero word ──────────────────────────────── */
const SCRAMBLE_WORDS = ['Medicine', 'Engineering', 'Business', 'Computing', 'Design', 'Science', 'Law'];
const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz';

function ScrambleWord() {
  const [displayed, setDisplayed] = useState(SCRAMBLE_WORDS[0]);
  const r = useRef({ idx: 0, iv: 0 as any, to: 0 as any });

  useEffect(() => {
    function go(target: string) {
      clearInterval(r.current.iv);
      clearTimeout(r.current.to);
      let f = 0;
      const total = 22;
      r.current.iv = setInterval(() => {
        f++;
        const resolved = f < 8 ? 0 : Math.round(((f - 8) / (total - 8)) * target.length);
        if (f >= total) {
          clearInterval(r.current.iv);
          setDisplayed(target);
          r.current.to = setTimeout(() => {
            r.current.idx = (r.current.idx + 1) % SCRAMBLE_WORDS.length;
            go(SCRAMBLE_WORDS[r.current.idx]);
          }, 1500);
        } else {
          setDisplayed(
            target.slice(0, resolved) +
            Array.from({ length: target.length - resolved }, () =>
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
            ).join('')
          );
        }
      }, 50);
    }
    r.current.to = setTimeout(() => { r.current.idx = 1; go(SCRAMBLE_WORDS[1]); }, 1500);
    return () => { clearInterval(r.current.iv); clearTimeout(r.current.to); };
  }, []);

  return <span className="serif italic text-teal-300">{displayed}</span>;
}

/* ── Count-up stat ───────────────────────────────────── */
/* ── Disciplines ticker ───────────────────────────── */
const row1 = ['Medicine', 'Engineering', 'Business', 'Computing', 'Design', 'Science', 'Law', 'Pharmacy', 'Dentistry', 'Nursing'];
const row2 = ['Biomedical Engineering', 'Public Health', 'Data Science', 'Architecture', 'Psychology', 'Computer Science', 'Entrepreneurship', 'Statistics', 'Social Work', 'Life Sciences'];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 select-none border border-white/18 text-white/65 bg-white/4">
      {label}
    </span>
  );
}

function DisciplinesTicker() {
  return (
    <section className="grain-bg py-20 overflow-hidden">
      <FadeIn className="text-center mb-10 px-6">
        <p className="serif text-3xl md:text-4xl font-bold text-white mb-2">
          Every discipline,<em className="text-teal-400"> one community.</em>
        </p>
        <p className="text-slate-400 text-sm">NUS HealthX welcomes students from all faculties</p>
      </FadeIn>
      <div className="relative mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020d1e] to-transparent z-10 pointer-events-none" />
        <div className="flex marquee-left gap-3">{[...row1, ...row1].map((d, i) => <Pill key={i} label={d} />)}</div>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#020d1e] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#020d1e] to-transparent z-10 pointer-events-none" />
        <div className="flex marquee-right gap-3">{[...row2, ...row2].map((d, i) => <Pill key={i} label={d} />)}</div>
      </div>
    </section>
  );
}

/* ── Data ─────────────────────────────────────────── */
const initiatives = [
  { number: '01', tag: 'Open programme', title: "X'posure", desc: 'Talks, workshops, and conversations that make healthcare innovation easier to enter.', to: '/xposure', img: communityPhotos[2].src },
  { number: '02', tag: 'Member cohort', title: "X'perience", desc: 'A year-long path from clinical observation to tested ideas and practical capability.', to: '/xperience', img: communityGallery[1].src },
  { number: '03', tag: 'Project placements', title: "X'ccelerate", desc: 'Share your background and interests through the X’ccelerate application form.', to: '/xcelerate', img: communityPhotos[0].src },
  { number: '04', tag: 'Mentorship network', title: "X'perts", desc: 'Find useful guidance from people building, treating, researching, and investing in healthcare.', to: '/xperts', img: communityGallery[0].src },
  { number: '05', tag: 'Global exchange', title: "X'change", desc: 'Follow HealthX announcements for programme updates.', to: '/xchange', img: communityPhotos[1].src },
];

const pillars = [
  { title: 'Connect', desc: 'Meet like-minded peers across medicine, engineering, business, computing, and design.' },
  { title: 'Be Inspired', desc: 'Learn from seasoned MedTech leaders through mentorship, fireside chats, and exclusive industry events.' },
  { title: 'Make an Impact', desc: 'Build real solutions to real clinical problems through hands-on innovation projects.' },
];

function HomeEventCard({ event }: { event: XPosureEvent }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  return (
    <Link to={`/xposure/${event.slug}`} className="group relative block min-h-[320px] overflow-hidden rounded-2xl bg-navy-950 sm:min-h-[380px]">
      {event.thumbnail && !photoFailed && <img src={event.thumbnail} alt={event.title} loading="lazy" onError={() => setPhotoFailed(true)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020d1e] via-[#020d1e]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-teal-400">{event.category}{event.upcoming ? ' · Upcoming' : ''}</p>
        <p className="mb-2 text-sm text-white/80">{event.shortDate}</p>
        <h3 className="serif text-2xl font-bold text-white">{event.title}</h3>
        <span className="mt-4 inline-block text-sm font-semibold text-white">Read more →</span>
      </div>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function Home() {
  const { events, loading, error, retry } = useEvents({ sheetOnly: true });
  const eventCards = events.slice(0, 4);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="grain-bg min-h-screen flex flex-col justify-end px-6 pb-24 pt-40 lg:px-20">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/12 bg-white/6 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse flex-shrink-0" />
            <span className="serif italic text-white text-sm">NUS Registered Student Organisation</span>
            <span className="text-white/20 text-sm">·</span>
            <span className="text-white/40 text-xs font-medium tracking-wide">Est. 2024</span>
          </div>
          <h1 className="font-bold text-white leading-[1.08] mb-8" style={{ fontSize: 'clamp(48px,6.5vw,92px)' }}>
            HealthX unites<br />
            <ScrambleWord /> students<br />
            for medtech innovation.
          </h1>
          <p className="text-slate-300 text-lg max-w-lg leading-relaxed mb-12">
            A student-led initiative at the National University of Singapore, convening Medicine, Engineering, Business, Computing, Design, Science and Law to solve real healthcare problems together.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/xposure" className="px-8 py-3.5 bg-white text-navy-950 text-sm font-bold rounded-full hover:bg-navy-50 transition-colors">Explore events</Link>
            <Link to="/about" className="px-8 py-3.5 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors">Learn about us</Link>
          </div>
        </div>
      </section>

      {/* Who we are: text and photo mosaic */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <FadeIn>
            <div className="w-8 h-1 bg-teal-500 rounded-full mb-5" />
            <h2 className="serif text-5xl font-bold text-navy-950 leading-tight mb-6">
              The home for future<br />healthcare innovators
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5 text-lg">
              NUS HealthX brings together students from every discipline, united by a passion for improving healthcare through innovation, collaboration, and hands-on learning.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">We connect. We empower. We innovate.</p>
            <a href="https://t.me/nushealthx" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-navy-950 text-navy-950 text-sm font-bold rounded-full hover:bg-navy-950 hover:text-white transition-all">
              Join Us Now
            </a>
          </FadeIn>

          {/* Right: 2×2 photo mosaic */}
          <FadeIn delay={150} className="grid grid-cols-2 gap-3">
            {/* Tall left photo */}
            <div className="relative row-span-2 rounded-2xl overflow-hidden bg-navy-50" style={{ minHeight: '340px' }}>
              <img src={communityPhotos[0].src} alt={communityPhotos[0].caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: communityPhotos[0].position }} />
            </div>
            {/* Two stacked right photos */}
            <div className="relative rounded-2xl overflow-hidden bg-navy-50 aspect-[4/3]">
              <img src={communityPhotos[1].src} alt={communityPhotos[1].caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: communityPhotos[1].position }} />
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-navy-50 aspect-[4/3]">
              <img src={communityPhotos[2].src} alt={communityPhotos[2].caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: communityPhotos[2].position }} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pillars: horizontal strip */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          {pillars.map(({ title, desc }, i) => (
            <FadeIn key={title} delay={i * 90}>
              <div className="flex gap-4 p-6 rounded-2xl border border-slate-100 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-950/5 transition-all bg-white h-full">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="serif text-lg font-bold text-navy-950 mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EVENTS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="w-8 h-1 bg-teal-500 rounded-full mb-4" />
                <h2 className="serif text-5xl font-bold text-navy-950">Our Events</h2>
                <p className="text-slate-400 mt-2">Hackathons · Masterclasses · Networking · Modules</p>
              </div>
              <Link to="/xposure" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 border border-navy-200 text-navy-950 text-sm font-bold rounded-full hover:bg-navy-950 hover:text-white hover:border-navy-950 transition-all">
                View All →
              </Link>
            </div>
          </FadeIn>
          {loading && <p role="status" className="text-slate-500">Loading events…</p>}
          {error && <p role="alert" className="text-slate-600">We couldn’t load events. <button onClick={retry} className="underline">Try again</button></p>}
          {!loading && !error && eventCards.length === 0 && <p className="text-slate-500">No events published yet. Check back soon.</p>}
          {!loading && !error && <div className={`grid grid-cols-1 gap-4 ${eventCards.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {eventCards.map((event, i) => (
              <FadeIn key={event.id} delay={i * 80}>
                <HomeEventCard event={event} />
              </FadeIn>
            ))}
          </div>}
        </div>
      </section>

      {/* ── COMMUNITY PHOTO STRIP ── */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="w-8 h-1 bg-teal-500 rounded-full mb-3" />
                <h2 className="serif text-3xl font-bold text-navy-950">From our community</h2>
              </div>
              <Link to="/our-team" className="text-sm font-bold text-navy-400 hover:text-navy-950 transition-colors">Meet the team →</Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {communityGallery.map(({ src, label }, i) => (
              <FadeIn key={label} delay={i * 70}>
                <div className="group relative rounded-2xl overflow-hidden aspect-square bg-navy-50">
                  <img src={src} alt={label} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold">{label}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES TICKER ── */}
      <DisciplinesTicker />

      {/* ── INITIATIVES ── */}
      <section className="bg-slate-50 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-5 h-1 w-8 rounded-full bg-teal-500" />
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-teal-600">How to get involved</p>
                <h2 className="serif text-5xl font-bold leading-tight text-navy-950">Five ways into healthcare innovation</h2>
                <p className="mt-4 max-w-xl leading-relaxed text-slate-500">Start with a conversation, join a cohort, work on a live project, or take your curiosity further. There is more than one way to find your place in HealthX.</p>
              </div>
              <Link to="/timeline" className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 transition-colors hover:text-teal-600">See the full timeline <span aria-hidden="true">→</span></Link>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {initiatives.map(({ number, tag, title, desc, to, img }, i) => (
              <FadeIn key={title} delay={i * 80} className={i === 0 ? 'md:col-span-2' : ''}>
                <Link to={to} className="initiative-card group flex h-full min-h-64 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/8">
                  <div className="flex min-w-0 flex-1 flex-col p-7 md:p-8">
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">{tag}</span>
                      <span className="serif text-3xl font-bold leading-none text-navy-200">{number}</span>
                    </div>
                    <h3 className="serif mb-3 text-3xl font-bold text-navy-950">{title}</h3>
                    <p className="max-w-lg flex-1 text-sm leading-relaxed text-slate-500">{desc}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy-950 transition-colors group-hover:text-teal-600">Explore {title} <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
                  </div>
                  <div className="relative hidden w-2/5 overflow-hidden sm:block">
                    <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="grain-bg py-20 px-6">
        <FadeIn className="max-w-3xl mx-auto">
          <div className="bg-navy-50 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="serif text-4xl font-bold text-navy-950 mb-3">Join NUS HealthX</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Be part of the healthcare innovation community on campus. Stay in the loop with events, opportunities, and everything HealthX.
            </p>
            <a href="https://t.me/nushealthx" className="inline-flex items-center gap-2 px-8 py-4 bg-navy-950 text-white text-sm font-bold rounded-full hover:bg-navy-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
              </svg>
              Join Telegram Channel →
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
