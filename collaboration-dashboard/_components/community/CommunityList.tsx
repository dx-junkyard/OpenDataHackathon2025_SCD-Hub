'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';

export function CommunityList({ onJoin }: { onJoin: (id: string) => void }) {
  const communities = useAppStore((s) => s.communities);
  const my = useAppStore((s) => s.myCommunities);
  const list = communities.filter((c) => !my.includes(c.id));
  return (
    <div className="space-y-2 mt-4">
      {list.map((c) => (
        <Card key={c.id}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-slate-600">メンバー {c.members}</p>
            </div>
            <button className="btn btn-primary" onClick={() => onJoin(c.id)}>参加</button>
          </div>
        </Card>
      ))}
    </div>
  );
}
