import { ReactNode } from 'react';

type Props = { children: ReactNode; onClick?: () => void; active?: boolean };

export function Chip({ children, onClick, active }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 text-xs rounded-full border ${active ? 'bg-sky-700 text-white border-sky-700' : 'bg-slate-100 text-slate-700 border-slate-300'}`}
    >
      {children}
    </button>
  );
}
