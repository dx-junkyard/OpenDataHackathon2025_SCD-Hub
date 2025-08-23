from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Shibuya Demo Mock API")

# 念のためCORSも許可（Nginx経由なら不要だがデバッグ用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# ---- モデル ----
class ChatIn(BaseModel):
    session_id: Optional[str] = None
    user_msg: str

class ChatOut(BaseModel):
    agent_msgs: List[str]
    intents: List[str] = []
    next_actions: List[str] = []

class IssueIn(BaseModel):
    summary: str
    tags: List[str] = []

class IssueOut(BaseModel):
    issue_id: str
    status: str

# ---- エンドポイント（固定メッセージのモック）----

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat", response_model=ChatOut)
def chat(body: ChatIn):
    user = body.user_msg.strip()
    if "対象" in user or "使える" in user:
        return ChatOut(
            agent_msgs=[
                "要点：①当日対応率改善 ②枠拡充検討 ③来月詳細。",
                "この会話を課題として匿名保存しますか？（はい/いいえ）"
            ],
            intents=["question", "candidate_issue"],
            next_actions=["offer_issue_save"]
        )
    return ChatOut(
        agent_msgs=[
            "ニュースを3行で要約しました。ご質問ありますか？",
            "関連コミュニティに参加しますか？（参加/後で）"
        ],
        intents=["summary", "community_invite"],
        next_actions=["invite_to_community"]
    )

@app.post("/issues", response_model=IssueOut)
def create_issue(body: IssueIn):
    return IssueOut(issue_id="ISSUE-0001", status="G1_pending")

@app.get("/route")
def route(issue_id: str):
    return {
        "issue_id": issue_id,
        "community_id": "COMM-parents-001",
        "invite_link": "https://example.local/join/COMM-parents-001"
    }

@app.get("/news")
def news_list():
    return [
        {"id": 1, "title": "病児保育の枠拡充を検討", "summary": "当日対応率改善を目標に枠拡充"},
        {"id": 2, "title": "夜間学童の試行案内", "summary": "18-21時の試行プログラム"}
    ]

@app.get("/jit")
def jit(issue_id: str):
    return {
        "question": "当日対応率を80%へ。今週のボトルネックは？",
        "charts": [{"id":"apply_progress","value":72}, {"id":"same_day_success","value":55}],
        "insight": "木曜夜に穴。民間枠の暫定連携を推奨。",
        "actions": ["木曜夜の暫定連携", "フォーム文言修正", "夜間需要アンケ配信"]
    }

