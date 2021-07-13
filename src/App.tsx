import React, { Component } from 'react'
import StepWizard from 'react-step-wizard'

import {Nav, Step1, Step2, Step3} from './Steps'
import Barcode from './Barcode'

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
  perPage: number
  splitNumbers: number[][]
}


class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      perPage: 44,
      splitNumbers: []
    }
    this.startNumber = null
    this.countNumber = null
  }

  renderBarCodes() {
    if (this.startNumber && this.countNumber) {
      const startNumber = parseInt(this.startNumber.value)
      const countNumber = parseInt(this.countNumber.value)
      // console.log(startNumber, countNumber)
      if (countNumber >= 1000) {
        if (!confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')) {
          return
        }
      }
      const numbers: number[] = []
      let currentNumber = startNumber
      Array.from({ length: countNumber }).forEach(() => {
        numbers.push(currentNumber)
        currentNumber += 1
      })
      const splitNumbers = splitByNumber(numbers, this.state.perPage)
      this.setState({splitNumbers})
    }
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
            <Step2 this={this} />
            <Step3 />
          </StepWizard>
        </div>
        <div className="canvas">
          {this.state.splitNumbers.map((numbers, index) => (
            <section className="sheet AONE" key={index}>
            {numbers.map((number) => (
                <Barcode number={String(number)} key={number} />
            ))}
            </section>
          ))}
        </div>
      </div>
    )
  }
}

export default App



