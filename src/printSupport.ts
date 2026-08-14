// 印刷できる環境かどうかを、ブラウザ名ではなく機能の有無で判定する。
//
// もともとは detect-browser でブラウザ名の許可リストを見ていた。2021-08-02 に
// 「safari を除外する」という否定形の判定を許可リストへ書き換えたもので(d83cd5ed)、
// その直後に edge-chromium を後追いで足している(dcd8f73f)。新しいブラウザが出るたびに
// 追記が必要な形になっていた。detect-browser 自体も 5.3.0 で更新が止まっている。
//
// この判定が分けているのは Settings.tsx の「正しく印刷できない可能性があります」という
// 注意書きを出すかどうかだけで、印刷ボタン自体は塞いでいない。
//
// 許可リストが実際にはどの機能の有無を表していたのかを 2026-08-14 に実測した。
// Chromium 151 / Firefox 153 / WebKit 26.5 (Safari 26.5 相当) で調べた結果、
// 印刷に関わる機能はすべて一致していた。
//
//   window.print / onbeforeprint / onafterprint      … 3エンジンとも有り
//   @page の margin と size, print-color-adjust        … 3エンジンとも解釈する
//   mm 指定、grid + mm のレイアウト                     … 3エンジンとも同値
//
// さらにビルドした本体を print メディアで描画させてラベル位置を測ったところ、WebKit の
// 結果は Chromium と完全に一致した(A4 シート 793.69 x 1118.73px、ラベル 182.55 x 96px、
// 44個、1ページ)。つまり許可リストは「無い機能」を表しておらず、2021年当時の印刷結果の
// 質の差をブラウザ名で覚えていただけだった。
//
// 用紙サイズ・倍率・余白といった印刷ダイアログ側の設定は JS から読めないので、
// 実寸で出るかどうかを機能検出で代替することはできない。そこで、このアプリが印刷のために
// 実際に使っている機能だけを直接見る形にした。どちらも欠ければ印刷は成り立たないので、
// 注意書きを出す根拠になる。

/** 「印刷する」ボタンが呼ぶ window.print() が使えるか(App.tsx の print())。 */
const canOpenPrintDialog = (win: Window): boolean => typeof win.print === 'function'

/**
 * afterprint が飛んでくるか(App.tsx の componentDidMount で購読している)。
 * 無いと印刷後に printing が false に戻らず、ボタンが読み込み中のまま止まり、
 * 6枚目以降のシートも描画されたままになる。
 */
const hasPrintLifecycleEvent = (win: Window): boolean => 'onafterprint' in win

/**
 * 印刷に必要な機能がそろっているか。
 * 実行中に変化しないので、呼び出し側で一度だけ判定すればよい。
 */
export const canPrint = (win: Window = window): boolean =>
    canOpenPrintDialog(win) && hasPrintLifecycleEvent(win)
