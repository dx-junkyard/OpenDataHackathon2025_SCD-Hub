'use client';
import { useEffect, ReactNode } from 'react';

type Props = { open: boolean; onClose: () => void; title?: string; children: ReactNode };

export function Dialog({ open, onClose, title, children }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white p-4 rounded-xl w-11/12 max-w-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 id="dialog-title" className="text-lg mb-2">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
