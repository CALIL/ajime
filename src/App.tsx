import React, { Component } from 'react'
import JsBarcode from 'jsbarcode'
import StepWizard from 'react-step-wizard'

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
  }
  renderBarCodes() {
    if (this.canvasDiv) this.canvasDiv.innerHTML = ''
    if (this.startNumber && this.countNumber) {
      const startNumber = parseInt(this.startNumber.value)
      const countNumber = parseInt(this.countNumber.value)
      // console.log(startNumber, countNumber)
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
      const splitNumbers = splitByNumber(numbers, 44)
      splitNumbers.forEach((splitNumber) => {
        this.renderBarcode(splitNumber)
      })
    }
  }
  renderBarcode(numbers: number[]) {
    const section = document.createElement('section')
    section.className = 'sheet padding-AONE'
    numbers.forEach((number) => {
      const canvas = document.createElement('canvas')
      JsBarcode(canvas, String(number), {
        format: 'codabar',
        width: 2.25,
        height: 52,
        textMargin: 2,
        fontSize: 20,
        margin: 10
      })
      const div = document.createElement('div')
      div.className = 'barcode'
      div.appendChild(canvas)
      section.appendChild(div)
    })
    if (this.canvasDiv) {
      this.canvasDiv.appendChild(section)
    }
}

print() {
    this.renderBarCodes()
    // window.print()
}

render() {
  let custom = {
    // enterRight: 'animate__animated animate__fadeInRightBig',
    // enterLeft : 'animate__animated animate__fadeInLeftBig',
    enterRight: '',
    enterLeft : '',
    exitRight : '',
    exitLeft  : ''
  }
    return (
      <div className="App">
        <div className="steps">
          <StepWizard nav={<Nav />} transitions={custom}>
            <Step1 />
            <Step2 />
            <Step3 this={this} />
          </StepWizard>
        </div>
        <div className="canvas" ref={element => this.canvasDiv = element}></div>
      </div>
    )  
  }
}

export default App


const Nav = (props: any) => {
  return (<ol>
    <li className={props.currentStep === 1 ? 'current' : ''}>Step 1</li>
    <li className={props.currentStep === 2 ? 'current' : ''}>Step 2</li>
    <li className={props.currentStep === 3 ? 'current' : ''}>Step 3</li>
  </ol>)
}

const Step1 = (props: any) => {
  return (
    <div className="step">
      <h2>Step {props.currentStep}</h2>
      <p>テンプレートの選択</p>
      <nav>
        <button onClick={props.nextStep} className="active">次へ</button>
      </nav>
    </div>
  )
}
const Step2 = (props: any) => {
  return (
    <div className="step">
      <h2>Step {props.currentStep}</h2>
      <p>何かを選択</p>
      <nav>
        <button onClick={props.previousStep}>戻る</button>
        <button onClick={props.nextStep} className="active">次へ</button>
      </nav>
    </div>
  )
}
const Step3 = (props: any) => {
  return (
    <div className="step step3">
      <h2>Step {props.currentStep}</h2>
      <p>印刷するバーコードラベルの設定</p>
      <div>
        <input type="number" defaultValue="10000" ref={element => props.this.startNumber = element} />
        から
        <input type="number" defaultValue="100" ref={element => props.this.countNumber = element} />個
      </div>
      <nav>
        <button onClick={props.previousStep}>戻る</button>
        <button onClick={props.this.print.bind(props.this)} className="active">作成</button>
      </nav>
    </div>
  )
}