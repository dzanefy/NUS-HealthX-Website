import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { mentors } from '../data/mentors';
import validateXperts from '../../shared/xperts-validation.mjs';

const mentorNames = Object.fromEntries(mentors.map(m => [m.id, m.name]));
const mentorOptions = [...mentors].sort((a, b) => a.name.localeCompare(b.name));
const inputClass = 'mt-2 w-full rounded-xl border border-navy-100 bg-white p-3 font-normal text-navy-950 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20';
type Choice = { key: number; id: string; reason: string };

export default function XpertsApply() {
  const [hasProject, setHasProject] = useState('');
  const [choices, setChoices] = useState<Choice[]>([{ key: 0, id: '', reason: '' }]);
  const nextKey = useRef(1);
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const applicationId = useRef(crypto.randomUUID());
  function updateChoice(key: number, change: Partial<Choice>) {
    setChoices(current => current.map(choice => choice.key === key ? { ...choice, ...change } : choice));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = new FormData(event.currentTarget);
    setError('');
    submitting.current = true;
    setBusy(true);
    try {
      const file = form.get('resume');
      let resume = null;
      if (file instanceof File && file.size > 0) {
        if (!/\.pdf$/i.test(file.name) || file.size > 2 * 1024 * 1024) throw new Error('Please upload a PDF résumé up to 2 MB.');
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result).split(',')[1]);
          reader.onerror = () => reject(new Error('Could not read your résumé. Please select it again.'));
          reader.readAsDataURL(file);
        });
        resume = { name: file.name, base64 };
      }
      const application = validateXperts({ ...Object.fromEntries(form), id: applicationId.current,
        hasProject, resume, choices: choices.map(({ id, reason }) => ({ id, reason })) }, mentorNames);
      const response = await fetch('/api/xperts', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application), signal: AbortSignal.timeout(35000) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true || result.id !== applicationId.current) throw new Error(result?.error || 'We could not confirm your application was saved. Please retry this form.');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error && err.name === 'Error' ? err.message : 'We could not confirm your application was saved. Please retry this form; retrying will not create a duplicate.');
    } finally { submitting.current = false; setBusy(false); }
  }
  if (sent) return <section className="grain-bg min-h-[65vh] px-6 py-32 text-center"><div className="mx-auto max-w-xl" role="status">
    <p className="mb-4 text-6xl text-teal-400" aria-hidden="true">✓</p>
    <h1 className="serif mb-5 text-5xl font-bold text-white">Application received</h1>
    <p className="leading-relaxed text-navy-200">Thank you for applying to X’perts. The HealthX team will review your interests and mentor preferences, then contact you about the next steps. Matches depend on mentor availability and fit.</p>
    <Link to="/mentors" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-950">Back to our mentors</Link>
  </div></section>;
  return <div className="bg-slate-50 px-6 py-16"><div className="mx-auto max-w-3xl">
    <Link to="/mentors" className="text-sm font-bold text-teal-700">← Meet our mentors</Link>
    <div className="mb-10 mt-8"><p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-teal-600">X’perts student application</p>
      <h1 className="serif text-5xl font-bold text-navy-950">Find guidance for your next step</h1>
      <p className="mt-4 leading-relaxed text-slate-600">Working on a project or just exploring healthcare innovation? Tell us what you hope to learn and choose up to three mentors you would like to work with.</p>
    </div>
    <form onSubmit={submit} className="space-y-7">
      <fieldset disabled={busy} className="space-y-7">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <section className="initiative-card p-6 sm:p-8" aria-labelledby="student-details">
          <h2 id="student-details" className="serif mb-6 text-2xl font-bold text-navy-950">About you</h2>
          <div className="grid gap-5 sm:grid-cols-2">{[
            ['name', 'Full name', 'text', 200], ['email', 'Email address', 'email', 254],
            ['school', 'School or institution', 'text', 200], ['year', 'Year of study', 'text', 100],
            ['major', 'Major or area of study', 'text', 200],
          ].map(([name, label, type, limit]) => <label key={String(name)} className="text-sm font-bold text-navy-950">{label}
            <input name={String(name)} type={String(type)} maxLength={Number(limit)} required className={inputClass} autoComplete={name === 'name' || name === 'email' ? String(name) : undefined} />
          </label>)}</div>
        </section>
        <section className="initiative-card p-6 sm:p-8" aria-labelledby="mentorship-goals">
          <h2 id="mentorship-goals" className="serif mb-6 text-2xl font-bold text-navy-950">What brings you here?</h2>
          <fieldset><legend className="mb-3 text-sm font-bold text-navy-950">Do you have a project you would like mentorship for?</legend>
            <div className="grid gap-3 sm:grid-cols-2">{[['yes', 'Yes, I have a project'], ['no', 'No project yet']].map(([value, label]) => <label key={value} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${hasProject === value ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-navy-100 text-navy-950'}`}>
              <input type="radio" name="hasProject" value={value} checked={hasProject === value} onChange={() => setHasProject(value)} required className="accent-teal-600" />{label}
            </label>)}</div>
          </fieldset>
          {hasProject === 'yes' && <div className="mt-6 space-y-5">
            <label className="block text-sm font-bold text-navy-950">Project title<input name="projectTitle" required maxLength={200} className={inputClass} /></label>
            <label className="block text-sm font-bold text-navy-950">Tell us about your project
              <textarea name="projectDescription" required maxLength={4000} rows={6} className={inputClass} placeholder="What problem are you working on, what stage are you at, and where would a mentor’s guidance help?" />
            </label>
          </div>}
          {hasProject === 'no' && <label className="mt-6 block text-sm font-bold text-navy-950">Why would you like a mentor?
            <textarea name="motivation" required maxLength={4000} rows={6} className={inputClass} placeholder="Share your interests, what you hope to learn, and the guidance you are looking for. You do not need a project to apply." />
          </label>}
        </section>
        <section className="initiative-card p-6 sm:p-8" aria-labelledby="mentor-choices">
          <h2 id="mentor-choices" className="serif text-2xl font-bold text-navy-950">Your mentor preferences</h2>
          <p className="mb-6 mt-3 text-sm leading-relaxed text-slate-600">Choose one to three different mentors in order of preference. Tell us why each mentor is a good fit. You can <Link to="/mentors" target="_blank" rel="noreferrer" className="font-semibold text-teal-700 underline">browse their profiles in a new tab</Link> while completing this form.</p>
          <div className="space-y-6">{choices.map((choice, index) => <fieldset key={choice.key} className="rounded-2xl border border-navy-100 p-5">
            <legend className="px-2 text-sm font-bold text-navy-950">Choice {index + 1}{index === 0 ? ' · First preference' : ''}</legend>
            <label className="block text-sm font-semibold text-navy-950">Mentor
              <select required value={choice.id} onChange={e => updateChoice(choice.key, { id: e.target.value })} className={inputClass}>
                <option value="">Select a mentor</option>
                {mentorOptions.map(mentor => <option key={mentor.id} value={mentor.id} disabled={choices.some(other => other.key !== choice.key && other.id === mentor.id)}>{mentor.name} — {mentor.affiliation}</option>)}
              </select>
            </label>
            <label className="mt-4 block text-sm font-semibold text-navy-950">Why this mentor?
              <textarea required value={choice.reason} onChange={e => updateChoice(choice.key, { reason: e.target.value })} maxLength={2000} rows={3} className={inputClass} placeholder="How does their experience connect with your project, interests or learning goals?" />
            </label>
            {choices.length > 1 && <button type="button" onClick={() => setChoices(current => current.filter(item => item.key !== choice.key))} className="mt-3 text-sm font-semibold text-slate-600 underline" aria-label={`Remove mentor choice ${index + 1}`}>Remove choice</button>}
          </fieldset>)}</div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-slate-500" role="status">{choices.length} of 3 mentor choices</p>
            {choices.length < 3 && <button type="button" onClick={() => setChoices(current => [...current, { key: nextKey.current++, id: '', reason: '' }])} className="rounded-full border border-teal-700 px-5 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50">+ Add another mentor</button>}
          </div>
        </section>
        <section className="initiative-card p-6 sm:p-8">
          <label className="block text-sm font-bold text-navy-950">Résumé <span className="font-normal text-slate-500">(optional)</span>
            <input name="resume" type="file" accept=".pdf,application/pdf" className="mt-3 block w-full rounded-xl border border-dashed border-navy-200 bg-slate-50 p-4 font-normal" />
          </label>
          <p className="mt-2 text-sm text-slate-500">PDF only, up to 2 MB. You can apply without a résumé. If uploaded, the HealthX team will use it for application review.</p>
        </section>
      </fieldset>
      <p className="text-sm leading-relaxed text-slate-500">The HealthX team will use your details to review your application and arrange mentorship. Mentor preferences are requests; matches depend on availability and fit.</p>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={busy} className="rounded-full bg-navy-950 px-8 py-4 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60">{busy ? 'Submitting…' : 'Apply for mentorship →'}</button>
    </form>
  </div></div>;
}
