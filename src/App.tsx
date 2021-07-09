import React, { Component } from 'react'
import JsBarcode from 'jsbarcode'

// 配列をn個毎の配列に分割して返す関数
const splitByNumber = (sourceArray: any[], splitNumber: number) => {
  const sourceArrayLength  = sourceArray.length
  var splitArray = []
  for(var i = 0; i < Math.ceil(sourceArrayLength / splitNumber); i++) {
      const array = sourceArray.slice(i * splitNumber, i * splitNumber + splitNumber)
      splitArray.push(array)
  }
  return splitArray
}


interface App {
  canvasDiv: HTMLDivElement | null
  startNumber: HTMLInputElement | null
  countNumber: HTMLInputElement | null
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
      this.countNumber = null
  }
  componentDidMount() {
    // this.renderBarcode('123456789')
    this.renderBarCodes()
  }
  renderBarCodes() {
    if (this.canvasDiv) this.canvasDiv.innerHTML = ''
    if (this.startNumber && this.countNumber) {
      const startNumber = parseInt(this.startNumber.value)
      const countNumber = parseInt(this.countNumber.value)
      // console.log(startNumber, endNumber)
      if (countNumber >= 1000) {
        if (!confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')){
          return
        }
      }
      const numbers:any[] = []
      let currentNumber = startNumber
      Array.from({length: countNumber}).forEach(() => {
        numbers.push(currentNumber)
        currentNumber += 1
      })
      const splitNumbers = splitByNumber(numbers, 28)
      splitNumbers.forEach((ns) => {
        this.renderBarcode(ns)
      })
    }
  }
  renderBarcode(numbers: number[]) {
    const div = document.createElement('div')
    div.className = 'sheet padding-10mm'
    numbers.forEach((number) => {
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, String(number), {
        format: 'codabar',
        width: 2,
        height: 75
      })
      div.appendChild(canvas)
    })
    if (this.canvasDiv) {
      this.canvasDiv.appendChild(div)
    }
}
  render() {
    return (
      <div className="App">
        <header>
          <div>
            <label htmlFor=""></label>
            <input type="number" defaultValue="10000" ref={element => this.startNumber = element} />
            から
            <label htmlFor=""></label>
            <input type="number" defaultValue="100" ref={element => this.countNumber = element} />個
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
