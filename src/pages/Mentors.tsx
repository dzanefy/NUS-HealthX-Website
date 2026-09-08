import { useState, useRef } from 'react';
import { mentors, type Mentor } from '../data/mentors';
import FadeIn from '../components/FadeIn';

function MentorCard({ mentor, isSelected, onClick }: { mentor: Mentor; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group text-left flex-shrink-0 w-60 rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-teal-500 shadow-2xl shadow-teal-500/20 scale-[1.02]' : 'hover:shadow-xl hover:shadow-navy-950/10 hover:-translate-y-1'}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-100">
        <img
          src={mentor.photo}
          alt={mentor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="serif text-base font-bold text-white leading-tight">{mentor.name}</p>
          <p className="text-xs text-teal-400 font-semibold mt-1">{mentor.affiliation}</p>
        </div>
      </div>
    </button>
  );
}

export default function Mentors() {
  const [selected, setSelected] = useState<Mentor | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 300 : -300, behavior: 'smooth' });
  }

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="grain-bg py-32 px-6 text-center">
        <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Guided by the best</p>
        <h1 className="serif text-[clamp(48px,8vw,96px)] font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">Our Mentors</h1>
        <p className="text-navy-200 text-xl max-w-2xl mx-auto leading-relaxed">
          A distinguished network of clinicians, entrepreneurs, and healthcare innovators who provide mentorship, expertise, and real-world perspective to HealthX members.
        </p>
      </section>

      {/* ── CAROUSEL ── */}
      <section className="pt-20 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Browse</p>
              <h2 className="serif text-4xl font-bold text-navy-950">Click a mentor to view their profile</h2>
            </FadeIn>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-navy-950 hover:border-navy-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-navy-950 hover:border-navy-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-6" style={{ scrollbarWidth: 'none' }}>
            {mentors.map(m => (
              <MentorCard key={m.id} mentor={m} isSelected={selected?.id === m.id} onClick={() => setSelected(prev => prev?.id === m.id ? null : m)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPANDED PROFILE ── */}
      {selected && (
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-navy-950/8 overflow-hidden">
              <div className="grid md:grid-cols-[320px_1fr]">
                {/* Photo */}
                <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden bg-navy-100">
                  <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover object-top"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                    <p className="serif text-xl font-bold text-white">{selected.name}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="serif text-3xl font-bold text-navy-950 mb-1">{selected.name}</h2>
                      <p className="text-slate-500 text-sm">{selected.title}</p>
                      <p className="text-teal-600 font-bold text-sm mt-1">{selected.affiliation}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-navy-950 transition-colors flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-3">Areas of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {selected.expertise.map(tag => (
                        <span key={tag} className="text-xs font-semibold text-navy-700 bg-navy-50 border border-navy-100 px-3 py-1.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-3">About</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{selected.bio}</p>
                  </div>

                  {selected.linkedIn && (
                    <a href={selected.linkedIn} className="inline-flex items-center gap-2 text-sm font-bold text-navy-950 hover:text-teal-600 transition-colors self-start">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      Connect on LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── GRID DIRECTORY ── */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Directory</p>
            <h2 className="serif text-4xl font-bold text-navy-950">All mentors</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {mentors.map((m, i) => (
              <FadeIn key={m.id} delay={i * 80}>
              <button
                key={m.id}
                onClick={() => {
                  setSelected(prev => prev?.id === m.id ? null : m);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group bg-white rounded-2xl border border-slate-100 hover:border-navy-200 hover:shadow-md transition-all text-left p-4 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-navy-50">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="min-w-0">
                  <p className="serif text-sm font-bold text-navy-950 truncate group-hover:text-teal-700 transition-colors">{m.name}</p>
                  <p className="text-xs text-teal-600 font-semibold mt-0.5 truncate">{m.affiliation}</p>
                </div>
              </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="grain-bg cta-section py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Join the network</p>
          <h2 className="serif text-5xl font-bold text-white mb-5">Become a mentor</h2>
          <p className="text-navy-200 leading-relaxed mb-8 max-w-md mx-auto">
            We are always looking to grow our network of clinicians, entrepreneurs, and industry experts passionate about nurturing the next generation of MedTech innovators.
          </p>
          <a href="mailto:healthx@nus.edu.sg" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-950 text-sm font-bold rounded-full hover:bg-navy-50 transition-colors">
            Get in touch →
          </a>
        </div>
      </section>
    </div>
  );
}
