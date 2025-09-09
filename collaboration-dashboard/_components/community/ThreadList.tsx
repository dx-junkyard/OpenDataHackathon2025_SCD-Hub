'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';

export function ThreadList({ communityId, onOpen }: { communityId: string; onOpen: (id: string) => void }) {
  const threads = useAppStore((s) => s.threads[communityId] || []);
  return (
    <div className="space-y-2 mt-4">
      {threads.map((t) => (
        <Card key={t.id}>
          <button className="w-full text-left" onClick={() => onOpen(t.id)}>
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-slate-600">{t.replies} replies</div>
          </button>
        </Card>
      ))}
    </div>
  );
}
