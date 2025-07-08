# AI‑Driven Community Orchestration  
*最終更新: 2025-07-08*

## 🛰️ プロジェクト概要
本リポジトリは、**「AI を活用したコミュニティ・オーケストレーションの実現」** を目的とした実証プラットフォームです。  
社会課題に対し **“多種多様なスモールコミュニティ”**（町会・PTA・NPO・企業など）が、必要に応じて連携し、  
誰もが主体的にアクションを起こせる社会構造をつくることを目指します。

### コンセプト図
```
課題（Dashboards / OpenData）
          ↓
 AI Orchestrator  ──► コミュニティA（町会）
          │          コミュニティB（PTA）
          ▼          コミュニティC（企業ボランティア）
     施策カタログ
```

---

## 🌐 バックグラウンド
- **東京都知事杯 Open Data Hackathon 2025**  
  - 渋谷区課題: *「多様な主体の参画を促すデータ利活用アイデア」*  
- **渋谷 CITY DASHBOARD** のオープンデータを起点に、行政・住民・企業が共創するモデル構築を企図。

---

## 🎯 プロジェクト構成

| ブランチ | MVP テーマ | ステータス |
|----------|-----------|------------|
| `hachiko-bus` | ハチ公バス乗客数回復 | 🛠 実装中 |
| `sprout` | 子育て支援 (保育・相談) | 🛠 実装中 |

### MVP 共通フレーム
- **データ基盤**: DuckDB + Parquet  
- **連携プロトコル**: Model Context Protocol (MCP)  
- **AI エージェント**: LangChain Agents (TrendWatch, HypoDraft ほか)  
- **コミュニティ接点**: LINE Bot / Slack Bot  

---

## 🏗️ リポジトリ構成（抜粋）
```
apps/            サービスごとのコンテナ化アプリ
data/            Parquet・DuckDB・スキーマ
docs/
  handbook/      問題・コンセプト・システムガイド
  mcp/           MCP manifest & API
infrastructure/  docker-compose, terraform
```

---

## 🚀 クイックスタート
```bash
# clone
git clone <repo>
cd <repo>

# ハチ公バス版
git checkout hachiko-bus
docker compose up -d

# 子育て版 (sprout)
git checkout sprout
docker compose --profile sprout up -d
```
`http://localhost:8000/healthz` が **200 OK** なら起動成功。

---

## 🤝 貢献方法
1. Issue を立てて議論  
2. Fork → ブランチ作成 (`sprout/feature-xxx`)  
3. `pytest && ruff && mypy` が通ることを確認  
4. Pull Request を送信

---

## 📜 ライセンス
MIT License

---

> **行政ダッシュボード × コミュニティ × AI** による課題解決モデルを広く共有し、  
> 再利用・共同開発を促進することを目指します。

