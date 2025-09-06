'use client';
import { useState } from 'react';
import { PillTabs } from '@/_components/ui/PillTabs';
import { NewsList } from '@/_components/news/NewsList';
import { useAppStore } from '@/_store/useAppStore';
import { Dialog } from '@/_components/ui/Dialog';

const tags = ['all', '子育て', '観光', '移動', '安全'];

export default function NewsPage() {
  const [tag, setTag] = useState('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const news = useAppStore((s) => s.news);
  const detail = news.find((n) => n.id === openId);
  return (
    <main className="p-4">
      <PillTabs items={tags} value={tag} onChange={setTag} />
      <NewsList filter={tag} onOpenDetail={setOpenId} />
      <Dialog open={!!detail} onClose={() => setOpenId(null)} title={detail?.title}>
        {detail && (
          <div className="space-y-2 text-sm">
            <p>{detail.summary}</p>
            {detail.audience && <p>対象: {detail.audience}</p>}
            {detail.apply && <p>申込: {detail.apply}</p>}
            {detail.url && (
              <a href={detail.url} className="text-sky-700 underline">
                リンク
              </a>
            )}
          </div>
        )}
      </Dialog>
    </main>
  );
}
