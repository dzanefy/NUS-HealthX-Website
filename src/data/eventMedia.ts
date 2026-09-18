const xeminarOneImages = 'https://xtwnqhnieobozjctwifp.supabase.co/storage/v1/object/public/event-images/xeminar-1';

// Supabase-hosted defaults for sheet-managed events. Sheet image URLs take priority.
const eventMedia: Record<string, { cover: string; article: string[] }> = {
  'EVT-001': {
    cover: `${xeminarOneImages}/L1020406.JPG`,
    article: [`${xeminarOneImages}/L1020409.JPG`, `${xeminarOneImages}/L1020374.JPG`],
  },
};

export default eventMedia;
