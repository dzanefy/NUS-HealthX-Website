import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useEvents } from '../hooks/useEvents';
import FadeIn from '../components/FadeIn';

/* Maps event slugs to a second editorial image (different crop/angle) */
const editorialImages: Record<string, string> = {
  'ai-healthcare-masterclass':
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=900&h=550&fit=crop&auto=format',
  'medtech-business-masterclass':
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=550&fit=crop&auto=format',
  'bci-workshop':
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=550&fit=crop&auto=format',
  'nus-kcl-challenge':
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&h=550&fit=crop&auto=format',
  'design-for-medicine':
    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&h=550&fit=crop&auto=format',
};

const fallbackEditorial =
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&h=550&fit=crop&auto=format';

function ArticleImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <p className="my-10 text-sm text-slate-500" role="status">Event photo is currently unavailable.</p>;
  return <figure className="my-10">
    <div className="overflow-hidden rounded-2xl border border-navy-100 bg-slate-50">
      <img src={src} alt={`${title} event photo`} loading="lazy" onError={() => setFailed(true)} className="mx-auto max-h-[640px] w-full object-contain" />
    </div>
  </figure>;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { events: xposureEvents, loading, error, retry } = useEvents();
  const event = xposureEvents.find(e => e.slug === slug);

  if (loading) return <div role="status" className="min-h-[60vh] px-6 pt-40 text-center">Loading event…</div>;
  if (error) return <div role="alert" className="min-h-[60vh] px-6 pt-40 text-center">We couldn’t load this event. <button onClick={retry} className="underline">Try again</button></div>;

  if (!event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="serif text-8xl font-bold text-slate-100 mb-4">404</p>
          <p className="text-slate-500 mb-6">This event could not be found.</p>
          <Link to="/xposure" className="text-sm font-bold text-navy-950 underline underline-offset-4">
            ← Back to events
          </Link>
        </div>
      </div>
    );
  }

  const related = xposureEvents.filter(e => e.slug !== slug).slice(0, 3);
  const inlineImage = event.slug.startsWith('event-')
    ? event.articleImageUrl
    : editorialImages[event.slug] ?? fallbackEditorial;

  /* Split body: intro paragraphs, pull-quote source, inline image zone, rest */
  const [firstPara, secondPara, ...restParas] = event.body;
  const pullQuote = secondPara && !event.slug.startsWith('event-')
    ? secondPara.split('.').filter(s => s.trim().length > 40)[0]?.trim() + '.'
    : null;
  const midParas = restParas.slice(0, Math.ceil(restParas.length / 2));
  const tailParas = restParas.slice(Math.ceil(restParas.length / 2));

  return (
    <div className="bg-white">

      {/* Compact event heading; thumbnail placeholders belong on listing cards. */}
      <section className="grain-bg relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-12">
          <Link
            to="/xposure"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-400 hover:text-teal-400 transition-colors mb-8 uppercase tracking-widest"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Health X&apos;posure
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {event.tags.map(tag => (
              <span key={tag} className="text-xs font-bold text-teal-400 bg-teal-950/40 px-3 py-1 rounded-full border border-teal-800/40">
                {tag}
              </span>
            ))}
            {event.upcoming && (
              <span className="text-xs font-bold text-white bg-teal-600 px-3 py-1 rounded-full">Upcoming</span>
            )}
          </div>

          <h1 className="serif text-[clamp(32px,5vw,60px)] font-bold text-white leading-tight mb-6">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-sm text-navy-300">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {event.shortDate}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {event.location}
            </span>
            {event.speakers.length > 0 && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.speakers.map(s => s.name).join(', ')}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── ARTICLE + SIDEBAR ── */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_300px] gap-14 items-start">

        {/* ── ARTICLE BODY ── */}
        <article>

          {/* Excerpt / lede */}
          <FadeIn>
            <p className="serif text-2xl font-medium text-navy-800 leading-relaxed mb-8 italic border-l-4 border-teal-400 pl-6">
              {event.excerpt}
            </p>
          </FadeIn>

          {/* First paragraph with drop cap */}
          {firstPara && (
            <FadeIn delay={80}>
            <p className="text-slate-700 leading-relaxed mb-6 text-[1.0625rem]">
              <span className="serif float-left text-6xl font-bold text-navy-950 leading-[0.75] mr-3 mt-1.5">
                {firstPara[0]}
              </span>
              {firstPara.slice(1)}
            </p>
            </FadeIn>
          )}

          {/* Second paragraph */}
          {secondPara && (
            <p className="text-slate-600 leading-relaxed mb-8 text-[1.0625rem]">{secondPara}</p>
          )}

          {/* Pull quote */}
          {pullQuote && (
            <figure className="my-10 mx-0 bg-navy-950 rounded-2xl p-8">
              <svg className="w-8 h-8 text-teal-400 mb-4 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="serif text-xl font-bold text-white leading-relaxed mb-4">
                {pullQuote}
              </blockquote>
              {event.speakers.length > 0 && (
                <figcaption className="text-teal-400 text-sm font-semibold">
                  {event.speakers[0].name}, {event.speakers[0].affiliation}
                </figcaption>
              )}
            </figure>
          )}

          {/* Mid paragraphs */}
          <div className="space-y-5 mb-10">
            {midParas.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-[1.0625rem]">{p}</p>
            ))}
          </div>

          {/* Inline editorial image */}
          {inlineImage && <ArticleImage key={inlineImage} src={inlineImage} title={event.title} />}

          {/* Tail paragraphs */}
          <div className="space-y-5 mb-12">
            {tailParas.map((p, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-[1.0625rem]">{p}</p>
            ))}
          </div>

          {event.acknowledgements && <section className="mb-8 border-t border-slate-100 pt-6"><h2 className="serif mb-3 text-2xl text-navy-950">Acknowledgements</h2><p className="whitespace-pre-line text-slate-600">{event.acknowledgements}</p></section>}
          {/* Tags */}
          <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300 self-center mr-2">Tags</span>
            {event.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold text-navy-700 bg-navy-50 border border-navy-100 px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-5 lg:sticky lg:top-24">

          {/* Speakers */}
          {event.speakers.length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">
                {event.speakers.length === 1 ? 'Speaker' : 'Speakers'}
              </p>
              <ul className="space-y-5">
                {event.speakers.map(s => (
                  <li key={s.name} className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center text-navy-950 text-xs font-bold flex-shrink-0 serif">
                      {s.name.split(' ').slice(-1)[0][0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-950 leading-tight">{s.name}</p>
                      <p className="text-xs text-slate-500 leading-snug mt-0.5">{s.title}</p>
                      <p className="text-xs text-teal-600 font-semibold mt-1">{s.affiliation}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Event details card */}
          <div className="bg-navy-950 rounded-2xl p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-navy-500 mb-5">Event Details</p>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs text-navy-500 mb-1">Date</dt>
                <dd className="text-sm font-semibold text-white">{event.shortDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-navy-500 mb-1">Location</dt>
                <dd className="text-sm text-navy-200 leading-snug">{event.location}</dd>
              </div>
              <div>
                <dt className="text-xs text-navy-500 mb-1">Programme</dt>
                <dd className="text-sm text-navy-200">Health X&apos;posure</dd>
              </div>
            </dl>

            {event.upcoming && event.registerUrl && (
              <a
                href={event.registerUrl}
                className="mt-6 w-full block text-center py-3 bg-teal-500 hover:bg-teal-400 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Register Now →
              </a>
            )}
          </div>

          {/* Share / back */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-3">Share</p>
            <div className="flex gap-2">
              {['LinkedIn', 'Telegram', 'Copy link'].map(s => (
                <button
                  key={s}
                  className="flex-1 text-xs font-bold text-slate-500 hover:text-navy-950 border border-slate-200 hover:border-navy-300 py-2 rounded-lg transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/xposure"
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-navy-950 transition-colors px-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All events
          </Link>
        </aside>
      </div>

      {/* ── MORE EVENTS ── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="flex items-end justify-between mb-8">
            <h2 className="serif text-3xl font-bold text-navy-950">More events</h2>
            <Link to="/xposure" className="text-sm font-bold text-navy-400 hover:text-navy-950 transition-colors">
              View all →
            </Link>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((e, i) => (
              <FadeIn key={e.id} delay={i * 80}>
              <Link
                to={`/xposure/${e.slug}`}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-navy-200 hover:shadow-lg overflow-hidden transition-all"
              >
                <div className="aspect-[16/9] overflow-hidden bg-navy-50">
                  <img
                    src={e.thumbnail}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-teal-600 font-bold uppercase tracking-widest mb-1">{e.shortDate}</p>
                  <h3 className="serif text-base font-bold text-navy-950 group-hover:text-teal-700 transition-colors leading-snug">
                    {e.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{e.excerpt}</p>
                </div>
              </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
