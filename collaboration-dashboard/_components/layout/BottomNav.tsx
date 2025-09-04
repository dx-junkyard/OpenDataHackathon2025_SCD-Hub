'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/news', label: 'News' },
  { href: '/community', label: 'Community' },
  { href: '/community/join', label: 'Join' },
  { href: '/issues', label: 'Issues' },
  { href: '/dash', label: 'Dash' },
  { href: '/me', label: 'Me' }
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t flex justify-around py-2">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className={`text-sm ${path.startsWith(it.href) ? 'text-sky-700' : 'text-slate-600'}`}>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
