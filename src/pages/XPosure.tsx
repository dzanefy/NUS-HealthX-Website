import { Link } from 'react-router';
import { useState } from 'react';
import EventFilters from '../components/EventFilters';
import { type XPosureEvent } from '../data/events';
import { useEvents } from '../hooks/useEvents';
import FadeIn from '../components/FadeIn';
import { InitiativeCta, InitiativeHero, InitiativeSectionHeader } from './InitiativePage';

function EventCard({ event, delay = 0 }: { event: XPosureEvent; delay?: number }) {
  return (
    <FadeIn delay={delay}>
      <article className="initiative-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/8">
        <div className="relative aspect-[16/9] overflow-hidden bg-navy-50">
          <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {event.upcoming && (
            <span className="absolute left-3 top-3 rounded-full bg-teal-500 px-2.5 py-1 text-xs font-bold text-white">Upcoming</span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="mb-3 text-xs font-bold text-navy-600">{event.category || 'Other'}{event.subPillar ? ` · ${event.subPillar}` : ''}</p>
          <p className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.shortDate}
          </p>
          <h3 className="serif mb-3 text-lg font-bold leading-snug text-navy-950">{event.title}</h3>
          <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">{event.excerpt}</p>
          {event.audience && <p className="mb-4 text-sm text-slate-600"><strong>Who it’s for:</strong> {event.audience}</p>}

          {event.speakers.length > 0 && (
            <div className="mb-4 border-t border-slate-100 pt-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">Speakers</p>
              {event.speakers.map(speaker => <p key={speaker.name} className="text-xs font-semibold text-navy-700">{speaker.name}</p>)}
            </div>
          )}

          <div className="mb-5 flex flex-wrap gap-1.5">
            {event.tags.map(tag => <span key={tag} className="rounded-full bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-600">{tag}</span>)}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to={`/xposure/${event.slug}`} className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-navy-950 transition-colors hover:text-teal-600">
              Read more
              <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {event.registerUrl && (
              <a href={event.registerUrl} className="rounded-full bg-navy-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-navy-800">Register</a>
            )}
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

export default function XPosure() {
  const { events: xposureEvents, loading, error, retry } = useEvents();
  const [category, setCategory] = useState('');
  const [subPillar, setSubPillar] = useState('');
  const [view, setView] = useState<'cards' | 'timeline'>('cards');
  const filtered = xposureEvents.filter(event => (!category || (event.category || 'Other') === category) && (!subPillar || event.subPillar === subPillar));
  const upcomingEvents = filtered.filter(event => event.upcoming).sort((a, b) => (a.dateISO || '9999').localeCompare(b.dateISO || '9999') || a.id.localeCompare(b.id));
  const pastEvents = filtered.filter(event => !event.upcoming).sort((a, b) => b.dateISO.localeCompare(a.dateISO) || a.id.localeCompare(b.id));
  // Spotlight follows the calendar automatically, without a separate content list.
  const spotlight = upcomingEvents[0] || pastEvents[0];

  return (
    <div className="bg-white">
      <InitiativeHero
        title="Health X'posure"
        description="Curiosity. Community. Collaboration"
        ctaLabel="Find Out about our next events"
        ctaHref="#upcoming-events"
      />

      <section id="content" className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 lg:gap-20">
          <FadeIn>
            <InitiativeSectionHeader eyebrow="About the programme" title="Meet the work behind healthcare innovation" />
            <div className="space-y-4 leading-relaxed text-slate-600">
              <p>
                X&apos;posure is HealthX&apos;s open programme for learning through direct contact with healthcare innovators. Each session gives students a closer look at a problem, a career, or a technology, with enough room for honest questions and useful conversations.
              </p>
              <p>
                Talks, workshops, and networking sessions are designed for people at different stages. Come to build context, find collaborators, or work out which part of healthcare innovation you want to explore next.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative overflow-hidden rounded-3xl border border-navy-100 bg-navy-50 shadow-sm">
              <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&auto=format" alt="Students attending a Health X'posure event" className="aspect-[4/3] h-full w-full object-cover" />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-navy-950/90 px-5 py-4 text-white backdrop-blur-sm">
                <p className="serif text-3xl font-bold">Learn together</p>
                <p className="mt-0.5 text-xs text-navy-200">Conversations, masterclasses and fellowships</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="upcoming-events" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <EventFilters category={category} subPillar={subPillar} onChange={(c, s) => { setCategory(c); setSubPillar(s); }} />
            <div className="flex gap-2" aria-label="Event view">
              {(['cards', 'timeline'] as const).map(mode => <button key={mode} aria-pressed={view === mode} onClick={() => setView(mode)} className={`rounded-full px-5 py-3 text-sm font-semibold ${view === mode ? 'bg-navy-950 text-white' : 'bg-white text-navy-950 border border-navy-100'}`}>{mode === 'cards' ? 'Browse events' : 'Upcoming timeline'}</button>)}
            </div>
          </div>
          {loading && <p role="status" className="mb-6 text-slate-500">Loading events…</p>}
          {error && <p role="alert" className="mb-6 text-slate-600">We couldn’t load events. <button onClick={retry} className="underline">Try again</button></p>}
          {!loading && !error && spotlight && <aside className="mb-12 rounded-3xl bg-navy-950 p-6 text-white md:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-teal-300">{spotlight.upcoming ? 'Next on the calendar' : 'Latest event highlight'}</p>
            <Link to={`/xposure/${spotlight.slug}`} className="serif text-3xl font-bold hover:underline">{spotlight.title}</Link>
            <p className="mt-3 text-sm text-white/90">{spotlight.shortDate} · {spotlight.location}</p>
          </aside>}
          <FadeIn>
            <InitiativeSectionHeader eyebrow="What is next" title="Upcoming events" />
          </FadeIn>
          {!loading && !error && upcomingEvents.length === 0 && <p className="text-slate-500">No upcoming events announced yet. Check back soon.</p>}
          {view === 'cards' ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => <EventCard key={event.id} event={event} delay={index * 80} />)}
          </div> : <ol className="ml-2 space-y-6 border-l-2 border-navy-100 pl-6">
            {upcomingEvents.map(event => <li key={event.id} className="relative rounded-2xl border border-navy-100 bg-white p-6">
              <span aria-hidden="true" className="absolute -left-[33px] top-8 h-4 w-4 rounded-full border-4 border-slate-50 bg-navy-600" />
              <p className="mb-2 text-sm font-bold text-navy-600">{event.shortDate}</p>
              <p className="mb-2 text-xs text-slate-500">{event.category || 'Other'}{event.subPillar ? ` · ${event.subPillar}` : ''}</p>
              <Link to={`/xposure/${event.slug}`} className="serif text-2xl font-bold text-navy-950 underline-offset-4 hover:underline">{event.title}</Link>
              <p className="mt-3 text-sm text-slate-600">{event.location}</p>
              <p className="mt-3 text-slate-600">{event.excerpt}</p>
            </li>)}
          </ol>}
        </div>
      </section>

      {view === 'cards' && <section id="events" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <InitiativeSectionHeader eyebrow="The archive" title="Past events" />
          </FadeIn>
          {!loading && !error && pastEvents.length === 0 && <p className="text-slate-500">No past events published yet.</p>}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, index) => <EventCard key={event.id} event={event} delay={index * 80} />)}
          </div>
        </div>
      </section>}

      <InitiativeCta
        title="Stay close to the conversation"
        description="Join the HealthX Telegram channel for upcoming event announcements, registration links, and community updates."
        ctaLabel="Join Telegram"
        href="#"
      />
    </div>
  );
}
