import { ReactNode } from 'react';

export function Card({
  children,
  className = '',
  onClick
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`bg-white border rounded-xl p-4 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
