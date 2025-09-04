'use client';
import { DashboardKpi } from '@/_types';
import { useRef, useEffect } from 'react';
import { Card } from '@/_components/ui/Card';

export function KpiCard({ kpi }: { kpi: DashboardKpi }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    kpi.data.forEach((d, i) => {
      const x = (i / (kpi.data.length - 1)) * width;
      const y = height - (d / Math.max(...kpi.data)) * height;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#0369a1';
    ctx.stroke();
  }, [kpi]);
  return (
    <Card>
      <div className="font-semibold">{kpi.title}</div>
      <div className="text-sm">
        {kpi.current}
        {kpi.unit || ''} / {kpi.target}
        {kpi.unit || ''}
      </div>
      {kpi.note && <div className="text-xs text-slate-600">{kpi.note}</div>}
      <canvas ref={ref} width={200} height={40} className="mt-2 w-full" />
    </Card>
  );
}
