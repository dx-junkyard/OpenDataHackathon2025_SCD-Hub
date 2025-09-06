'use client';
import { useState } from 'react';
import { IssueList } from '@/_components/issue/IssueList';
import { useAppStore } from '@/_store/useAppStore';

export default function IssuesPage() {
  const saveIssue = useAppStore((s) => s.saveIssue);
  const [form, setForm] = useState({
    title: '',
    target: '',
    area: '',
    evidence: '',
    kpi: '',
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
      evidence: form.evidence,
      kpis: form.kpi ? [form.kpi] : [],
      impact: form.impact,
      feasible: form.feasible,
      communityId: null
    });
    setForm({ title: '', target: '', area: '', evidence: '', kpi: '', impact: 1, feasible: 1 });
  };
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">課題</h1>
      <IssueList />
      <div className="mt-4 space-y-2">
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
        <input
          value={form.evidence}
          onChange={(e) => setForm({ ...form, evidence: e.target.value })}
          placeholder="証拠"
          className="w-full border rounded p-2"
        />
        <input
          value={form.kpi}
          onChange={(e) => setForm({ ...form, kpi: e.target.value })}
          placeholder="KPI"
          className="w-full border rounded p-2"
        />
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            max={5}
            value={form.impact}
            onChange={(e) => setForm({ ...form, impact: Number(e.target.value) })}
            className="border rounded p-2 w-full"
            placeholder="Impact"
          />
          <input
            type="number"
            min={1}
            max={5}
            value={form.feasible}
            onChange={(e) => setForm({ ...form, feasible: Number(e.target.value) })}
            className="border rounded p-2 w-full"
            placeholder="Feasible"
          />
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          課題カード作成
        </button>
      </div>
    </main>
  );
}
