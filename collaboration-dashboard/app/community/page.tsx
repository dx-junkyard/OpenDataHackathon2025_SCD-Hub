'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';
import { Community } from '@/_types';

export default function CommunityPage() {
  const communities = useAppStore((s) =>
    s.myCommunities
      .map((id) => s.communities.find((c) => c.id === id))
      .filter((c): c is Community => !!c)
  );
  const selected = useAppStore((s) => s.selectedCommunity);
  const selectCommunity = useAppStore((s) => s.selectCommunity);
  const leave = useAppStore((s) => s.leaveCommunity);

  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">コミュニティ</h1>
      <div className="space-y-2">
        {communities.map((c) => (
          <Card
            key={c.id}
            onClick={() => selectCommunity(c)}
            className={`cursor-pointer ${selected?.id === c.id ? 'border-primary' : ''}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-slate-600">メンバー {c.members}</p>
              </div>
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  leave(c.id);
                }}
              >
                退会
              </button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
