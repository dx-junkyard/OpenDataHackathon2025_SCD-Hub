import { describe, expect, test, beforeEach } from 'vitest';
import { useAppStore } from '../_store/useAppStore';
import { initialState } from '../_mock/initialState';

describe('store actions', () => {
  beforeEach(() => {
    useAppStore.setState(initialState);
  });

  test('addThread and addMessage', () => {
    const id = useAppStore.getState().addThread('c1', 'test', 'hello');
    const thread = useAppStore.getState().threads['c1'].find((t) => t.id === id);
    expect(thread).toBeTruthy();
    expect(thread?.replies).toBe(1);
    useAppStore.getState().addMessage(id, 'reply');
    expect(useAppStore.getState().messages[id].length).toBe(2);
  });

  test('saveIssue', () => {
    const count = useAppStore.getState().issues.length;
    useAppStore.getState().saveIssue({
      id: 'new',
      title: 'new issue',
      kpis: [],
      impact: 1,
      feasible: 1
    });
    expect(useAppStore.getState().issues.length).toBe(count + 1);
  });

  test('selectCommunity resets selectedThreadId', () => {
    const { openThread, selectCommunity, communities } = useAppStore.getState();
    openThread('t1');
    expect(useAppStore.getState().selectedThreadId).toBe('t1');
    selectCommunity(communities[1]);
    expect(useAppStore.getState().selectedThreadId).toBeNull();
  });
});
