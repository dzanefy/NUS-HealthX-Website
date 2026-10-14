import { Link } from 'react-router';
import FadeIn from '../components/FadeIn';
import { InitiativeHero, InitiativeSectionHeader } from './InitiativePage';

export default function Xcelerate() {
  return (
    <div className="bg-white">
      <InitiativeHero
        eyebrow="MedTech internships"
        title="X'ccelerate"
        description="Connecting student interests with internship opportunities in MedTech and healthcare innovation."
        ctaLabel="Apply now"
        ctaHref="/xcelerate/apply"
      />
      <section id="content" className="px-6 py-24">
        <FadeIn className="mx-auto max-w-4xl">
          <InitiativeSectionHeader eyebrow="About the programme" title="What is X’ccelerate?" />
          <div className="space-y-5 text-lg leading-relaxed text-slate-600">
            <p>
              X’ccelerate is HealthX’s initiative to connect NUS students with MedTech companies and internship opportunities. It aims to help students explore how their skills and interests can contribute to healthcare innovation in a professional setting.
            </p>
            <p>
              The programme’s focus is on connecting student backgrounds, interests, and availability with opportunity requirements. Students can start by submitting their details and résumé through the application form.
            </p>
          </div>
        </FadeIn>
      </section>
      <section className="bg-slate-50 px-6 py-24">
        <FadeIn className="mx-auto max-w-4xl">
          <InitiativeSectionHeader eyebrow="Applications" title="Tell us about your interests" />
          <div className="initiative-card p-8 md:p-10">
            <p className="mb-6 leading-relaxed text-slate-600">
              The application form collects your school, major, year of study, relevant experience, sectors of interest, interview availability, and PDF résumé.
            </p>
            <Link to="/xcelerate/apply" className="inline-flex items-center gap-3 rounded-full bg-navy-950 px-6 py-3 text-sm font-bold text-white hover:bg-navy-800">
              Complete application <span aria-hidden="true">→</span>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
