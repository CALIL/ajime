import React, { Component } from 'react'
import StepWizard from 'react-step-wizard'
// @ts-ignore
import useDetectPrint from 'react-detect-print'

import queryString from 'query-string'

import { Nav, Step1, Step2, Step3 } from './Steps'
import Barcode from './Barcode'

import templates from './templates/index'

// モジュラス10 ウェイト2・1分割(Luhn formula)（M10W21）
// 1.数値の各桁に、下の桁から２・１・２・１・…の順番に係数（ウェイト）を掛けます。
// 2.各桁の結果が2桁の場合には、十の位と一の位を分けて足し合わせます（分割）。
// 3.それぞれの合計を求めます。
// 4.合計を10で割り、余りを求めます（モジュラス）。
// 5.この余りを 10 から引いたもの(10 - 余り)がチェックデジットです。ただし余りが0の場合はチェックデジットも「0」になります。
const calcCheckDigit = (code: string) => {
  const dividedNumber = code.split('').reverse().map((n, index) => {
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
// console.log(calcCheckDigit('000019'))
// console.log(calcCheckDigit('20151119'))
// console.log(calcCheckDigit('20151149'))
// console.log(calcCheckDigit('12345678'))


// 配列をn個毎の配列に分割して返す関数
const splitByNumber = (sourceArray: any[], splitNumber: number) => {
  const result = []
  for (let i = 0; i < sourceArray.length; i += splitNumber) {
    const subArray = sourceArray.slice(i, i + splitNumber)
    result.push(subArray)
  }
  return result
}


const addZero = (number: number, isStartZero: boolean, startNumber: string): string => {
  let zeros = ''
  if (isStartZero) {
    const zeroLength = startNumber.replace(/[A-Z]/g, '').length - String(number).length
    Array.from({ length: zeroLength }).forEach(() => zeros += '0')
  }
  return zeros + String(number)
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
  splitNumbers: string[][]
  checkDigit: boolean
  univStartAlphabet: string | null
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
      univStartAlphabet: null
    }
  }

  componentDidMount() {
    if (location.hash === '') {
      this.setTemplate('aone-28368', false)
      this.setStartNumber(this.state.startNumber)
    } else {
      const params = queryString.parse(location.hash)
      let templateName = params.template as string
      if (templateName && templates[templateName]) {
        this.setTemplate(templateName, false)
      }
      let startNumber = params.startNumber as string
      if (startNumber) {
        this.setState({ startNumber }, () => this.setStartNumber(this.state.startNumber))
      } else {
        this.setStartNumber(this.state.startNumber)
      }
    }
  }

  setTemplate(templateName: string, setHash: boolean = true) {
    let perPage: number = templates[templateName].labelCountX * templates[templateName].labelCountY
    this.setState({ perPage, templateName }, () => {
      this.renderBarCodes()
      this.saveState()
    })
    if (setHash) {
      location.hash = queryString.stringify({ template: templateName })
    }
  }

  setStartNumber(number: string) {
    if (number === '') return
    const isStartZero = number.match(/^[A-Z]*?0+[0-9]+/) ? true : false
    let univStartAlphabet = null
    if (number.match(/^[A-Z]+[0-9]+C?$/)) {
      let match = number.match(/^[A-Z]+/)
      if (match) univStartAlphabet = match[0]
    }
    const checkDigit = number.match(/C$/) ? true : false
    this.setState({ startNumber: number, isStartZero, checkDigit, univStartAlphabet }, () => {
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

  renderBarCodes() {
    const startNumber = parseInt(this.state.startNumber.replace(/[A-Z]/g, ''))
    const countNumber = parseInt(this.state.countNumber) * this.state.perPage
    // console.log(startNumber, countNumber)
    // if (countNumber >= 5000 && !confirm('バーコードの数が多いとブラウザの動作が遅くなる可能性があります。実行しますか？')) return false
    const numbers: string[] = []
    let currentNumber = startNumber
    Array.from({ length: countNumber }).forEach(() => {
      let tempNumber = addZero(currentNumber, this.state.isStartZero, this.state.startNumber)
      numbers.push(tempNumber)
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
            <Step3 countNumber={this.state.countNumber} />
          </StepWizard>
        </div>
        <div className="sheets">
          {this.state.splitNumbers.map((numbers, index) => {
            const template = templates[this.state.templateName]
            return <Sheet key={index} index={index} numbers={numbers} template={template} startNumber={this.state.startNumber} perPage={this.state.perPage} libName={this.state.libName} univStartAlphabet={this.state.univStartAlphabet} checkDigit={this.state.checkDigit} isStartZero={this.state.isStartZero} />
          })}
          {this.state.splitNumbers.length > 5 ? (
            <p className="nopreview">6枚目以降はプレビューされません</p>
          ) : null}
        </div>
        <footer>
          <span className="poweredby"></span>
        </footer>
      </div>
    )
  }
}

export default App


const Sheet = (props: any) => {
  const { index, numbers, template, startNumber, perPage, libName, univStartAlphabet, checkDigit, isStartZero } = props
  const printing = useDetectPrint()
  if (printing===false && index >= 5) return null 
  const startNumberString = addZero(parseInt(startNumber.replace(/[A-Z]/g, '')) + perPage * index, isStartZero, startNumber)
  const endNumberString = addZero(parseInt(startNumber.replace(/[A-Z]/g, '')) - 1 + perPage * (index + 1), isStartZero, startNumber)
  return (<section className={'sheet'}
    style={{
      paddingTop: template.marginTop,
      paddingLeft: template.marginLeft,
      display: 'grid',
      gridTemplateColumns: `repeat(${template.labelCountX}, ${template.labelWidth})`,
      gridTemplateRows: `repeat(${template.labelCountY}, ${template.labelHeight})`,
      columnGap: template.gapX,
      rowGap: template.gapY,
    }}
  >
    <p
      style={{
        position: 'absolute',
        top: (parseFloat(template.marginTop) - 7) > 0 ? (parseFloat(template.marginTop) - 7) / 2 + 'mm' : '0',
        right: template.headerPosition === 'right' ? parseInt(template.marginLeft) + parseInt(template.gapX) + 'mm' : 'auto',
        left: template.headerPosition === 'left' ? parseInt(template.marginLeft) + parseInt(template.gapX) + 'mm' : 'auto',
        fontSize: '3mm'
      }}
    >
      {startNumberString}-{endNumberString} / {univStartAlphabet !== null ? 'Code39' : 'NW-7'}{checkDigit ? ' (M10W21)' : ''} / {index + 1}枚目
    </p>
    {numbers.map((number: string) => {
      let checkDigitNumber: number | null = null
      if (checkDigit) checkDigitNumber = calcCheckDigit(number.replace(/[A-Z]/g, ''))
      return <Barcode number={number} checkDigit={checkDigitNumber} univStartAlphabet={univStartAlphabet} libName={libName} template={template} key={number} />
    })}
    <img src="./assets/calil.svg" alt="カーリル"
      className="logo"
      style={{
        position: 'absolute',
        bottom: (parseFloat(template.marginTop) - 7) > 0 ? (parseFloat(template.marginTop) - 7) + 'mm' : '0',
        left: parseInt(template.marginLeft) + parseInt(template.gapX) + 'mm',
        fontSize: '3mm'
      }}
    />
  </section>)
}


