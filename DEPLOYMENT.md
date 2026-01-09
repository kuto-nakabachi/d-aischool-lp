# Xserver デプロイ手順（LP + 予約API）

このドキュメントは、Next.js（静的書き出し）と PHP API を Xserver へ GitHub Actions で自動デプロイするための手順書です。

---

## 0. 前提条件

- GitHub リポジトリにコードがプッシュされている
- Xserver のアカウントがある
- Google カレンダー共有と DWD（Domain‑Wide Delegation）が完了している

---

## 1. GitHub Secrets の設定（初回のみ）

GitHub リポジトリの `Settings` → `Secrets and variables` → `Actions` で以下を登録:

| Secret名 | 値 | 説明 |
|----------|-----|------|
| `FTP_USERNAME` | `dinc` | XserverのFTPユーザー名 |
| `FTP_PASSWORD` | サーバーパスワード | XserverのFTPパスワード |
| `GOOGLE_CALENDAR_CREDENTIALS` | JSONファイルの中身 | Google Calendar API認証情報 |
| `HTPASSWD_CONTENT` | `test:$apr1$xxxxx` | Basic認証用（ステージング環境用） |

### 1.1 GOOGLE_CALENDAR_CREDENTIALS の取得

1. `api/calendar-booking-system-483704-3ba0696aeab4.json` の内容をコピー
2. GitHub Secretsに貼り付け

### 1.2 HTPASSWD_CONTENT の生成

ローカルで以下を実行:
```bash
htpasswd -nb test your_password
```
出力例: `test:$apr1$xxxxxxxx$yyyyyyyyyyyyyyyy`

この出力をそのまま `HTPASSWD_CONTENT` に設定

---

## 2. デプロイフロー

### 2.1 ステージング環境（テスト用・Basic認証あり）

```
[develop/staging ブランチにプッシュ]
         ↓
[GitHub Actions: deploy-staging.yml]
         ↓
[Xserver: /school/Nakabachi/ に自動デプロイ]
         ↓
[Basic認証で保護されたテスト環境]
```

**URL**: https://decentralizedpro.io/school/Nakabachi/
**認証**: ユーザー名 `test` + 設定したパスワード

### 2.2 本番環境

```
[main ブランチにプッシュ]
         ↓
[GitHub Actions: deploy.yml]
         ↓
[Xserver: /school/Nakabachi/ に自動デプロイ]
         ↓
[Basic認証なしの本番環境]
```

---

## 3. ディレクトリ構成（Xserver上）

```
/home/dinc/decentralizedpro.io/public_html/school/Nakabachi/
├── index.html          ← メインLP
├── _next/              ← Next.jsアセット
├── booking/
│   └── index.html      ← 予約ページ
├── api/
│   ├── config.php
│   ├── available-slots.php
│   ├── create-booking.php
│   ├── credentials.json  ← GitHub Secretsから生成
│   └── vendor/           ← Composer依存
├── .htaccess             ← ルーティング設定
└── .htpasswd             ← Basic認証（ステージングのみ）
```

---

## 4. 手動デプロイ（必要な場合）

### 4.1 ローカルビルド

```bash
cd /Users/bachi/スクールLP
npm ci
npm run build
```

`out/` ディレクトリが生成されます。

### 4.2 FTPアップロード

1. FileZilla等でXserverに接続
   - ホスト: `sv14204.xserver.jp`
   - ユーザー: `dinc`
   - ポート: 21

2. アップロード
   - `out/` の中身 → `/public_html/school/Nakabachi/`
   - `api/` の中身 → `/public_html/school/Nakabachi/api/`

### 4.3 パーミッション設定

| ファイル | パーミッション |
|----------|---------------|
| `api/*.php` | 644 |
| `api/credentials.json` | 600 |
| `api/vendor/` | 755 |

---

## 5. Google カレンダー設定（済ならスキップ）

### 5.1 共有設定

対象カレンダー:
- `nakabachi@decentralizedpro.io`
- `horita@decentralizedpro.io`

共有先:
- `calendar-api-service@calendar-booking-system-483704.iam.gserviceaccount.com`

権限: **予定の変更権限（読み書き）**

### 5.2 DWD 設定（必須）

1. GCP でサービスアカウントの **Domain‑Wide Delegation を有効化**
2. Admin Console → 「セキュリティ」→「API の制御」→「ドメイン全体の委任」
3. クライアント ID を登録し、スコープに以下を追加:
   ```
   https://www.googleapis.com/auth/calendar
   ```

---

## 6. 動作確認

### 6.1 API テスト

```
https://decentralizedpro.io/school/Nakabachi/api/available-slots.php
```

空き枠 JSON が返れば OK。

### 6.2 予約フロー確認

1. https://decentralizedpro.io/school/Nakabachi/
2. 「無料相談を予約」ボタンをクリック
3. `/booking` へ遷移
4. 日付・時間を選択
5. フォーム送信
6. Google Meet URL が表示される
7. 招待メールが送信される（DWD 有効時）

---

## 7. よくある問題

### 7.1 空き枠が出ない

- 共有権限が不足していないか確認
- 終日予定が埋めていないか確認
- `api/error.log` を確認

### 7.2 予約が失敗する

- DWD が有効か確認
- `GOOGLE_DELEGATED_USER` が空でないか確認
- `ALLOWED_ORIGINS` が本番ドメインになっているか確認

### 7.3 GitHub Actions が失敗する

- Secretsが正しく設定されているか確認
- FTPパスワードに特殊文字がある場合はエスケープが必要な場合あり

### 7.4 Basic認証が効かない

- `.htpasswd` のパスが正しいか確認
- Xserverのアクセス制限設定と競合していないか確認

---

## 8. ブランチ運用

| ブランチ | 用途 | デプロイ先 |
|----------|------|-----------|
| `main` | 本番環境 | 本番（認証なし） |
| `staging` | ステージング | ステージング（Basic認証） |
| `develop` | 開発 | ステージング（Basic認証） |

---

## 9. セキュリティチェックリスト

本番公開前に確認:

- [ ] `ALLOWED_ORIGINS` に本番ドメインのみ設定
- [ ] `credentials.json` のパーミッションが600
- [ ] Basic認証を解除（mainブランチ使用時）
- [ ] エラーログの出力先を確認
- [ ] HTTPS強制リダイレクトを確認

---

*最終更新: 2026-01-09*
