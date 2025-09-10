'use client';
import { useAppStore } from '@/_store/useAppStore';
import { Card } from '@/_components/ui/Card';

export function IssueList({ communityId }: { communityId?: string }) {
  const issues = useAppStore((s) =>
    communityId ? s.issues.filter((i) => i.communityId === communityId) : s.issues
  );
  return (
    <div className="space-y-2 mt-4">
      {issues.map((i) => (
        <Card key={i.id}>
          <h3 className="font-semibold">{i.title}</h3>
          <p className="text-sm text-slate-600">Impact {i.impact} / Feasible {i.feasible}</p>
        </Card>
      ))}
    </div>
  );
}
