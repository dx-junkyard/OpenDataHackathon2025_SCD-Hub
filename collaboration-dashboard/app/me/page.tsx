'use client';
import { useAppStore } from '@/_store/useAppStore';

export default function MePage() {
  const my = useAppStore((s) => s.myCommunities);
  const issueCount = useAppStore((s) => s.issues.length);
  const threadCount = useAppStore((s) =>
    Object.values(s.threads).reduce((acc, t) => acc + t.length, 0)
  );
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">私のページ</h1>
      <div className="space-y-1 text-sm">
        <div>参加コミュニティ: {my.join(', ')}</div>
        <div>スレッド数: {threadCount}</div>
        <div>課題数: {issueCount}</div>
      </div>
    </main>
  );
}
