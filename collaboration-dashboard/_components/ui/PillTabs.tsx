type Props = { items: string[]; value: string; onChange: (v: string) => void };

export function PillTabs({ items, value, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {items.map((it) => (
        <button
          key={it}
          className={`px-3 py-1 rounded-full border text-sm ${value === it ? 'bg-sky-700 text-white border-sky-700' : 'bg-white border-slate-300'}`}
          onClick={() => onChange(it)}
        >
          {it}
        </button>
      ))}
    </div>
  );
}
