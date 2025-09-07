import { render, screen, fireEvent } from '@testing-library/react';
import IssuesPage from '../app/issues/page';
import { useAppStore } from '../_store/useAppStore';
import { initialState } from '../_mock/initialState';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));

test('creating an issue adds to list', () => {
  useAppStore.setState({
    ...initialState,
    selectedCommunity: initialState.communities[0]
  });
  render(<IssuesPage />);
  fireEvent.click(screen.getByText('新規課題作成'));
  fireEvent.change(screen.getByPlaceholderText('タイトル'), { target: { value: '新しい課題' } });
  fireEvent.click(screen.getAllByText('課題カード作成')[1]);
  expect(screen.getByText('新しい課題')).toBeInTheDocument();
});
