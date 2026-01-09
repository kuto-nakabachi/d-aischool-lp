# D-AI School LP - AI開発ガイドライン

このファイルはAIコーディングアシスタント（Claude Code, Codex, Antigravity等）向けの必須ルールです。

---

## 絶対に守るべきルール

### 1. Gitブランチ運用ルール

**絶対に`main`ブランチで直接作業しないこと。**

```
feature/xxx → staging → main
```

| ブランチ | 用途 | 直接コミット |
|----------|------|--------------|
| `main` | 本番環境 | 禁止 |
| `staging` | テスト環境（Xserver） | 禁止 |
| `feature/*` | 機能開発 | OK |
| `fix/*` | バグ修正 | OK |

### 2. 開発フロー（必ずこの順序で）

```bash
# Step 1: stagingから新ブランチを作成
git checkout staging
git pull origin staging
git checkout -b feature/機能名

# Step 2: ローカルで開発・確認
npm run dev
# http://localhost:3000 で確認

# Step 3: コミット
git add -A
git commit -m "変更内容の説明"

# Step 4: stagingにマージしてXserverで確認
git checkout staging
git merge feature/機能名
git push origin staging
# → 自動デプロイ後、https://decentralizedpro.io/school/Nakabachi/ で確認

# Step 5: 本番リリース（ユーザーの許可を得てから）
git checkout main
git merge staging
git push origin main

# Step 6: featureブランチ削除
git branch -d feature/機能名
```

### 3. 画像追加時の注意

`public/images/` に画像を追加する場合、コンポーネントで使用する際は**必ずbasePathを付ける**：

```tsx
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// 正しい
<Image src={`${basePath}/images/example.png`} ... />

// 間違い（本番で表示されない）
<Image src="/images/example.png" ... />
```

### 4. 予約機能（PHP API）の変更時

`api/` ディレクトリのPHPファイルを変更する場合：

```bash
# ローカルテスト用PHPサーバー起動
cd api && php -S localhost:8000
```

必ずstagingでGoogle Calendar連携をテストしてからmainにマージすること。

### 5. 本番リリースの確認

mainブランチへのマージは**必ずユーザーに確認を取ってから**行うこと。
勝手に本番環境にデプロイしない。

---

## プロジェクト情報

### 環境

| 環境 | URL | ブランチ |
|------|-----|----------|
| ローカル | http://localhost:3000 | feature/* |
| Staging | https://decentralizedpro.io/school/Nakabachi/ | staging |
| 本番 | 同上（予定） | main |

### 技術スタック

- Next.js 15.1.3（静的エクスポート）
- TypeScript
- Tailwind CSS
- PHP（Google Calendar API連携）

### ディレクトリ構成

```
├── app/                 # Next.js App Router
│   ├── page.tsx        # トップページ
│   └── booking/        # 予約ページ
├── components/
│   ├── sections/       # セクションコンポーネント
│   └── ui/             # UIコンポーネント
├── api/                # PHPバックエンド
├── public/images/      # 静的画像
└── .github/workflows/  # GitHub Actions
```

### よく使うコマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run lint     # Lint実行
```

---

## ブランチ命名規則

```
feature/hero-update        # 機能追加・変更
fix/booking-error          # バグ修正
refactor/component-split   # リファクタリング
docs/readme-update         # ドキュメント更新
```

---

## 禁止事項

1. `main`ブランチへの直接プッシュ
2. ユーザー確認なしの本番デプロイ
3. `basePath`なしでの画像パス指定
4. テストなしでのPHP API変更
