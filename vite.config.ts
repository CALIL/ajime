import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/ajime/',

  // publicDir はそのまま dist へコピーされる場所。既定の public/ を使う。
  // ここを src/ にすると .tsx や .sass までコピーされて公開されてしまう。
  //
  // 入れているのは、ビルド時にバンドルされない3つだけ。
  //   CNAME              … Pages のカスタムドメイン（配信に必須）
  //   assets/calil.svg   … App.tsx が文字列のパスで参照している
  //   assets/favicon.png … index.html が参照している
  //
  // フォント（src/fonts）とテンプレート（src/templates）は
  // sass の url() と import から Vite がバンドルするので、ここには要らない。
})
