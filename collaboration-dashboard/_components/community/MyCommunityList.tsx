'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';
import { Community } from '@/_types';
import Link from 'next/link';

export { Card } from '@/_components/ui/Card';

export function MyCommunityList({ onSelect }: { onSelect: (community: Community) => void }) {
  const communities = useAppStore((s) => s.communities);
  const my = useAppStore((s) => s.myCommunities);
  const list = communities.filter((c) => my.includes(c.id));
  if (list.length === 0) {
    return (
      <div className="mt-4 text-center space-y-2">
        <div>参加中のコミュニティはありません</div>
        <Link href="/community/join" className="text-primary underline">
          コミュニティに参加する
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-2 mt-4">
      {list.map((c) => (
        <Card key={c.id}>
          <button className="w-full text-left" onClick={() => onSelect(c)}>
            <div className="font-semibold">{c.name}</div>
            <div className="text-sm text-slate-600">メンバー {c.members}</div>
          </button>
        </Card>
      ))}
    </div>
  );
}
