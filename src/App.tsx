import React, { Component } from 'react'
import JsBarcode from 'jsbarcode'


interface App {
  canvasDiv: HTMLDivElement | null
  startNumber: HTMLInputElement | null
  endNumber: HTMLInputElement | null
}


interface Props {
}

interface State {
}


class App extends Component<Props, State> {
  constructor(props:Props) {
      super(props)
      this.state = {
      }
      this.canvasDiv = null
      this.startNumber = null
      this.endNumber = null
  }
  componentDidMount() {
    // this.renderBarcode('123456789')
    this.renderBarCodes()
  }
  renderBarCodes() {
    if (this.startNumber && this.endNumber) {
      const startNumber = parseInt(this.startNumber.value)
      const endNumber = parseInt(this.endNumber.value)
      // console.log(startNumber, endNumber)
      if (startNumber >= endNumber) return console.log('数字の指定が間違っています')
      if (endNumber - startNumber >= 1000) {
        if (!confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')){
          return
        }
      }
      let currentNumber = startNumber
      while(currentNumber <= endNumber) {
        // console.log(currentNumber)
        this.renderBarcode(currentNumber)
        currentNumber += 1
      }
    }
  }
  renderBarcode(number: number) {
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, String(number), {
      format: 'codabar',
      width: 2,
      height: 75
    })
    if (this.canvasDiv) {
      this.canvasDiv.appendChild(canvas)
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <div>
            <label htmlFor=""></label>
            <input type="number" defaultValue="10000" ref={element => this.startNumber = element} />
            -
            <label htmlFor=""></label>
            <input type="number" defaultValue="10100" ref={element => this.endNumber = element} />
            <button onClick={this.renderBarCodes.bind(this)}>バーコード作成</button>
          </div>
          <button onClick={print}>印刷</button>
        </header>
        <div ref={element => this.canvasDiv = element}></div>
      </div>
    )  
  }
}

export default App
