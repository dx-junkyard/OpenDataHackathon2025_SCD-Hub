import { render, screen } from '@testing-library/react';
import { MyCommunityList } from '../_components/community/MyCommunityList';
import { useAppStore } from '../_store/useAppStore';
import { initialState } from '../_mock/initialState';
import { vi } from 'vitest';

import '@testing-library/jest-dom';

test('shows join link when no communities', () => {
  useAppStore.setState({ ...initialState, myCommunities: [] });
  render(<MyCommunityList onSelect={vi.fn()} />);
  expect(screen.getByText('参加中のコミュニティはありません')).toBeInTheDocument();
  const link = screen.getByRole('link', { name: 'コミュニティに参加する' });
  expect(link).toHaveAttribute('href', '/community/join');
});
