# D-AI School LP デプロイメントレポート

**作成日**: 2026-01-09
**ステータス**: Staging環境稼働中

---

## 現在の状況

### デプロイ済み環境

| 環境 | URL | ブランチ | 認証 | 状態 |
|------|-----|----------|------|------|
| Staging | https://decentralizedpro.io/school/Nakabachi/ | `staging` | Basic Auth | 稼働中 |
| Production | 同上（予定） | `main` | なし | 未設定 |

### Basic Auth認証情報
- ユーザー名・パスワード: GitHub Secretsの`HTPASSWD_CONTENT`で設定済み

---

## 完了した作業

### 1. インフラ構築

- **GitHub Actions設定**
  - `.github/workflows/deploy-staging.yml` - Staging用（Basic Auth付き）
  - `.github/workflows/deploy.yml` - Production用（準備済み、未使用）

- **FTPデプロイ設定**
  - サーバー: `sv14204.xserver.jp`
  - ユーザー: `nakabachi@dinc.xsrv.jp`
  - デプロイ先: `decentralizedpro.io/public_html/school/Nakabachi/`

### 2. Next.js静的エクスポート設定

- `next.config.ts` で以下を設定:
  - `output: "export"` - 静的HTMLエクスポート
  - `trailingSlash: true` - URLの末尾スラッシュ
  - `images.unoptimized: true` - 画像最適化無効化
  - `basePath` - 環境変数から読み込み

### 3. PHPバックエンド設定

- Google Calendar API連携
- CORSヘッダー設定（本番ドメイン対応）
- Composer依存関係の最適化（Calendarサービスのみに限定）
  - デプロイ時間: 50分以上 → 2-3分に短縮

### 4. バグ修正

| 問題 | 原因 | 解決方法 |
|------|------|----------|
| middleware.tsエラー | 静的エクスポート非対応 | ファイル削除 |
| 403 Forbidden | FTPパスが絶対パス | 相対パスに修正 |
| /booking遷移で別サイト表示 | `<a>`タグ使用 | Next.js `<Link>`に変更 |
| プロフィール画像非表示 | basePathが適用されない | 手動でbasePath追加 |

---

## 設定済みGitHub Secrets

| Secret名 | 用途 | 状態 |
|----------|------|------|
| `FTP_USERNAME` | FTPユーザー名 | 設定済み |
| `FTP_PASSWORD` | FTPパスワード | 設定済み |
| `GOOGLE_CALENDAR_CREDENTIALS` | Google Calendar API認証情報 | 設定済み |
| `HTPASSWD_CONTENT` | Basic Auth用パスワードファイル | 設定済み |

---

## プロジェクト構成

```
スクールLP/
├── .github/workflows/
│   ├── deploy.yml          # Production用（未使用）
│   └── deploy-staging.yml  # Staging用
├── api/
│   ├── config.php          # API設定
│   ├── slots.php           # 空き枠取得
│   ├── book.php            # 予約処理
│   └── composer.json       # PHP依存関係
├── app/
│   ├── page.tsx            # トップページ
│   └── booking/page.tsx    # 予約ページ
├── components/
│   ├── sections/           # セクションコンポーネント
│   └── ui/                 # UIコンポーネント
├── public/images/          # 静的画像
├── next.config.ts          # Next.js設定
├── .env.production         # 本番環境変数
└── DEPLOYMENT.md           # デプロイ手順書
```

---

## これからやること

### 必須タスク

1. **本番デプロイの実施**
   - `staging`ブランチの変更を`main`にマージ
   - `deploy.yml`を有効化（Basic Auth削除済みバージョン）
   - または、stagingをそのまま本番として使用する場合はBasic Authを削除

2. **予約機能の本番テスト**
   - Google Calendar APIとの連携確認
   - 実際の予約フローのテスト
   - エラーハンドリングの確認

### 推奨タスク

3. **ドメイン変更対応**（ユーザー希望による）
   - 現在: `https://decentralizedpro.io/school/Nakabachi/`
   - 変更時: 環境変数とワークフローの更新が必要

4. **監視・ログ設定**
   - PHPエラーログの確認方法
   - デプロイ失敗時の通知設定

5. **バックアップ戦略**
   - Google Calendar認証情報のバックアップ
   - デプロイ前の自動バックアップ

### オプションタスク

6. **パフォーマンス最適化**
   - 画像の圧縮
   - CDN導入検討

7. **SEO対応**
   - メタタグの最適化
   - OGP画像設定

---

## 本番リリース手順

### オプションA: mainブランチで本番デプロイ

```bash
# stagingの変更をmainにマージ
git checkout main
git merge staging
git push origin main
```

その後、`.github/workflows/deploy.yml`がmainプッシュで実行される

### オプションB: stagingをそのまま本番に

`deploy-staging.yml`からBasic Auth関連の設定を削除:
- `.htpasswd`ファイル作成部分を削除
- `.htaccess`からAuthType関連行を削除

---

## トラブルシューティング

### デプロイが失敗する場合

1. GitHub Actionsのログを確認
2. FTP認証情報が正しいか確認
3. サーバーのディスク容量を確認

### 画像が表示されない場合

- `components/ui/CaseCard.tsx`で`basePath`が正しく設定されているか確認
- ビルド時に`NEXT_PUBLIC_BASE_PATH`が設定されているか確認

### 予約ができない場合

- `api/config.php`のCORS設定を確認
- Google Calendar認証情報（credentials.json）が正しいか確認
- PHPエラーログを確認

---

## 参考リンク

- GitHub リポジトリ: https://github.com/kuto-nakabachi/d-aischool-lp
- Staging環境: https://decentralizedpro.io/school/Nakabachi/
- GitHub Actions: https://github.com/kuto-nakabachi/d-aischool-lp/actions
