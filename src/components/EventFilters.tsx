export const eventCategories = ['Fireside Chats', 'Xeminars', 'Masterclasses', 'Case Study Fellowship', 'Research Fellowship', 'Other'] as const;

export default function EventFilters({ category, subPillar, onChange }: {
  category: string; subPillar: string; onChange: (category: string, subPillar: string) => void;
}) {
  return <div className="flex flex-wrap gap-4">
    <label className="flex flex-col gap-2 text-sm font-semibold text-navy-950">Event type
      <select value={category} onChange={e => onChange(e.target.value, '')} className="rounded-xl border border-navy-100 bg-white px-4 py-3">
        <option value="">All event types</option>
        {eventCategories.map(type => <option key={type}>{type}</option>)}
      </select>
    </label>
    {(!category || category === 'Masterclasses') && <label className="flex flex-col gap-2 text-sm font-semibold text-navy-950">Sub-pillar
      <select value={subPillar} onChange={e => onChange(e.target.value ? 'Masterclasses' : category, e.target.value)} className="rounded-xl border border-navy-100 bg-white px-4 py-3">
        <option value="">All sub-pillars</option><option>Coding for Medicine</option>
      </select>
    </label>}
  </div>;
}
