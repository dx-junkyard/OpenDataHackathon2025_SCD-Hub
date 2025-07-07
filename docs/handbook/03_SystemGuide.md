# 03 SystemGuide – 技術構成と実装方針  
*Updated: 2025-07-07*

## 1. アーキテクチャ概要
```
LINE OA  ←→  MiniHub(MCP)  ←→  Orchestrator(FastAPI)  ←→  SCD Hub(MCP)  ←→  DuckDB
Slack    ←──────────────────────────────┘
```
- **データ基盤**: DuckDB (+ Parquet)  … 軽量・依存ゼロ  
- **連携プロトコル**: Model Context Protocol (MCP) … Resource/Tool を標準公開  
- **メッセージング**: Redis Streams … 軽量 Pub/Sub  
- **LLM**: OpenAI GPT-4o (fallback: local Llama3 via Ollama)

## 2. コンポーネント詳細
| Service | 主ライブラリ | ポート | 備考 |
|---------|-------------|-------|------|
| orchestrator | FastAPI, LangChain | 8000 | `/healthz`, `/events` |
| scd_hub_server | Flask, duckdb, Pillow | 7000 | `/mcp/resources`, `/mcp/tools` |
| minihub | Flask | 7100 | 町会フィードバック保存 |
| ingestor | pandas, duckdb | – | cron 実行 |
| redis | Streams | 6379 | – |
| line_bot | line-bot-sdk | 9000 | – |
| slack_bot | slack_bolt | 9100 | – |

## 3. データフロー
1. **ETL** – PowerBI CSV DL → Parquet 変換 → DuckDB テーブル更新。  
2. **Resource 更新** – Ingestor が MCP manifest の `bus_ridership` version を更新。  
3. **異常検知** – Orchestrator TrendWatch が前月比 -20 % を捕捉し Redis publish。  
4. **通知** – Slack Bot が行政へアラート、MiniHub が LINE へ招集。  
5. **施策実行** – Orchestrator → `createPoster()` → 町会掲示 & `pushLINE()`。  
6. **効果測定** – 翌月 ETL 反映後 Orchestrator が before/after レポートを生成。

## 4. フォルダ構成（抜粋）
```
docs/
  handbook/
    01_ProblemBook.md
    02_ServiceConcept.md
    03_SystemGuide.md
  architecture/
    overview.drawio
apps/
  orchestrator/  scd_hub_server/  minihub/  ingestor/  bots/
data/
  parquet/   duckdb/   schemas/
infrastructure/
  docker-compose.yaml
```

## 5. 開発・実行手順
```bash
git clone <repo>
cd project-root
docker compose up -d
curl localhost:8000/healthz   # => 200 OK
```

## 6. 依存とバージョン
- Python 3.11  
- duckdb >= 0.10  
- Redis 7-alpine  
- OpenAI >= 1.23.0  
- LangChain 0.2.x  

---

_この SystemGuide はエンジニア用の実装ハンドブックとして維持する。_
