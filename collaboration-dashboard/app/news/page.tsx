'use client';
import { useState, useEffect } from 'react';
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
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    if (detail) {
      setMessages([{ role: 'ai', text: '気になる点や意見があれば教えてください' }]);
      setChatInput('');
    } else {
      setMessages([]);
    }
  }, [detail]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: chatInput },
      { role: 'ai', text: 'これはモックの応答です' },
    ]);
    setChatInput('');
  };
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
            <div className="mt-4 border-t pt-4">
              <h3 className="font-semibold mb-2">AIとチャット</h3>
              <div className="space-y-1 max-h-32 overflow-y-auto text-sm p-2 border rounded bg-slate-50">
                {messages.map((m, idx) => (
                  <div key={idx} className={m.role === 'user' ? 'text-right' : ''}>
                    {m.role === 'ai' ? 'AI: ' : 'あなた: '}
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="自由に入力してください"
                  className="flex-1 border rounded p-2"
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  送信
                </button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </main>
  );
}
