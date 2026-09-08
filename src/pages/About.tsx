import FadeIn from '../components/FadeIn';
import block71Logo from '../assets/partners/block71.png';
import kclLogo from '../assets/partners/kings-college-london.png';
import keioNusLogo from '../assets/partners/keio-nus.png';
import nuhsLogo from '../assets/partners/nuhs.png';
import nusComputingLogo from '../assets/partners/nus-computing.jpg';
import nusMedicineLogo from '../assets/partners/nus-medicine.png';

const values = [
  { title: 'Interdisciplinary Collaboration', desc: 'The most impactful healthcare solutions emerge when diverse disciplines converge. Every programme is built around cross-faculty teamwork.' },
  { title: 'Peer-Led Learning', desc: 'We create spaces where students learn as much from each other as from expert mentors through sharings, workshops, and hands-on projects.' },
  { title: 'Real-World Impact', desc: 'We focus on tangible outcomes, including validated prototypes, launched ventures, and enduring networks that extend well beyond the walls of NUS.' },
];

const partners = [
  { name: 'NUS Computing', image: nusComputingLogo },
  { name: 'NUS Medicine', image: nusMedicineLogo },
  { name: "King's College London", image: kclLogo },
  { name: 'Block71', image: block71Logo },
  { name: 'NUHS', image: nuhsLogo },
  { name: 'Keio-NUS CUTE Center', image: keioNusLogo },
];

export default function About() {
  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="grain-bg py-32 px-6 text-center">
        <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">Who we are</p>
        <h1 className="serif text-[clamp(48px,8vw,96px)] font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Born from a belief that <em>healthcare needs everyone</em>
        </h1>
        <p className="text-navy-200 text-xl max-w-2xl mx-auto leading-relaxed">
          Reimagining healthcare through student-led collaboration at the National University of Singapore.
        </p>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="w-10 h-0.5 bg-teal-500 mb-6" />
            <h2 className="serif text-4xl font-bold text-navy-950 mb-5 leading-snug">
              Our story
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Established in 2024, HealthX was founded to empower multidisciplinary collaboration in student-led healthcare projects, and to bring together students from different disciplines to learn about medical innovation and co-create impactful healthcare solutions.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              We are rooted in student-led collaboration and have grown into a dynamic space where students from diverse disciplines unite around a shared purpose.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our events consistently emphasise peer learning, collaboration, and shared goals, fostering lasting relationships among students, clinicians, and industry experts.
            </p>
          </FadeIn>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy-50">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop&auto=format"
                alt="NUS HealthX team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-slate-100 shadow-xl rounded-2xl p-5">
              <p className="serif text-3xl font-bold text-navy-950">2024</p>
              <p className="text-xs text-slate-400 mt-0.5">Founded at NUS</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="grain-bg cta-section py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            { val: '>600', label: 'Students Engaged', sub: 'across all disciplines' },
            { val: '5+', label: 'Projects Incubated', sub: 'with real-world traction' },
            { val: '>100K', label: 'Digital Reach', sub: 'across our platforms' },
          ].map(({ val, label, sub }, i) => (
            <FadeIn key={label} delay={i * 80}>
              <p className="serif mb-2 text-5xl font-bold text-white" style={{ animation: `float ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}>{val}</p>
              <p className="text-navy-200 font-bold text-sm mb-1">{label}</p>
              <p className="text-slate-500 text-xs">{sub}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">What we stand for</p>
            <h2 className="serif text-5xl font-bold text-navy-950">Our values</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-slate-100 p-8 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-950/5 transition-all">
                <span className="serif text-5xl font-bold text-navy-100 block mb-4">0{i + 1}</span>
                <h3 className="serif text-xl font-bold text-navy-950 mb-3">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="overflow-hidden px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <FadeIn>
            <p className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-navy-600">Our partners and sponsors include</p>
          </FadeIn>
          <div className="partner-marquee">
            <div className="partner-marquee-track marquee-right flex w-max items-center gap-8 py-3 sm:gap-14">
              {[...partners, ...partners].map(({ name, image }, i) => (
                <div key={`${name}-${i}`} className="flex h-24 w-52 shrink-0 items-center justify-center px-3 sm:w-60">
                  <img src={image} alt={name} className="max-h-20 w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {[
            'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&auto=format',
            'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop&auto=format',
          ].map((src, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy-50">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
