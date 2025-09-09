'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';
import { Chip } from '@/_components/ui/Chip';

export function NewsList({ filter, onOpenDetail }: { filter: string; onOpenDetail: (id: number) => void }) {
  const news = useAppStore((s) => s.news);
  const list = filter === 'all' ? news : news.filter((n) => n.tags.includes(filter));
  return (
    <div className="space-y-2 mt-4">
      {list.map((n) => (
        <Card key={n.id}>
          <h3 className="font-semibold">{n.title}</h3>
          <p className="text-sm">{n.summary}</p>
          <div className="mt-2 flex gap-1 flex-wrap">
            {n.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <button className="btn btn-primary mt-2" onClick={() => onOpenDetail(n.id)}>
            詳細
          </button>
        </Card>
      ))}
    </div>
  );
}
