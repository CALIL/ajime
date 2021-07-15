import React, { Component } from 'react'
import StepWizard from 'react-step-wizard'

// @ts-ignore
import JSURL from 'jsurl'


import { Nav, Step1, Step2, Step3 } from './Steps'
import Barcode from './Barcode'

import presets from './preset/index'

// 配列をn個毎の配列に分割して返す関数
const splitByNumber = (sourceArray: any[], splitNumber: number) => {
  const result = []
  for (let i = 0; i < sourceArray.length; i += splitNumber) {
    const subArray = sourceArray.slice(i, i + splitNumber)
    result.push(subArray)
  }
  return result
}

interface App {
  startNumber: HTMLInputElement
  countNumber: HTMLInputElement
}


interface Props {
}

interface State {
  templateName: string
  libName: string
  perPage: number
  startNumber: string
  isStartZero: boolean
  countNumber: string
  splitNumbers: number[][]
}


class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      templateName: '',
      libName: '',
      perPage: 0,
      startNumber: '00001',
      isStartZero: true,
      countNumber: '1',
      splitNumbers: []
    }
  }

  componentDidMount() {
    if (location.hash === '') {
      this.setTemplate('aone-28368')
    } else {
      const hashPreset = JSURL.parse(location.hash.substr(1))
      presets['fromHash'] = hashPreset
      this.setTemplate('fromHash')
      if (hashPreset.printNow) print()
    }
  }

  setTemplate(templateName: string) {
    let perPage: number = presets[templateName].labelCountX * presets[templateName].labelCountY
    this.setState({ perPage, templateName }, this.renderBarCodes.bind(this))
    // location.hash = JSURL.stringify(presets[templateName])
  }

  setStartNumber(number: string) {
    if (number === '') return
    const isStartZero = number.match(/0+[0-9]+/) ? true : false
    this.setState({ startNumber: number, isStartZero: isStartZero }, this.renderBarCodes.bind(this))
  }

  setCountNumber(number: string) {
    this.setState({ countNumber: number }, this.renderBarCodes.bind(this))
  }

  setLibName(libName: string) {
    this.setState({ libName: libName })
  }

  addZero(number: number): string {
    let zeros = ''
    if (this.state.isStartZero) {
      const zeroLength = this.state.startNumber.length - String(number).length
      Array.from({length: zeroLength}).forEach(() => zeros += '0')
    }
    return zeros + String(number)
  }
  
  renderBarCodes() {
    const isStartZero = this.state.startNumber.match(/0+[0-9]+/) ? true : false
    const startNumber = parseInt(this.state.startNumber)
    const countNumber = parseInt(this.state.countNumber) * this.state.perPage
    // console.log(startNumber, countNumber)
    // if (countNumber >= 5000 && !confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')) return false
    const numbers: string[] = []
    let currentNumber = startNumber
    Array.from({ length: countNumber }).forEach(() => {
      numbers.push(this.addZero(currentNumber))
      currentNumber += 1
    })
    const splitNumbers = splitByNumber(numbers, this.state.perPage)
    this.setState({ splitNumbers })
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
            <Step1
              templateIndex={0}
              onSelectTemplate={this.setTemplate.bind(this)}
              fromHash={typeof presets['fromHash'] !== 'undefined'}
            />
            <Step2
              startNumber={this.state.startNumber}
              countNumber={this.state.countNumber}
              changeStartNumber={this.setStartNumber.bind(this)}
              changeCountNumber={this.setCountNumber.bind(this)}
              setLibName={this.setLibName.bind(this)}
              renderBarCodes={this.renderBarCodes.bind(this)}
            />
            <Step3 />
          </StepWizard>
        </div>
        <div className="sheets">
          {this.state.splitNumbers.map((numbers, index) => (
            <section className={'sheet ' + this.state.templateName} key={index}
              style={{
                paddingTop: presets[this.state.templateName].marginTop,
                paddingLeft: presets[this.state.templateName].marginLeft
              }}
            >
              <p
                style={{
                  position: 'absolute',
                  // top: '-' + (parseFloat(presets[this.state.templateName].marginTop) / 100) + 'mm',
                  top: 0,
                  right: parseInt(presets[this.state.templateName].marginLeft) + parseInt(presets[this.state.templateName].gapX) + 'mm',
                  fontSize: '3mm'
                }}
              >
                {this.addZero(parseInt(this.state.startNumber) + this.state.perPage * index)}-{this.addZero(parseInt(this.state.startNumber) - 1 + this.state.perPage * (index + 1))} / {index + 1}枚目
              </p>
              {numbers.map((number) => (
                <Barcode number={String(number)} libName={this.state.libName} preset={presets[this.state.templateName]} key={number} />
              ))}
            </section>
          ))}
        </div>
      </div>
    )
  }
}

export default App



