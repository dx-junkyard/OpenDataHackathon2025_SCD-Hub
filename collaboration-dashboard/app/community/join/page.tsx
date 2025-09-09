'use client';
import { CommunityList } from '@/_components/community/CommunityList';
import { useAppStore } from '@/_store/useAppStore';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const join = (id: string) => {
    try {
      console.log('join button clicked', id);
      const store = useAppStore.getState();
      const community = store.communities.find((c) => c.id === id);
      if (!community) {
        console.error('join failed: community not found', id);
        return;
      }
      store.joinCommunity(id);
      store.selectCommunity(community);
      router.push('/community');
    } catch (err) {
      console.error('join failed', err);
    }
  };
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">コミュニティ参加</h1>
      <CommunityList onJoin={join} />
    </main>
  );
}
