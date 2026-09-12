import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { xposureEvents, type XPosureEvent } from '../data/events';

// Local content remains available in environments without a database connection.
export function useEvents() {
  const [events, setEvents] = useState<XPosureEvent[]>(supabase ? [] : xposureEvents);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!supabase) return;
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    async function load() {
      try {
        const { data, error: queryError } = await supabase!
          .from('events')
          .select('id,title,summary,description,speakers,acknowledgements,event_date,event_time,location,image_url,article_image_url,registration_url,is_upcoming')
          .eq('status', 'Published')
          .order('event_date', { ascending: false, nullsFirst: false })
          .abortSignal(controller.signal);
        if (controller.signal.aborted) return;
        if (queryError) throw queryError;
        setEvents((data ?? []).map(row => ({
          id: String(row.id),
          slug: `event-${row.id}`,
          title: row.title,
          shortDate: [row.event_date ? new Date(`${row.event_date}T12:00:00`).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date to be confirmed', row.event_time].filter(Boolean).join(' · '),
          dateISO: row.event_date ?? '',
          location: row.location || 'Location to be confirmed',
          thumbnail: safeUrl(row.image_url) ?? '/event-placeholder.svg',
          articleImageUrl: safeUrl(row.article_image_url),
          excerpt: row.summary || '',
          body: row.description ? row.description.split(/\n\s*\n/) : [],
          speakers: Array.isArray(row.speakers) ? row.speakers.filter((s: unknown): s is { name: string; title: string; affiliation: string } => {
            if (!s || typeof s !== 'object') return false;
            return 'name' in s && typeof s.name === 'string' && 'title' in s && typeof s.title === 'string' && 'affiliation' in s && typeof s.affiliation === 'string';
          }) : [],
          acknowledgements: row.acknowledgements || '',
          tags: [],
          registerUrl: safeUrl(row.registration_url),
          upcoming: Boolean(row.is_upcoming),
        })));
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [attempt]);

  return { events, loading, error, retry: () => setAttempt(value => value + 1) };
}

function safeUrl(value: string | null): string | undefined {
  if (!value) return;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : undefined;
  } catch { return; }
}
