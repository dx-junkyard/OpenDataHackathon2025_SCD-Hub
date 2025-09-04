import { news } from './news';
import { communities, threads, messages, issues } from './communities';
import { dashboards } from './dashboards';
import { Community } from '../_types';

export const initialState = {
  selectedCommunity: null as Community | null,
  selectedThreadId: null as string | null,
  myCommunities: ['c1'],
  news,
  communities,
  threads,
  messages,
  issues,
  dashboards
};
