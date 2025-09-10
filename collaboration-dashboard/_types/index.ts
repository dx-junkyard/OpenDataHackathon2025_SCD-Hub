export type News = {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  audience?: string;
  apply?: string;
  url?: string;
};

export type Community = { id: string; name: string; members: number; hot: string };
export type Thread = { id: string; title: string; replies: number; communityId: string };
export type Message = { user: string; text: string; threadId: string };

export type Issue = {
  id: string;
  title: string;
  target?: string;
  area?: string;
  detail?: string;
  evidence?: string;
  kpis: string[];
  impact: number;
  feasible: number;
  communityId?: string | null;
};

export type DashboardKpi = {
  id: string; title: string; unit?: string; current: number; target: number; data: number[]; note?: string;
};
