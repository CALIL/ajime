import React, { Component } from 'react'
import StepWizard from 'react-step-wizard'

import {Nav, Step1, Step2, Step3} from './Steps'

// 配列をn個毎の配列に分割して返す関数
const splitByNumber = (sourceArray: any[], splitNumber: number) => {
  const sourceArrayLength = sourceArray.length
  var splitArray = []
  for (var i = 0; i < Math.ceil(sourceArrayLength / splitNumber); i++) {
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
  splitNumbers: number[][]
}


class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      splitNumbers: []
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
        if (!confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')) {
          return
        }
      }
      const numbers: any[] = []
      let currentNumber = startNumber
      Array.from({ length: countNumber }).forEach(() => {
        numbers.push(currentNumber)
        currentNumber += 1
      })
      const splitNumbers = splitByNumber(numbers, 44)
      this.setState({splitNumbers})
    }
  }

  print() {
    this.renderBarCodes()
    window.print()
  }

  render() {
    let custom = {
      // enterRight: 'animate__animated animate__fadeInRightBig',
      // enterLeft : 'animate__animated animate__fadeInLeftBig',
      enterRight: '',
      enterLeft: '',
      exitRight: '',
      exitLeft: ''
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
        <div className="canvas" ref={element => this.canvasDiv = element}>
          {this.state.splitNumbers.map((numbers) => (
            <section className="sheet padding-AONE">
            {numbers.map((number) => (
                <Barcode number={String(number)} />
            ))}
            </section>
          ))}
        </div>
      </div>
    )
  }
}

export default App



