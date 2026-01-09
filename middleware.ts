import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // パスワード保護の除外パス（必要に応じて追加）
  const publicPaths = ['/_next', '/api'];

  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next();
  }

  // Authorization ヘッダーから認証情報を取得
  const authHeader = request.headers.get('authorization');

  // 設定されたパスワード
  const expectedPassword = 'D0000';

  // パスワードが正しいかチェック
  if (authHeader) {
        try {
                const base64Credentials = authHeader.slice(6); // "Basic " を削除
          const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
                const [_, password] = credentials.split(':');

          if (password === expectedPassword) {
                    return NextResponse.next();
          }
        } catch (error) {
                // デコードエラーの場合は認証失敗として処理
        }
  }

  // 認証が失敗した場合、401を返す（ブラウザがBasic認証ダイアログを表示）
  return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
                'WWW-Authenticate': 'Basic realm="secure area"',
        },
  });
}

// どのパスに対してミドルウェアを適用するかを指定
export const config = {
    matcher: [
          /*
           * 以下のパスを除く全てのリクエストに対してミドルウェアを実行
           * - api (API routes)
           * - _next/static (static files)
           * - _next/image (image optimization files)
           * - favicon.ico (favicon file)
           */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
        ],
};
