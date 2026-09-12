import { useState } from 'react';

// Only Google-hosted published forms can be embedded. Short links still open normally.
function googleFormEmbed(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'docs.google.com' || !/^\/forms\/d\/(?:e\/)?[A-Za-z0-9_-]+\/viewform\/?$/.test(url.pathname)) return;
    url.search = '?embedded=true';
    url.hash = '';
    return url.href;
  } catch { return; }
}

export default function EventRegistration({ url, title }: { url: string; title: string }) {
  const [show, setShow] = useState(false);
  const embed = googleFormEmbed(url);
  return <section className="mt-10 rounded-2xl border border-navy-100 p-6">
    <h2 className="serif mb-4 text-2xl font-bold text-navy-950">Sign up</h2>
    <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy-950 underline">Open registration in a new tab ↗</a>
    {embed && <>
      <p className="mt-3 text-sm text-slate-600">You can also load the Google Form here. Your responses are handled by the form’s owner.</p>
      <button type="button" aria-expanded={show} onClick={() => setShow(!show)} className="mt-4 rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white">{show ? 'Hide form' : 'Load Google Form'}</button>
      {show && <iframe title={`Registration for ${title}`} src={embed} className="mt-5 h-[700px] w-full border-0" referrerPolicy="strict-origin-when-cross-origin" />}
    </>}
  </section>;
}
