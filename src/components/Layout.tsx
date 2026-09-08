import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router';

/* ── NUS HealthX logo ── */
function HealthXLogo({ white = false }: { white?: boolean }) {
  const ink = white ? '#ffffff' : '#0d2e6e';
  return (
    <svg viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-auto" aria-label="NUS HealthX">
      {/* The supplied HealthX mark: an open lower loop, raised arch, and detached square. */}
      <path d="M18 18H28V29H18A7 7 0 1 0 18 43H28V54H18A18 18 0 1 1 18 18Z" fill={ink}/>
      <path d="M18 29V18A17 17 0 0 1 52 18V29H42V18A7 7 0 0 0 28 18V29H18Z" fill={ink}/>
      <rect x="42" y="43" width="10" height="11" fill={ink}/>

      {/* NUS */}
      <text x="72" y="21" fontFamily="DM Sans, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2.5" fill={ink}>NUS</text>
      {/* HealthX */}
      <text x="70" y="47" fontFamily="DM Sans, sans-serif" fontSize="23" fontWeight="700" fill={ink}>HealthX</text>
    </svg>
  );
}

const initiativeLinks = [
  { to: '/xposure', label: "X'posure" },
  { to: '/xperience', label: "X'perience" },
  { to: '/xcelerate', label: "X'ccelerate" },
  { to: '/xperts', label: "X'perts" },
  { to: '/xchange', label: "X'change" },
];

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/our-team', label: 'Team' },
  { to: '/timeline', label: 'Timeline' },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [initiativesOpen, setInitiativesOpen] = useState(false);
  const [headerOnDark, setHeaderOnDark] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setInitiativesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const fn = () => {
      const header = headerRef.current;
      if (!header) return;

      const previousVisibility = header.style.visibility;
      header.style.visibility = 'hidden';
      const elementUnderHeader = document.elementFromPoint(window.innerWidth / 2, 8);
      header.style.visibility = previousVisibility;
      setHeaderOnDark(Boolean(elementUnderHeader?.closest('.grain-bg')));
    };

    fn();
    window.addEventListener('scroll', fn, { passive: true });
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('scroll', fn);
      window.removeEventListener('resize', fn);
    };
  }, [location.pathname]);

  const dark = headerOnDark;

  return (
    <div className="min-h-full flex flex-col">
      {/* ── Navbar ── */}
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-4 pt-3 transition-all duration-300 sm:px-6">
        <nav className={`mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 rounded-full border px-5 shadow-sm transition-all duration-300 sm:px-8 ${dark ? 'border-white/20 bg-white/10 text-white shadow-black/10 backdrop-blur-md' : 'border-slate-200/80 bg-white/80 text-navy-950 shadow-navy-950/5 backdrop-blur-md'}`}>
          <Link to="/" className="flex-shrink-0">
            <HealthXLogo white={dark} />
          </Link>

          {/* Pill navigation, desktop */}
          <ul className="hidden items-center gap-1 lg:flex">
            <li className="relative">
              <button
                type="button"
                aria-expanded={initiativesOpen}
                onClick={() => setInitiativesOpen(v => !v)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 ${dark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-slate-100 text-navy-950 hover:bg-slate-200'} ${initiativesOpen ? 'shadow-sm' : ''}`}
              >
                Initiatives
                <svg className={`w-3.5 h-3.5 transition-transform ${initiativesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {initiativesOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 rounded-2xl border border-navy-100 bg-white p-2 shadow-2xl shadow-navy-950/15">
                  {initiativeLinks.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${isActive ? 'bg-navy-950 text-white' : 'text-slate-600 hover:bg-navy-50 hover:text-navy-950'}`}
                    >
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </li>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${isActive
                      ? (dark ? 'bg-white/20 text-white shadow-sm' : 'bg-slate-200 text-navy-950 shadow-sm')
                      : (dark ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:text-navy-950 hover:bg-white')
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <a href="#" className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-colors lg:flex ${dark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-slate-100 text-navy-950 hover:bg-slate-200'}`}>
            Sign in
          </a>

          <button className={`lg:hidden p-2 ${dark ? 'text-white' : 'text-navy-950'}`} onClick={() => setOpen(v => !v)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </nav>

        {open && (
          <div className={`mx-1 mt-2 rounded-3xl border px-4 py-4 lg:hidden ${dark ? 'border-white/10 bg-[#020d1e]/90 text-white backdrop-blur-md' : 'border-slate-200 bg-white/95 text-navy-950'}`}>
            <div className="mb-2">
              <button
                type="button"
                aria-expanded={initiativesOpen}
                onClick={() => setInitiativesOpen(v => !v)}
                className={`flex w-full items-center justify-between rounded-full px-4 py-2.5 text-sm font-semibold ${dark ? 'bg-white/10 text-white' : 'bg-navy-50 text-navy-950'}`}
              >
                <span>Initiatives</span>
                <svg className={`w-4 h-4 transition-transform ${initiativesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {initiativesOpen && (
                <div className="mt-2 grid grid-cols-2 gap-2 pl-3">
                  {initiativeLinks.map(({ to, label }) => (
                    <NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-3 py-2.5 text-center text-sm font-semibold transition-colors ${isActive ? (dark ? 'bg-white text-navy-950' : 'bg-navy-950 text-white') : (dark ? 'bg-white/10 text-white/80' : 'bg-slate-100 text-slate-600')}`}>
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            <ul className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-semibold rounded-full text-center transition-colors ${isActive ? (dark ? 'bg-white text-navy-950' : 'bg-navy-950 text-white') : (dark ? 'bg-white/10 text-white/80' : 'bg-slate-100 text-slate-600')}`
                  }>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a href="#" className={`flex items-center justify-center rounded-full py-3 text-sm font-bold ${dark ? 'bg-white text-navy-950' : 'bg-slate-100 text-navy-950'}`}>Sign in</a>
          </div>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      {/* ── Footer ── */}
      <footer className="grain-bg site-footer overflow-hidden">
        {/* Big brand text */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-4">
          <p className="text-[clamp(56px,10vw,140px)] font-black text-white/8 leading-none select-none whitespace-nowrap">
            NUS HealthX
          </p>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <HealthXLogo white />
              <p className="text-slate-400 text-sm leading-relaxed mt-5 max-w-xs">
                A student-led healthcare innovation initiative at the National University of Singapore, bringing future leaders together to solve real clinical challenges.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Telegram" className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white transition-colors flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-5">Pages</h3>
              <ul className="space-y-3">
                {[
                  { to: '/about', label: 'About' },
                  { to: '/xposure', label: "Health X'posure" },
                  { to: '/xperience', label: "Health X'perience" },
                  { to: '/xcelerate', label: "Health X'ccelerate" },
                  { to: '/xperts', label: "Health X'perts" },
                  { to: '/xchange', label: "Health X'change" },
                  { to: '/our-team', label: 'Our Team' },
                  { to: '/mentors', label: 'Our Mentors' },
                  { to: '/timeline', label: 'Timeline' },
                ].map(({ to, label }) => (
                  <li key={to}><Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-5">Connect</h3>
              <ul className="space-y-3">
                {['LinkedIn', 'Instagram', 'Telegram', 'Email us'].map(s => (
                  <li key={s}><a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/8 max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2">
            <p className="text-xs text-slate-600">© 2026 NUS HealthX. All rights reserved.</p>
            <p className="text-xs text-slate-600">NUS Registered Student Organisation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
