import { DashboardKpi } from '../_types';

export const dashboards: DashboardKpi[] = [
  { id: 'k1', title: '参加者数', unit: '人', current: 20, target: 50, data: [10,15,20,18,20] },
  { id: 'k2', title: '清掃回数', current: 5, target: 10, data: [2,3,4,5,5] },
  { id: 'k3', title: '満足度', unit: '%', current: 70, target: 90, data: [60,65,70,68,70], note: 'アンケート結果' }
];
