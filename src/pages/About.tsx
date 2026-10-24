import FadeIn from '../components/FadeIn';
import { aboutPhoto, communityPhotos } from '../data/communityPhotos';
import block71Logo from '../assets/partners/block71.png';
import kclLogo from '../assets/partners/kings-college-london.png';
import keioNusLogo from '../assets/partners/keio-nus.png';
import nuhsLogo from '../assets/partners/nuhs.png';
import nusComputingLogo from '../assets/partners/nus-computing.jpg';
import nusMedicineLogo from '../assets/partners/nus-medicine.png';

const gaps = [
  { gap: 'Fragmented Exposure', problem: 'Students are unsure where to begin or which opportunities are credible and suitable for their level of experience.', pillar: "Health X'posure", solution: "The ecosystem's matching platform, connecting people, capabilities and opportunities to foster meaningful collaborations and sustained innovation." },
  { gap: 'Capability Gap', problem: 'Students often lack access to structured, scalable training in the core competencies required for healthcare innovation, including clinical validation, stakeholder engagement, regulatory pathways, research design and implementation planning.', pillar: "Health X'perience", solution: 'A force-multiplier for existing grants and competitions, building the foundational competencies students need to participate confidently in healthcare innovation.' },
  { gap: 'Access Gap', problem: 'Students have limited opportunities and alternative pathways to gain meaningful exposure to MedTech beyond hackathons and self-initiated initiatives.', pillar: "Health X'ccelerate", solution: 'A bridge into the healthcare innovation ecosystem, connecting students to real problems, people and opportunities.' },
];

const pillars = [
  { name: "Health X'posure", tag: 'Opening minds to the possibilities within healthcare', desc: 'A MedTech exposure programme to kickstart innovation through building networks and knowledge. It includes Xeminars, Fireside Chats, Masterclasses such as Coding for Medicine, and MatchX for hackathon team matching.' },
  { name: "Health X'perience", tag: 'Helping ideas develop into credible, actionable projects', desc: 'A MedTech training programme on the basic grammar of healthcare innovation, equipping students to identify real clinical problems, frame them properly and work with multiple stakeholders. It offers a Beginner Pathway and an Advanced Pathway (Grant Launchpad).' },
  { name: "Health X'perts", tag: 'Making mentorship, guidance and expertise more accessible', desc: 'A MedTech mentorship and expert engagement programme connecting students with clinicians, researchers, entrepreneurs and industry professionals through four annual intake windows, with each mentorship cycle lasting about three months.' },
  { name: "Health X'ccelerate", tag: 'Translating innovation to real-world applications', isNew: true, desc: 'A MedTech attachment programme that funnels students into positions within startups and labs, so they experience the reality of translating innovation, and the challenges that come with it.' },
  { name: "Health X'change", tag: 'Connecting students across disciplines, institutions and borders', isNew: true, desc: 'An inter-university MedTech exchange and collaboration programme that brings together students from partner universities through exchange, networking and collaborative initiatives.' },
];

const faculties = ['Nursing', 'Medicine', 'Pharmacy', 'Dentistry', 'Science', 'Computing', 'Law', 'Business'];

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
              About us
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Founded in 2024, NUS HealthX is an NUS Registered Student Organisation. The core problem HealthX was founded to fix was that disconnected innovation was holding healthcare progress back.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Other institutions already exist to support and scale promising healthcare solutions. Nevertheless, the disparate and atomised nature of our healthcare innovation landscape meant that aspiring medical innovators lacked the network, competencies and exposure needed to reach the next level. Thus, HealthX was born.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our vision is to be an ecosystem where students, public healthcare institutions and innovation partners converge to develop the talent and solutions shaping the future of healthcare.
            </p>
          </FadeIn>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[3/2] bg-navy-50">
              <img
                src={aboutPhoto.src}
                srcSet={aboutPhoto.srcSet}
                sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1200px) calc((100vw - 112px) / 2), 544px"
                width={1600}
                height={1067}
                decoding="async"
                alt={aboutPhoto.caption}
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

      {/* ── MISSION & VISION ── */}
      <section className="grain-bg cta-section py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <FadeIn>
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">Our mission</p>
            <p className="serif text-2xl font-bold text-white leading-snug mb-4">To make healthcare innovation accessible by connecting students to people, problems, knowledge and pathways for action.</p>
            <p className="text-navy-200 text-sm leading-relaxed">We do not replace existing initiatives; we connect them. By bringing the right people, knowledge and opportunities together, we enable more collaboration, sustain more ideas and create lasting impact in healthcare.</p>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">Our vision</p>
            <p className="serif text-2xl font-bold text-white leading-snug mb-4">A generation of students equipped and empowered to innovate the future of healthcare.</p>
            <p className="text-navy-200 text-sm leading-relaxed">We envision a future where every student has the confidence, capabilities and opportunity to contribute to healthcare innovation, where curiosity becomes competence, collaboration sparks discovery, and ideas become solutions that improve lives.</p>
          </FadeIn>
        </div>
      </section>

      {/* ── THE GAP WE SEE ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">The gap we see</p>
            <h2 className="serif text-5xl font-bold text-navy-950 mb-4">Why promising ideas stall</h2>
            <p className="text-slate-600 leading-relaxed">Promising ideas, motivated students and multidisciplinary talent often fail to translate into sustained action. The challenge is not simply one of opportunity. It is one of continuity.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {gaps.map(({ gap, problem, pillar, solution }, i) => (
              <FadeIn key={gap} delay={i * 80}>
                <div className="h-full bg-white rounded-2xl border border-slate-100 p-8 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-950/5 transition-all">
                  <span className="serif text-5xl font-bold text-navy-100 block mb-4">0{i + 1}</span>
                  <h3 className="serif text-xl font-bold text-navy-950 mb-3">{gap}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{problem}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">Our answer: {pillar}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{solution}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="mt-10 max-w-3xl">
            <p className="text-slate-600 leading-relaxed">Students need a journey that does not end with a single event, but one that connects discovery with capability, capability with experience, and experience with meaningful contribution. HealthX was conceived to create a connected ecosystem that supports students at every stage of their MedTech innovation journey.</p>
          </FadeIn>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">Who we serve</p>
            <h2 className="serif text-4xl font-bold text-navy-950 mb-5 leading-snug">Open to every faculty</h2>
            <p className="text-slate-600 leading-relaxed mb-4">NUS HealthX primarily provides programmes and opportunities for NUS students. We welcome and encourage participation by students from all faculties.</p>
            <p className="text-slate-600 leading-relaxed">Through collaboration with clinicians, researchers and institutional partners, we hope to foster an innovation ecosystem that actively solves problems and improves lives, ultimately benefiting patients and the community at large.</p>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="flex flex-wrap gap-3">
              {[...faculties, 'and more'].map(f => (
                <span key={f} className="text-sm font-semibold text-navy-700 bg-navy-50 border border-navy-100 px-4 py-2 rounded-full">{f}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="mb-14 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-3">What we do</p>
            <h2 className="serif text-5xl font-bold text-navy-950 mb-4">Our five pillars</h2>
            <p className="text-slate-600 leading-relaxed">Empowering future healthcare innovators. Our initiatives are purposefully organised as one continuous developmental pathway rather than a bundle of isolated programmes. Together, they form a complete pipeline for training and education in innovation thinking.</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map(({ name, tag, desc, isNew }, i) => (
              <FadeIn key={name} delay={i * 60}>
                <div className="h-full bg-white rounded-2xl border border-slate-100 p-8 hover:border-navy-200 hover:shadow-lg hover:shadow-navy-950/5 transition-all">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="serif text-xl font-bold text-navy-950">{name}</h3>
                    {isNew && <span className="rounded-full bg-teal-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">New</span>}
                  </div>
                  <p className="text-teal-600 text-sm font-semibold mb-3">{tag}</p>
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
            <p className="mb-12 text-xs font-bold uppercase tracking-[0.3em] text-navy-600">Our partners include</p>
          </FadeIn>
          <div className="partner-marquee">
            <div className="marquee-right flex w-max items-center gap-8 py-3 sm:gap-14">
              {[...partners, ...partners].map(({ name, image }, i) => (
                <div key={`${name}-${i}`} className="flex h-24 w-52 shrink-0 items-center justify-center px-3 sm:w-60">
                  <img src={image} alt={name} className="max-h-20 w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUPPORT ── */}
      <section className="px-6 pb-16">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-slate-600 leading-relaxed">HealthX receives local support from a network of healthcare, academic and innovation partners, including the National University Health System (NUHS), the NUS Yong Loo Lin School of Medicine, the NHG Centre for Healthcare Innovation and the National Youth Council. Internationally, we collaborate with student organisations and academic partners from institutions such as King&rsquo;s College London, Ludwig-Maximilian University and the Technical University of Munich.</p>
        </FadeIn>
      </section>

      {/* ── GALLERY ── */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
          {communityPhotos.map(({ src, caption }, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-navy-50">
                <img src={src} alt={caption} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── COLLABORATE ── */}
      <section className="grain-bg cta-section py-20 px-6 text-center">
        <FadeIn>
          <h2 className="serif text-4xl font-bold text-white mb-4">Collaborate with us</h2>
          <p className="text-navy-200 max-w-2xl mx-auto leading-relaxed mb-6">An invitation to students, clinicians, researchers, engineers, designers, policymakers and partners to build the future of healthcare together.</p>
          <a href="mailto:nus.healthx@gmail.com" className="text-teal-400 font-bold hover:text-white transition-colors">nus.healthx@gmail.com</a>
        </FadeIn>
      </section>
    </div>
  );
}
