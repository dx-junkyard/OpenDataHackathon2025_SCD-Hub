'use client';
import { useAppStore } from '@/_store/useAppStore';
import { KpiCard } from '@/_components/dash/KpiCard';

export default function DashPage() {
  const dashboards = useAppStore((s) => s.dashboards);
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">ダッシュボード</h1>
      <div className="space-y-2">
        {dashboards.map((k) => (
          <KpiCard key={k.id} kpi={k} />
        ))}
      </div>
    </main>
  );
}
