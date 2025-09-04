import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white border rounded-xl p-4 shadow">{children}</div>;
}
