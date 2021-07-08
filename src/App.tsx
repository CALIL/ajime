import React, { useState } from 'react'
import JsBarcode from 'jsbarcode'

function App() {
  const [count, setCount] = useState(0)

  const ref = React.useRef<HTMLDivElement>(null);

  const cont = React.useRef(0);
  React.useEffect(() => {
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, '1234567890', {
      format: 'codabar'
    })
    if (ref && ref.current) {
      ref.current.appendChild(canvas)
      cont.current = cont.current + 1
      console.log(cont)
    }
  }, [ref])

  return (
    <div className="App">
      <div ref={ref}></div>
    </div>
  )
}

export default App
