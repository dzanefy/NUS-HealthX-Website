import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { eventTypeConfig, type TimelineMonth } from '../data/timeline';
import { useEvents } from '../hooks/useEvents';
import EventFilters from '../components/EventFilters';
import FadeIn from '../components/FadeIn';

const typeAccent: Record<string, string> = {
  xposure: 'bg-navy-100 text-navy-800 border-navy-200',
  xperience: 'bg-teal-50 text-teal-800 border-teal-200',
  networking: 'bg-violet-50 text-violet-800 border-violet-200',
  challenge: 'bg-amber-50 text-amber-800 border-amber-200',
  workshop: 'bg-emerald-50 text-emerald-800 border-emerald-200',
};

const typeDot: Record<string, string> = {
  xposure: 'bg-navy-950',
  xperience: 'bg-teal-600',
  networking: 'bg-violet-600',
  challenge: 'bg-amber-500',
  workshop: 'bg-emerald-600',
};

const legendDot: Record<string, string> = {
  xposure: 'bg-blue-200',
  xperience: 'bg-cyan-300',
  networking: 'bg-fuchsia-300',
  challenge: 'bg-amber-300',
  workshop: 'bg-emerald-300',
};

export default function Timeline() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const { events, loading, error, retry } = useEvents();
  const [category, setCategory] = useState('');
  const [subPillar, setSubPillar] = useState('');
  const [period, setPeriod] = useState('all');
  const timelineData = useMemo(() => {
    const months = new Map<string, TimelineMonth>();
    for (const event of events) {
      if (category && (event.category || 'Other') !== category) continue;
      if (subPillar && event.subPillar !== subPillar) continue;
      if (period === 'upcoming' && !event.upcoming || period === 'past' && event.upcoming) continue;
      const date = event.dateISO ? new Date(`${event.dateISO}T12:00:00Z`) : null;
      const dated = date !== null && !Number.isNaN(date.getTime());
      const key = dated ? event.dateISO.slice(0, 7) : 'undated';
      if (!months.has(key)) {
        months.set(key, {
          monthISO: key,
          month: dated ? date.toLocaleDateString('en-SG', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : 'Date to be confirmed',
          shortMonth: dated ? date.toLocaleDateString('en-SG', { month: 'short', timeZone: 'UTC' }) : 'TBC',
          year: dated ? key.slice(0, 4) : '',
          events: [],
        });
      }
      months.get(key)!.events.push({
        id: event.id, title: event.title, type: 'xposure',
        category: event.category || 'Other', subPillar: event.subPillar,
        date: event.shortDate, dateISO: event.dateISO, location: event.location,
        description: event.excerpt, speakers: event.speakers.map(s => s.name),
        registerUrl: event.registerUrl, upcoming: event.upcoming, slug: event.slug,
      });
    }
    return [...months.values()].sort((a, b) => {
      if (a.monthISO === 'undated') return 1;
      if (b.monthISO === 'undated') return -1;
      return period === 'upcoming' ? a.monthISO.localeCompare(b.monthISO) : b.monthISO.localeCompare(a.monthISO);
    }).map(month => ({ ...month, events: month.events.sort((a, b) => (period === 'upcoming' ? a.dateISO.localeCompare(b.dateISO) : b.dateISO.localeCompare(a.dateISO)) || a.id.localeCompare(b.id)) }));
  }, [events, category, subPillar, period]);

  return (
    <div className="bg-white">
      <section className="grain-bg px-6 py-28 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-teal-300">HealthX events</p>
        <h1 className="serif mb-6 text-[clamp(48px,8vw,96px)] font-bold leading-tight text-white">Timeline</h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-white/85">
          Explore our published events, from upcoming sessions to past highlights. Click an event for details and its article.
        </p>

        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3" aria-label="Event categories">
          {Object.entries(eventTypeConfig).filter(([type]) => timelineData.some(month => month.events.some(event => event.type === type))).map(([type, cfg]) => (
            <span key={type} className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${legendDot[type]}`} aria-hidden="true" />
              {cfg.label}
            </span>
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-wrap items-end gap-4 lg:col-span-2">
          <EventFilters category={category} subPillar={subPillar} onChange={(c, s) => { setCategory(c); setSubPillar(s); setActiveEventId(null); }} />
          <label className="flex flex-col gap-2 text-sm font-semibold text-navy-950">When
            <select value={period} onChange={e => { setPeriod(e.target.value); setActiveEventId(null); }} className="rounded-xl border border-navy-100 bg-white px-4 py-3"><option value="all">All dates</option><option value="upcoming">Upcoming</option><option value="past">Past</option></select>
          </label>
          {(category || subPillar || period !== 'all') && <button className="px-4 py-3 text-sm font-semibold text-navy-950 underline" onClick={() => { setCategory(''); setSubPillar(''); setPeriod('all'); }}>Clear filters</button>}
        </div>
        {loading && <p role="status" className="text-slate-500 lg:col-span-2">Loading events…</p>}
        {error && <p role="alert" className="text-slate-600 lg:col-span-2">We couldn’t load events. <button onClick={retry} className="underline">Try again</button></p>}
        {!loading && !error && timelineData.length === 0 && <p role="status" className="text-slate-500 lg:col-span-2">No events match these filters.</p>}
        {timelineData.length > 0 && <>
        <nav className="lg:sticky lg:top-24">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">Jump to month</p>
          <ul className="space-y-0.5">
            {timelineData.map(month => {
              const hasFuture = month.events.some(event => event.upcoming);
              return (
                <li key={month.monthISO}>
                  <a href={`#month-${month.monthISO}`} className="group flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition-all hover:bg-navy-50 hover:text-navy-950">
                    {month.month}
                    {hasFuture && <span className="h-2 w-2 rounded-full bg-teal-500 transition-transform group-hover:scale-125" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative">
          <div className="absolute bottom-2 left-[19px] top-2 w-px bg-slate-100" aria-hidden="true" />

          <div className="space-y-14">
            {timelineData.map(month => (
              <section key={month.monthISO} id={`month-${month.monthISO}`} className="scroll-mt-24">
                <FadeIn className="relative z-10 mb-5 flex items-center gap-4">
                  <div className={`relative flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-full border-2 text-[10px] font-bold ${month.events.some(event => event.upcoming) ? 'border-navy-950 bg-navy-950 text-white' : 'border-slate-200 bg-white text-slate-400'}`}>
                    <span>{month.shortMonth}</span>
                    <span className="text-[8px] opacity-60">{month.year}</span>
                  </div>
                  <h2 className="serif text-2xl font-bold text-navy-950">{month.month}</h2>
                </FadeIn>

                <div className="space-y-3 pl-14">
                  {month.events.map(event => {
                    const past = !event.upcoming;
                    const isActive = activeEventId === event.id;

                    return (
                      <div key={event.id}>
                        <button
                          onClick={() => setActiveEventId(previous => previous === event.id ? null : event.id)}
                          aria-expanded={isActive}
                          className={`w-full rounded-2xl border text-left transition-all duration-300 ${isActive
                            ? 'scale-[1.02] border-navy-950 bg-navy-950 shadow-xl shadow-navy-950/15'
                            : past
                              ? 'border-slate-100 bg-white hover:scale-[1.015] hover:border-navy-200 hover:shadow-xl hover:shadow-navy-950/8'
                              : 'border-teal-200 bg-teal-50/50 hover:scale-[1.015] hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/15'
                          }`}
                        >
                          <div className="flex items-start gap-4 p-5">
                            <div className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${typeDot[event.type]}`} />

                            <div className="min-w-0 flex-1">
                              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${isActive ? 'border-navy-700 bg-navy-800 text-navy-200' : typeAccent[event.type]}`}>
                                  {event.category}{event.subPillar ? ` · ${event.subPillar}` : ''}
                                </span>
                                {!past && <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${isActive ? 'text-teal-300' : 'text-teal-600'}`}>Upcoming</span>}
                              </div>
                              <h3 className={`serif text-lg font-bold leading-snug ${isActive ? 'text-white' : 'text-navy-950'}`}>{event.title}</h3>
                              <p className={`mt-1 text-xs ${isActive ? 'text-navy-300' : 'text-slate-400'}`}>{event.date} <span className="px-1">·</span> {event.location}</p>
                            </div>

                            <svg className={`mt-1 h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isActive ? 'rotate-180 text-navy-300' : 'text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                            </svg>
                          </div>
                        </button>

                        {isActive && (
                          <div className="mt-2 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                            <div className="mb-4 flex flex-wrap gap-4 border-b border-slate-100 pb-4 text-xs text-slate-500">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                            </div>

                            <p className="mb-5 text-sm leading-relaxed text-slate-600">{event.description}</p>

                            {event.speakers && event.speakers.length > 0 && (
                              <div className="mb-5">
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">Speakers</p>
                                <div className="flex flex-wrap gap-2">
                                  {event.speakers.map(speaker => (
                                    <span key={speaker} className="rounded-full border border-navy-100 bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-700">{speaker}</span>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3">
                              {event.registerUrl && !past && <a href={event.registerUrl} className="rounded-xl bg-navy-950 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-navy-800">Register now <span aria-hidden="true">→</span></a>}
                              {event.slug && <Link to={`/xposure/${event.slug}`} className="rounded-xl border border-navy-200 px-5 py-2.5 text-xs font-bold text-navy-950 transition-colors hover:bg-navy-50">Read article <span aria-hidden="true">→</span></Link>}
                              {past && !event.slug && <span className="self-center text-xs italic text-slate-400">Event has concluded</span>}
                              {!past && !event.registerUrl && <span className="self-center text-xs italic text-slate-400">Registration opens soon</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
        </>}
      </div>

      <section className="grain-bg cta-section px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-teal-400">Stay in the loop</p>
          <h2 className="serif mb-4 text-4xl font-bold text-white">Stay updated</h2>
          <p className="mb-8 text-navy-200">Join our Telegram channel for first access to event registration and programme updates.</p>
          <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-navy-950 transition-colors hover:bg-navy-50">Join Telegram <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </div>
  );
}
