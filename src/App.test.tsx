// @vitest-environment jsdom
//
// マウントスモークテスト。
// ビルドや型チェックでは検出できない「マウント時に例外が出て画面が真っ白になる」
// 事故(2026-08-07 の React 19 化で semantic-ui-react 内部の findDOMNode 呼び出しが
// クラッシュし、本番が4日間白画面になった)を PR の時点で捕まえるためのもの。
// renderToStaticMarkup による比較では componentDidMount が走らず検出できないので、
// 必ず createRoot で実際にマウントする。
import React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, test } from 'vitest'

import App from './App'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true

test('App がマウントでき、画面に何かが描画される', async () => {
    const container = document.body.appendChild(document.createElement('div'))
    await act(async () => {
        createRoot(container).render(
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        )
    })
    expect(container.children.length).toBeGreaterThan(0)
})
