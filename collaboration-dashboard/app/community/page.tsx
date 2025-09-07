"use client";
import { useAppStore } from "@/_store/useAppStore";
import { ThreadList } from "@/_components/community/ThreadList";
import { IssueList } from "@/_components/issue/IssueList";
import { MyCommunityList } from "@/_components/community/MyCommunityList";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CommunityContent />
    </Suspense>
  );
}

function CommunityContent() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("tab") || "threads";
  const community = useAppStore((s) => s.selectedCommunity);
  const selectCommunity = useAppStore((s) => s.selectCommunity);
  const openThread = useAppStore((s) => s.openThread);
  const addThread = useAppStore((s) => s.addThread);
  const addMessage = useAppStore((s) => s.addMessage);
  const selectedThreadId = useAppStore((s) => s.selectedThreadId);
  const messages = useAppStore((s) =>
    s.selectedThreadId ? s.messages[s.selectedThreadId] || [] : []
  );
  const [threadTitle, setThreadTitle] = useState("");
  const [threadMsg, setThreadMsg] = useState("");
  const [msgText, setMsgText] = useState("");

  if (!community) {
    return (
      <main className="p-4">
        <MyCommunityList onSelect={selectCommunity} />
      </main>
    );
  }

  const handleTab = (t: string) => router.push(`/community?tab=${t}`);

  const handleCreateThread = () => {
    if (!threadTitle) return;
    const id = addThread(community.id, threadTitle, threadMsg);
    openThread(id);
    setThreadTitle("");
    setThreadMsg("");
  };

  const handleSend = () => {
    if (selectedThreadId && msgText) {
      addMessage(selectedThreadId, msgText);
      setMsgText("");
    }
  };

  return (
    <main className="p-4">
      <button className="btn btn-ghost mb-4" onClick={() => selectCommunity(null)}>
        戻る
      </button>
      <div className="flex gap-2 mb-4">
        <button
          className={`btn ${tab === "threads" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleTab("threads")}
        >
          スレッド
        </button>
        <button
          className={`btn ${tab === "issues" ? "btn-primary" : "btn-ghost"}`}
          onClick={() => handleTab("issues")}
        >
          課題
        </button>
      </div>
      {tab === "threads" ? (
        <div>
          <ThreadList communityId={community.id} onOpen={openThread} />
          <div className="mt-4 space-y-2">
            <input
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
              placeholder="タイトル"
              className="w-full border rounded p-2"
            />
            <textarea
              value={threadMsg}
              onChange={(e) => setThreadMsg(e.target.value)}
              placeholder="メッセージ"
              className="w-full border rounded p-2"
            />
            <button className="btn btn-primary w-full" onClick={handleCreateThread}>
              新規スレッド作成
            </button>
          </div>
          {selectedThreadId && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">メッセージ</h3>
              <div className="space-y-1">
                {messages.map((m, idx) => (
                  <div key={idx} className="p-2 border rounded">
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className="flex-1 border rounded p-2"
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  送信
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <IssueList communityId={community.id} />
        </div>
      )}
    </main>
  );
}
