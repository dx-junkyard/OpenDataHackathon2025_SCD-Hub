'use client';
import { useState } from 'react';
import { IssueList } from '@/_components/issue/IssueList';
import { useAppStore } from '@/_store/useAppStore';
import { Dialog } from '@/_components/ui/Dialog';

export default function IssuesPage() {
  const saveIssue = useAppStore((s) => s.saveIssue);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    target: '',
    area: '',
    detail: '',
    evidence: '',
    kpis: [] as string[],
    impact: 1,
    feasible: 1
  });
  const handleSubmit = () => {
    if (!form.title) return;
    saveIssue({
      id: `i${Date.now()}`,
      title: form.title,
      target: form.target,
      area: form.area,
      detail: form.detail,
      evidence: form.evidence,
      kpis: form.kpis,
      impact: form.impact,
      feasible: form.feasible,
      communityId: null
    });
    setForm({ title: '', target: '', area: '', detail: '', evidence: '', kpis: [], impact: 1, feasible: 1 });
    setOpen(false);
  };
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">課題</h1>
      <IssueList />
      <button className="btn btn-primary mt-4" onClick={() => setOpen(true)}>
        新規課題作成
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} title="課題カード作成">
        <div className="space-y-2">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="タイトル"
            className="w-full border rounded p-2"
          />
          <input
            value={form.target}
            onChange={(e) => setForm({ ...form, target: e.target.value })}
            placeholder="ターゲット"
            className="w-full border rounded p-2"
          />
          <input
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            placeholder="エリア"
            className="w-full border rounded p-2"
          />
          <textarea
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
            placeholder="課題の詳細"
            rows={2}
            className="w-full border rounded p-2"
          />
          <input
            value={form.evidence}
            onChange={(e) => setForm({ ...form, evidence: e.target.value })}
            placeholder="証拠"
            className="w-full border rounded p-2"
          />
          <div>
            <div className="font-semibold">KPI</div>
            <div className="flex gap-2 mt-1">
              {['平均所要時間(分)', '満足度(点)'].map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`chip-btn ${form.kpis.includes(k) ? 'active' : ''}`}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      kpis: prev.kpis.includes(k)
                        ? prev.kpis.filter((x) => x !== k)
                        : [...prev.kpis, k]
                    }))
                  }
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            課題カード作成
          </button>
        </div>
      </Dialog>
    </main>
  );
}
