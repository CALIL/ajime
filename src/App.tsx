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
  startNumber: HTMLInputElement
  countNumber: HTMLInputElement
}


interface Props {
}

interface State {
  templateName: string
  perPage: number
  startNumber: string
  countNumber: number
  splitNumbers: number[][]
}


class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      templateName: 'AONE',
      perPage: 44,
      startNumber: '10000',
      countNumber: 1,
      splitNumbers: []
    }
  }

  changeStartNumber(number: string) {
    this.setState({startNumber: number})
  }

  changeCountNumber(number: string) {
    this.setState({countNumber: parseInt(number)})
  }

  renderBarCodes() {
    const startNumber = parseInt(this.state.startNumber)
    const countNumber = this.state.countNumber * this.state.perPage
    // console.log(startNumber, countNumber)
    if (countNumber >= 5000 && !confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')) return false
    const numbers: number[] = []
    let currentNumber = startNumber
    Array.from({ length: countNumber }).forEach(() => {
      numbers.push(currentNumber)
      currentNumber += 1
    })
    const splitNumbers = splitByNumber(numbers, this.state.perPage)
    this.setState({splitNumbers})
    return true
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
            <Step2
              changeStartNumber={this.changeStartNumber.bind(this)}
              changeCountNumber={this.changeCountNumber.bind(this)}
              renderBarCodes={this.renderBarCodes.bind(this)}
            />
            <Step3 />
          </StepWizard>
        </div>
        <div className="sheets">
          {this.state.splitNumbers.map((numbers, index) => (
            <section className={'sheet ' + this.state.templateName} key={index}>
            <p>
              {parseInt(this.state.startNumber) + this.state.perPage * index}-{parseInt(this.state.startNumber) - 1 + this.state.perPage * (index+1) } / {index+1}枚目
            </p>
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



