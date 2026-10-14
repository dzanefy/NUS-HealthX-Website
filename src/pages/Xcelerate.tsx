import { Link } from 'react-router';
import FadeIn from '../components/FadeIn';
import { InitiativeHero, InitiativeSectionHeader } from './InitiativePage';

export default function Xcelerate() {
  return (
    <div className="bg-white">
      <InitiativeHero
        eyebrow="Student applications"
        title="X'ccelerate"
        description="Share your background and interests through the HealthX X'ccelerate application form."
        ctaLabel="Apply now"
        ctaHref="/xcelerate/apply"
      />
      <section className="px-6 py-24">
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
