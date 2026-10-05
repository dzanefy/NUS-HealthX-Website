import { mentors } from '../src/data/mentors.ts';
import validateXperts from '../shared/xperts-validation.mjs';
import type { IncomingMessage, ServerResponse } from 'node:http';

const mentorNames = Object.fromEntries(mentors.map(m => [m.id, m.name]));

export default async function submitXperts(req: IncomingMessage & { body?: unknown }, res: ServerResponse, env = process.env) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const reply = (status: number, body: object) => { res.statusCode = status; res.end(JSON.stringify(body)); };
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, { error: 'Method not allowed.' }); }
  let body = req.body;
  try {
    if (body === undefined) {
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of req) {
        size += Buffer.byteLength(chunk);
        if (size > 3_000_000) return reply(413, { error: 'Please use a PDF résumé up to 2 MB and keep your answers within the limits.' });
        chunks.push(Buffer.from(chunk));
      }
      body = Buffer.concat(chunks).toString('utf8');
    }
    if (typeof body === 'string') body = JSON.parse(body);
    if (JSON.stringify(body)?.length > 3_000_000) return reply(413, { error: 'Please use a PDF résumé up to 2 MB and keep your answers within the limits.' });
  } catch { return reply(400, { error: 'Invalid application.' }); }
  let application;
  try { application = validateXperts(body, mentorNames); }
  catch (error) { return reply(400, { error: error instanceof Error ? error.message : 'Invalid application.' }); }
  if (!env.XCELERATE_SCRIPT_URL || !env.XCELERATE_SCRIPT_SECRET) return reply(503, { error: 'Applications are not available yet. Please try again later.' });
  try {
    const upstream = await fetch(env.XCELERATE_SCRIPT_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...application, program: 'xperts', secret: env.XCELERATE_SCRIPT_SECRET }),
      signal: AbortSignal.timeout(25_000), redirect: 'follow',
    });
    if (!upstream.ok) throw new Error('Upstream unavailable');
    const result = await upstream.json();
    if (result.ok === true && result.id === application.id) return reply(200, { ok: true, id: result.id });
    if (result.invalid) return reply(400, { error: 'Please check your application and mentor choices.' });
    throw new Error('Save not confirmed');
  } catch {
    return reply(502, { error: 'We could not confirm your application was saved. Please retry this form; retrying will not create a duplicate.' });
  }
}
