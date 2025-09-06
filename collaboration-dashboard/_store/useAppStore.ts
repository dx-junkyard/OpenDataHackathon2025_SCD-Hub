import { create } from 'zustand';
import { initialState } from '../_mock/initialState';
import { Community, Thread, Message, Issue, DashboardKpi, News } from '../_types';

type AppState = {
  selectedCommunity?: Community | null;
  selectedThreadId?: string | null;
  myCommunities: string[];
  news: News[];
  communities: Community[];
  threads: Record<string, Thread[]>;
  messages: Record<string, Message[]>;
  issues: Issue[];
  dashboards: DashboardKpi[];
  selectCommunity: (c: Community) => void;
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  openThread: (id: string) => void;
  addThread: (communityId: string, title: string, firstMessage?: string) => string;
  addMessage: (threadId: string, text: string) => void;
  saveIssue: (issue: Issue) => void;
  addDashboard: (kpi: DashboardKpi) => void;
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  selectCommunity: (c) =>
    set((s) => {
      console.log('selectCommunity', c.id);
      return {
        selectedCommunity: c,
        myCommunities: [c.id, ...s.myCommunities.filter((id) => id !== c.id)]
      };
    }),
  joinCommunity: (id) =>
    set((s) => {
      console.log('joinCommunity', id);
      return s.myCommunities.includes(id)
        ? {}
        : { myCommunities: [...s.myCommunities, id] };
    }),
  leaveCommunity: (id) =>
    set((s) => {
      console.log('leaveCommunity', id);
      return {
        myCommunities: s.myCommunities.filter((cid) => cid !== id),
        selectedCommunity: s.selectedCommunity?.id === id ? null : s.selectedCommunity
      };
    }),
  openThread: (id) => set({ selectedThreadId: id }),
  addThread: (communityId, title, firstMessage) => {
    const id = `t${Date.now()}`;
    set((state) => {
      const newThread: Thread = { id, title, replies: firstMessage ? 1 : 0, communityId };
      const threads = {
        ...state.threads,
        [communityId]: [...(state.threads[communityId] || []), newThread]
      };
      const messages = { ...state.messages };
      if (firstMessage) {
        messages[id] = [{ user: 'me', text: firstMessage, threadId: id }];
      }
      return { threads, messages };
    });
    return id;
  },
  addMessage: (threadId, text) =>
    set((state) => {
      const msgs = state.messages[threadId] || [];
      const newMsgs = [...msgs, { user: 'me', text, threadId }];
      const messages = { ...state.messages, [threadId]: newMsgs };
      const threads = { ...state.threads };
      const communityId = state.selectedCommunity?.id;
      if (communityId) {
        const list = threads[communityId] || [];
        const th = list.find((t) => t.id === threadId);
        if (th) th.replies = newMsgs.length;
      }
      return { messages, threads };
    }),
  saveIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
  addDashboard: (kpi) => set((state) => ({ dashboards: [...state.dashboards, kpi] }))
}));
