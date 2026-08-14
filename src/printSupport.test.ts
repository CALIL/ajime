// @vitest-environment jsdom
//
// 判定がブラウザ名ではなく機能の有無で行われていることを確かめる。
// 許可リスト方式(detect-browser のブラウザ名判定)に戻る変更が入れば、
// 「Safari の UA でも印刷 API があれば true」が落ちる。
import {expect, test} from 'vitest'

import {canPrint} from './printSupport'

// window のうち canPrint が見る部分だけを持つ偽オブジェクト。
// キーを渡さなければ「その機能が無いブラウザ」になる。
const fakeWindow = (props: {print?: unknown; onafterprint?: unknown; navigator?: unknown}): Window =>
    props as unknown as Window

const SAFARI_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Safari/605.1.15'

test('印刷に必要な機能がそろっていれば true', () => {
    expect(canPrint(fakeWindow({print: () => {}, onafterprint: null}))).toBe(true)
})

test('window.print が無ければ false', () => {
    expect(canPrint(fakeWindow({onafterprint: null}))).toBe(false)
})

test('afterprint に対応していなければ false', () => {
    expect(canPrint(fakeWindow({print: () => {}}))).toBe(false)
})

test('Safari の UA でも印刷 API があれば true', () => {
    const win = fakeWindow({
        print: () => {},
        onafterprint: null,
        navigator: {userAgent: SAFARI_UA},
    })
    expect(canPrint(win)).toBe(true)
})

test('引数を省略すると実行中の window を見る', () => {
    expect(canPrint()).toBe(true)
})
