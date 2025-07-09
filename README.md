# AI‑Driven Community Orchestration  
*最終更新: 2025-07-10*

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
  - [渋谷区課題](https://odhackathon.metro.tokyo.lg.jp/issues/) : *「多様な主体の参画を促すデータ利活用アイデア」*  
- **[SHIBUYA CITY DASHBOARD](https://www.city.shibuya.tokyo.jp/contents/kusei/shibuya-data/)** のオープンデータを起点に、行政・住民・企業が共創するモデル構築を企図。

---

## 🎯 プロジェクト構成

| ブランチ | MVP テーマ | ステータス |
|----------|-----------|------------|
| [hachiko-bus](https://github.com/dx-junkyard/OpenDataHackathon2025_SCD-Hub/tree/hachiko-bus) | ハチ公バス乗客数回復 | 🔍 検討中 |
| [sprout](https://github.com/dx-junkyard/OpenDataHackathon2025_SCD-Hub/tree/sprout) | 子育て支援 (保育・相談) | 🔍 検討中 |
| [active-live](https://github.com/dx-junkyard/OpenDataHackathon2025_SCD-Hub/tree/active-life) | 健康・スポーツ | 🔍 検討中 |

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

## 🧭 キーワード定義

- **コミュニティ・オーケストレーション（Community Orchestration）**  
  多様なコミュニティを **調和して連携させる** 仕組みを指す言葉で、  
  “harmonious organization” のニュアンスを含みます :contentReference[oaicite:5]{index=5}。

- **AI orchestration**  
  コンポーネント間での相互連携を管理することで、各AIエージェント・ツール・データが  
  **統合されたひとつの流れとして機能する仕組み**。  
  “Orchestra の指揮者のように役割を調整し、システム全体をハーモナイズする”という説明が典型的です :contentReference[oaicite:6]{index=6}。

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

