# Xserverへのデプロイ手順

このドキュメントでは、カレンダー予約システムをXserverにデプロイする手順を説明します。

## 前提条件

- Xserverのアカウントとサーバーが準備されていること
- FTPクライアント（FileZillaなど）がインストールされていること
- Composerがローカル環境にインストールされていること

## 1. Google Calendar API権限の設定

カレンダー予約システムが正しく動作するには、サービスアカウントに各カレンダーへのアクセス権限を付与する必要があります。

### 手順

1. **各Googleカレンダーにアクセス**
   - `nakabachi@decentralizedpro.io`
   - `kazuma@decentralizedpro.io`
   - `horita@decentralizedpro.io`

2. **カレンダーの共有設定**
   - Googleカレンダーを開く
   - 左側のカレンダーリストから該当のカレンダーを選択
   - 「設定と共有」をクリック
   - 「特定のユーザーとの共有」セクションで「ユーザーを追加」をクリック

3. **サービスアカウントを追加**
   - メールアドレス: `calendar-api-service@calendar-booking-system-483704.iam.gserviceaccount.com`
   - 権限:
     - `nakabachi@decentralizedpro.io`: **予定の変更権限**（読み書き）
     - `kazuma@decentralizedpro.io`: **予定の表示権限**（読み取りのみ）
     - `horita@decentralizedpro.io`: **予定の変更権限**（読み書き）

4. **保存**
   - 「送信」をクリックして設定を保存

## 2. PHPバックエンドの準備

### 2.1 ローカルでComposer依存関係をインストール

```bash
cd /Users/bachi/スクールLP/api
composer install
```

これにより、`vendor`ディレクトリにGoogle Calendar API用のPHPライブラリがインストールされます。

### 2.2 認証情報ファイルの確認

`api/calendar-booking-system-483704-3ba0696aeab4.json`が存在することを確認してください。

### 2.3 config.phpの本番環境設定

`api/config.php`を開き、`ALLOWED_ORIGINS`を本番環境のドメインに変更します:

```php
define('ALLOWED_ORIGINS', [
    'https://yourdomain.com', // 本番環境のドメインに変更
]);
```

## 3. Next.jsアプリケーションのビルド

### 3.1 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成し、API URLを設定します:

```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### 3.2 ビルド

```bash
cd /Users/bachi/スクールLP
npm run build
```

### 3.3 静的エクスポート（オプション）

Xserverで静的ファイルとして配信する場合は、`next.config.ts`を編集します:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
```

その後、再度ビルド:

```bash
npm run build
```

これにより、`out`ディレクトリに静的ファイルが生成されます。

## 4. Xserverへのアップロード

### 4.1 FTP接続情報

Xserverのサーバーパネルから以下の情報を確認:
- FTPホスト名
- FTPユーザー名
- FTPパスワード

### 4.2 ファイルのアップロード

FTPクライアントを使用して、以下のファイルをアップロードします:

#### PHPバックエンド（`api`ディレクトリ）

アップロード先: `/public_html/api/`

アップロードするファイル:
- `api/composer.json`
- `api/config.php`
- `api/available-slots.php`
- `api/create-booking.php`
- `api/.htaccess`
- `api/vendor/` （ディレクトリごと）
- `api/calendar-booking-system-483704-3ba0696aeab4.json`

> **重要**: 認証情報ファイルは公開ディレクトリに配置されますが、`.htaccess`により直接アクセスは禁止されています。

#### Next.jsアプリケーション

**静的エクスポートの場合:**

アップロード先: `/public_html/`

アップロードするファイル:
- `out/` ディレクトリの内容をすべて `/public_html/` にアップロード

**Node.jsサーバーの場合:**

Xserverは標準でNode.jsをサポートしていないため、静的エクスポートを推奨します。

### 4.3 ファイルパーミッションの設定

FTPクライアントで以下のパーミッションを設定:

- `api/*.php`: 644
- `api/.htaccess`: 644
- `api/calendar-booking-system-*.json`: 600（より安全）
- `api/vendor/`: 755（ディレクトリ）

## 5. 動作確認

### 5.1 APIエンドポイントのテスト

ブラウザで以下のURLにアクセスして、APIが正しく動作するか確認:

```
https://yourdomain.com/api/available-slots.php
```

正常に動作している場合、JSON形式で空き時間が返されます。

### 5.2 予約フローのテスト

1. LPにアクセス: `https://yourdomain.com/`
2. 「無料で診断を受ける」ボタンをクリック
3. カレンダーページに遷移することを確認
4. 日付と時間を選択
5. 予約フォームに情報を入力
6. 予約を完了
7. Googleカレンダーに予定が追加されているか確認

### 5.3 トラブルシューティング

**空き時間が取得できない場合:**
- Google Calendar APIの権限設定を確認
- `api/error.log`を確認してエラーメッセージを確認
- `api/config.php`のカレンダーIDが正しいか確認

**予約が作成できない場合:**
- CORSエラーが発生していないかブラウザのコンソールを確認
- `api/config.php`の`ALLOWED_ORIGINS`に本番ドメインが含まれているか確認

**認証エラーが発生する場合:**
- 認証情報ファイルのパスが正しいか確認
- サービスアカウントの権限が正しく設定されているか確認

## 6. セキュリティ対策

### 6.1 認証情報の保護

- 認証情報ファイルは`.htaccess`で保護されていますが、可能であれば`public_html`の外に配置することを推奨
- 定期的にサービスアカウントのキーをローテーション

### 6.2 エラーログの監視

定期的に`api/error.log`を確認し、異常なアクセスやエラーがないかチェックしてください。

### 6.3 HTTPS化

必ずHTTPSを使用してください。XserverではSSL証明書を無料で取得できます。

## 7. メンテナンス

### コードの更新

1. ローカルで変更を加える
2. Gitでコミット
3. 必要に応じて再ビルド
4. FTPで変更ファイルをアップロード

### 依存関係の更新

```bash
cd api
composer update
```

更新後、`vendor`ディレクトリを再度アップロードしてください。

## サポート

問題が発生した場合は、以下を確認してください:
- Xserverのエラーログ
- `api/error.log`
- ブラウザのコンソール（開発者ツール）
