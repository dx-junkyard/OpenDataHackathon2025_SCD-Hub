# AI‑Driven Community Orchestration  
*最終更新: 2025-07-10*

## 🛰️ プロジェクト概要
本リポジトリは、**「AI を活用したコミュニティ・オーケストレーションの実現」** を目的とした実証プラットフォームです。  
社会課題に対し **“多種多様なスモールコミュニティ”**が必要に応じて連携し、  
誰もが主体的にアクションを起こせる社会構造をつくることを目指します。

## 👥 対象とする「スモールコミュニティ」について

本プロジェクトが対象とする「スモールコミュニティ」とは、町会やNPO、PTA、企業内グループといった既存の団体に加え、

- 友人や知人同士のゆるやかなつながり  
- 地域の散歩仲間やランニンググループ  
- 子育ての情報交換をする保護者のチャットグループ  
- 趣味や課題感等、共通の関心事を持つ数人の集まり  
- 時間や場所を共にするだけのゆるいつながり  

など、**数人から成る任意の集まりも含まれます**。

組織の大小や公式・非公式の区別にかかわらず、  
課題への関心や地域との関わりを軸にした「小さなつながり」を柔軟に支援・連携していくことを目指します。


### コンセプト図
```
課題（Dashboards / OpenData）
          ↓
 AI Orchestrator  ──► スモールコミュニティ（友人・知人の集まり）
          │           スモールコミュニティ（ハッカソン等イベントで繋がった）
          │           スモールコミュニティ（家族・親族）
          │           コミュニティ（町会）
          │           コミュニティ（PTA）
          ▼           コミュニティ（企業ボランティア）
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
  “harmonious organization” のニュアンスを含みます。

- **AI orchestration**  
  コンポーネント間での相互連携を管理することで、各AIエージェント・ツール・データが  
  **統合されたひとつの流れとして機能する仕組み**。  
  “Orchestra の指揮者のように役割を調整し、システム全体をハーモナイズする”という説明が典型的です。

---


## 📜 ライセンス
MIT License

---

> **行政ダッシュボード × コミュニティ × AI** による課題解決モデルを広く共有し、  
> 再利用・共同開発を促進することを目指します。

