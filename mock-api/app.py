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
        {
            "id": 1,
            "title": "病児保育の枠拡充を検討",
            "summary": "当日対応率の改善を目標に枠拡充を検討。詳細は来月発表。",
            "cat": "子育て",
            "tags": ["病児育", "子育て"],
            "ts": "2025-08-18T10:00:00",
            "unread": True,
            "cards": 1,
            "comments": 6,
        },
        {
            "id": 2,
            "title": "夜間学童の試行案内",
            "summary": "18–21時の学童保育の試行を開始。対象エリアは渋谷駅周辺。",
            "cat": "教育",
            "tags": ["学童", "放課後"],
            "ts": "2025-08-20T09:00:00",
            "unread": False,
            "cards": 0,
            "comments": 2,
        },
    ]


@app.get("/news/{news_id}/threads")
def news_threads(news_id: int):
    return [
        {"type": "chat", "text": "同じ状況の家庭が多い印象です", "by": "住民"},
        {"type": "candidate", "text": "夜間帯の空き枠をカレンダーで見たい", "by": "NPO"},
    ]


@app.get("/community")
def community():
    return {
        "free": [
            {"text": "制度の説明が難しくて申請に時間がかかる", "by": "住民A", "badge": True},
            {"text": "病児往診と病児保育の比較が知りたい", "by": "住民B", "badge": True},
        ],
        "candidates": [],
    }


@app.get("/card")
def card():
    return {
        "title": "病児保育の空きが見えない",
        "kpi_now": 55,
        "kpi_goal": 80,
        "status_chips": ["状態: 具体化中", "タグ: 子育て・医療", "鮮度: 本日更新"],
        "threads": [
            {"text": "最新値だと平日午前は対応率が上がってます", "type": "data"},
            {"text": "夜間帯は人員足りないリスクあり", "type": "risk"},
            {"text": "当日キャンセル枠を近隣配信したい", "type": "idea"},
        ],
    }

@app.get("/jit")
def jit(issue_id: str):
    return {
        "question": "当日対応率を80%へ。今週のボトルネックは？",
        "charts": [{"id":"apply_progress","value":72}, {"id":"same_day_success","value":55}],
        "insight": "木曜夜に穴。民間枠の暫定連携を推奨。",
        "actions": ["木曜夜の暫定連携", "フォーム文言修正", "夜間需要アンケ配信"]
    }

