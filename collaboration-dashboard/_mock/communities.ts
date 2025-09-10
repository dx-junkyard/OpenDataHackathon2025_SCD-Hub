import { Community, Thread, Message, Issue } from '../_types';

export const communities: Community[] = [
  { id: 'c1', name: 'まちづくり', members: 10, hot: '活発' },
  { id: 'c2', name: '交通改善', members: 5, hot: '新規' }
];

export const threads: Record<string, Thread[]> = {
  c1: [{ id: 't1', title: '公園の清掃', replies: 1, communityId: 'c1' }],
  c2: []
};

export const messages: Record<string, Message[]> = {
  t1: [{ user: 'Alice', text: '週末に清掃しましょう', threadId: 't1' }]
};

export const issues: Issue[] = [
  {
    id: 'i1',
    title: 'ゴミのポイ捨て',
    target: '駅前',
    area: '市内',
    detail: '',
    evidence: '写真',
    kpis: ['清掃回数'],
    impact: 3,
    feasible: 4,
    communityId: 'c1'
  }
];
