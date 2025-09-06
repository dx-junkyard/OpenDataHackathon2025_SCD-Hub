'use client';
import { CommunityList } from '@/_components/community/CommunityList';
import { useAppStore } from '@/_store/useAppStore';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  const router = useRouter();
  const join = (id: string) => {
    const community = useAppStore.getState().communities.find((c) => c.id === id);
    if (!community) return;
    useAppStore.setState((s) => ({
      myCommunities: [...s.myCommunities, id],
      selectedCommunity: community
    }));
    router.push('/community');
  };
  return (
    <main className="p-4">
      <h1 className="text-lg font-semibold mb-4">コミュニティ参加</h1>
      <CommunityList onJoin={join} />
    </main>
  );
}
