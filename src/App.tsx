import React, { Component } from 'react'
import StepWizard from 'react-step-wizard'

import queryString from 'query-string'

import { Nav, Step1, Step2, Step3 } from './Steps'
import Barcode from './Barcode'

import presets from './preset/index'

// モジュラス10 ウェイト2・1分割(Luhn formula)（M10W21）
// 1.数値の各桁に、下の桁から２・１・２・１・…の順番に係数（ウェイト）を掛けます。
// 2.各桁の結果が2桁の場合には、十の位と一の位を分けて足し合わせます（分割）。
// 3.それぞれの合計を求めます。
// 4.合計を10で割り、余りを求めます（モジュラス）。
// 5.この余りを 10 から引いたもの(10 - 余り)がチェックデジットです。ただし余りが0の場合はチェックデジットも「0」になります。
const calcCheckDigit = (code: number) => {
  const dividedNumber = code.toString().split('').reverse().map((n, index) => {
    const number = parseInt(n)
    if (index % 2 === 0) {
      const calcNumber = number * 2
      return calcNumber.toString().split('').reduce((prev, current) => prev + parseInt(current), 0)
    } else {
      return number
    }
  })
  const sum = dividedNumber.reduce((prev, current) => prev + current, 0)
  if (sum % 10 === 0) return 0
  return 10 - sum % 10
}
// console.log(calcCheckDigit(20151119))
// console.log(calcCheckDigit(20151149))
// console.log(calcCheckDigit(12345678))


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
  checkDigit: boolean
  isCode39: boolean
}  

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const isState = localStorage.getItem('state') as string
    const state = JSON.parse(isState)
    this.state = {
      templateName: isState ? state.templateName : '',
      libName: isState ? state.libName : '',
      perPage: 0,
      startNumber: isState ? state.startNumber : '10000',
      isStartZero: false,
      countNumber: '1',
      splitNumbers: [],
      checkDigit: false,
      isCode39: false
    }
  }

  componentDidMount() {
    if (location.hash === '') {
      this.setTemplate('aone-28368', false)
    } else {
      const params = queryString.parse(location.hash)
      let templateName = params.template as string
      if (templateName && presets[templateName]) {
        this.setTemplate(templateName)
      }
      let checkDigit = params.checkDigit as string
      if (checkDigit === 'true') {
        this.setState({ checkDigit: true })
      }
    }
    this.setStartNumber(this.state.startNumber)
  }

  setTemplate(templateName: string, setHash: boolean = true) {
    let perPage: number = presets[templateName].labelCountX * presets[templateName].labelCountY
    this.setState({ perPage, templateName }, () => {
      this.renderBarCodes()
      this.saveState()
    })
    if (setHash) {
      const qs = queryString.parse(location.hash)
      const params = { template : templateName, checkDigit: false }
      if (qs.checkDigit==='true') params.checkDigit = true
      location.hash = queryString.stringify(params)
    }
  }

  setStartNumber(number: string) {
    if (number === '') return
    const isStartZero = number.match(/^[A-Z]?0+[0-9]+/) ? true : false
    const isCode39 = number.match(/^[A-Z]+[0-9]+$/) ? true : false
    this.setState({ startNumber: number, isStartZero: isStartZero, isCode39 }, () => {
      this.renderBarCodes()
      this.saveState()
    })
  }

  setCountNumber(number: string) {
    this.setState({ countNumber: number }, this.renderBarCodes.bind(this))
  }

  setLibName(libName: string) {
    this.setState({ libName: libName }, this.saveState.bind(this))
  }

  saveState() {
    const state = {
      templateName: this.state.templateName,
      libName: this.state.libName,
      startNumber: this.state.startNumber
    }
    localStorage.setItem('state', JSON.stringify(state))
  }

  addZero(number: number): string {
    let zeros = ''
    if (this.state.isStartZero) {
      const zeroLength = this.state.startNumber.length - String(number).length
      Array.from({ length: zeroLength }).forEach(() => zeros += '0')
    }
    return zeros + String(number)
  }

  renderBarCodes() {
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
              templateName={this.state.templateName}
              onSelectTemplate={this.setTemplate.bind(this)}
            />
            <Step2
              startNumber={this.state.startNumber}
              countNumber={this.state.countNumber}
              changeStartNumber={this.setStartNumber.bind(this)}
              changeCountNumber={this.setCountNumber.bind(this)}
              libName={this.state.libName}
              setLibName={this.setLibName.bind(this)}
              renderBarCodes={this.renderBarCodes.bind(this)}
            />
            <Step3 />
          </StepWizard>
        </div>
        <div className="sheets">
          {this.state.splitNumbers.map((numbers, index) => {
            const preset = presets[this.state.templateName]
            return (<section className={'sheet ' + this.state.templateName} key={index}
              style={{
                paddingTop: preset.marginTop,
                paddingLeft: preset.marginLeft,
                display: 'grid',
                gridTemplateColumns: `repeat(${preset.labelCountX}, ${preset.labelWidth})`,
                gridTemplateRows: `repeat(${preset.labelCountY}, ${preset.labelHeight})`,
                columnGap: preset.gapX,
                rowGap: preset.gapY,
              }}
            >
              <p
                style={{
                  position: 'absolute',
                  top: (parseFloat(preset.marginTop) - 7) > 0 ? (parseFloat(preset.marginTop) - 7) / 2 + 'mm' : '0',
                  right: parseInt(preset.marginLeft) + parseInt(preset.gapX) + 'mm',
                  fontSize: '3mm'
                }}
              >
                {this.addZero(parseInt(this.state.startNumber) + this.state.perPage * index)}-{this.addZero(parseInt(this.state.startNumber) - 1 + this.state.perPage * (index + 1))} / {index + 1}枚目
              </p>
              {numbers.map((number) => {
                let checkDigit: number | null = null
                if (this.state.checkDigit) checkDigit = calcCheckDigit(number)
                return <Barcode number={String(number)} checkDigit={checkDigit} isCode39={this.state.isCode39} libName={this.state.libName} preset={preset} key={number} />
              })}
            </section>)
          })}
        </div>
        <footer>
          <span className="poweredby"></span>
        </footer>
      </div>
    )
  }
}

export default App



