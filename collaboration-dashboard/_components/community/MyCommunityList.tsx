'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';
import { Community } from '@/_types';

export { Card } from '@/_components/ui/Card';

export function MyCommunityList({ onSelect }: { onSelect: (community: Community) => void }) {
  const communities = useAppStore((s) => s.communities);
  const my = useAppStore((s) => s.myCommunities);
  const list = communities.filter((c) => my.includes(c.id));
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
