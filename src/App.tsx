import React, {Component} from 'react'

import queryString from 'query-string'
import {detect} from 'detect-browser'

import Settings from './Settings'
import Barcode from './Barcode'
import {Button, Form, Checkbox, Icon, Message, Input, Accordion, Divider, Label} from 'semantic-ui-react'

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
        Array.from({length: zeroLength}).forEach(() => zeros += '0')
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
    templateName: string // テンプレートのID
    libName: string
    perPage: number
    startNumber: string
    countNumber: string
    splitNumbers: string[][]
    suffixCheckDigit: boolean // 末尾にチェックデジットを付加するかどうか
    prefixAlphabet: string // 先頭のアルファベット（存在する場合はCODE39になる）
    prefixZero: boolean // 先頭のゼロ埋めをするかどうか
    printing: boolean // 印刷中かどうか
    supported: boolean // サポートブラウザかどうか
    noHeader: boolean // ヘッダーを表示しない
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        const ls = JSON.parse(localStorage.getItem('state') as string)
        const browser = detect()
        let supported = false
        if (browser && (browser.name === 'chrome' || browser.name === 'firefox' || browser.name === 'edge')) supported = true
        this.state = {
            templateName: ls && ls.templateName ? ls.templateName : 'aone-28368',
            libName: ls && ls.libName ? ls.libName : '',
            perPage: 0,
            startNumber: ls && ls.startNumber ? ls.startNumber : '100000',
            prefixZero: false,
            countNumber: ls && ls.countNumber ? ls.countNumber : '1',
            splitNumbers: [],
            suffixCheckDigit: false,
            prefixAlphabet: '',
            printing: false,
            supported: supported,
            noHeader: false
        }
    }

    componentDidMount() {
        const params = queryString.parse(location.hash)
        let templateName = params.template as string
        if (templateName && templates[templateName]) {
            this.setTemplate(templateName)
        } else {
            this.setTemplate(this.state.templateName)
        }
        let startNumber = params.start as string
        if (startNumber) {
            this.setState({startNumber}, () => this.setStartNumber(this.state.startNumber))
        } else {
            this.setStartNumber(this.state.startNumber)
        }
        let countNumber = params.sheet as string
        if (countNumber) this.setCountNumber(countNumber)
        let libName = params.library as string
        if (libName) this.setLibName(decodeURIComponent(libName))
        if (params.print === 'true') this.print()
        let noHeader = params.noheader as string
        if (noHeader === 'true') this.setState({noHeader: true})
        // プリントプレビューが閉じられる or 印刷開始
        window.addEventListener('afterprint', (event) => {
            this.setState({printing: false})
        })
    }

    setTemplate(templateName: string) {
        let perPage: number = templates[templateName].labelCountX * templates[templateName].labelCountY
        this.setState({perPage, templateName}, () => {
            this.renderBarCodes()
            this.saveState()
        })
    }

    setStartNumber(number: string) {
        if (number === '') return
        const prefixZero = number.match(/^[A-Z]*?0+[0-9]+/) ? true : false
        let prefixAlphabet = ''
        if (number.match(/^[A-Z]+[0-9]+C?$/)) {
            let match = number.match(/^[A-Z]+/)
            if (match) prefixAlphabet = match[0]
        }
        const suffixCheckDigit = number.match(/C$/) ? true : false
        this.setState({startNumber: number, prefixZero, suffixCheckDigit, prefixAlphabet}, () => {
            this.renderBarCodes()
            this.saveState()
        })
    }

    setCountNumber(number: string) {
        this.setState({countNumber: number}, () => {
            this.renderBarCodes()
            this.saveState()
        })
    }

    setLibName(libName: string) {
        this.setState({libName: libName}, this.saveState.bind(this))
    }

    saveState() {
        const state = {
            templateName: this.state.templateName,
            libName: this.state.libName,
            startNumber: this.state.startNumber,
            countNumber: this.state.countNumber
        }
        localStorage.setItem('state', JSON.stringify(state))
    }

    renderBarCodes() {
        const startNumber = parseInt(this.state.startNumber.replace(/[A-Z]/g, ''))
        const countNumber = parseInt(this.state.countNumber) * this.state.perPage
        const numbers: string[] = []
        let currentNumber = startNumber
        Array.from({length: countNumber}).forEach(() => {
            let tempNumber = addZero(currentNumber, this.state.prefixZero, this.state.startNumber)
            numbers.push(tempNumber)
            currentNumber += 1
        })
        const splitNumbers = splitByNumber(numbers, this.state.perPage)
        this.setState({splitNumbers})
        return true
    }

    print() {
        this.setState({printing: true}, () => {
            setTimeout(() => {
                window.print()
            }, 300)
        })
    }

    copyUrl() {
        const url = location.protocol + '//' + location.host + location.pathname + '#' + queryString.stringify({
            template: this.state.templateName,
            start: this.state.startNumber,
            library: encodeURIComponent(this.state.libName),
            sheet: this.state.countNumber
        })

        const listener = (e: any) => {
            e.clipboardData.setData('text/plain', url)
            e.preventDefault()
            document.removeEventListener('copy', listener)
        }
        document.addEventListener('copy', listener)
        document.execCommand('copy')
    }

    render() {
        return (
            <React.Fragment>
                {this.state.noHeader ? null : (
                    <header>
                        <h1>カーリルToolBox : バーコード連番印刷</h1>
                        <div style={{'position': 'absolute','top':'15px','right':'15px'}}>
                            <Button as="a" href="https://github.com/CALIL/ajime" target="_blank" color="black">
                                <Icon name='github'/> GitHub
                            </Button>
                        </div>
                    </header>
                )}
                <div className="container">
                    <Settings
                        templateName={this.state.templateName}
                        onSelectTemplate={this.setTemplate.bind(this)}
                        startNumber={this.state.startNumber}
                        countNumber={this.state.countNumber}
                        changeStartNumber={this.setStartNumber.bind(this)}
                        changeCountNumber={this.setCountNumber.bind(this)}
                        libName={this.state.libName}
                        setLibName={this.setLibName.bind(this)}
                        renderBarCodes={this.renderBarCodes.bind(this)}
                        printing={this.state.printing}
                        print={this.print.bind(this)}
                        copyUrl={this.copyUrl.bind(this)}
                        supported={this.state.supported}
                    />
                    <div className="sheets">
                        {this.state.splitNumbers.map((numbers, index) => {
                            const template = templates[this.state.templateName]
                            return <Sheet key={index} index={index}
                                          numbers={numbers}
                                          template={template}
                                          startNumber={this.state.startNumber}
                                          perPage={this.state.perPage}
                                          libName={this.state.libName}
                                          countNumber={this.state.countNumber}
                                          prefixAlphabet={this.state.prefixAlphabet}
                                          suffixCheckDigit={this.state.suffixCheckDigit}
                                          prefixZero={this.state.prefixZero}
                                          printing={this.state.printing}
                            />
                        })}
                        {this.state.splitNumbers.length > 5 ? (
                            <p className="nopreview">6枚目以降はプレビューされません</p>
                        ) : null}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default App


const Sheet = (props: any) => {
    const {index, numbers, template, startNumber, perPage, libName, prefixAlphabet, suffixCheckDigit, prefixZero, printing, countNumber} = props
    if (printing === false && index >= 5) return null
    const startNumberString = addZero(parseInt(startNumber.replace(/[A-Z]/g, '')), prefixZero, startNumber)
    const endNumberString = addZero(parseInt(startNumber.replace(/[A-Z]/g, '')) + perPage * countNumber - 1, prefixZero, startNumber)
    return (<section className={'sheet'}
                     style={{
                         paddingTop: template.marginTop,
                         paddingLeft: template.marginLeft,
                         display: 'grid',
                         gridTemplateColumns: `repeat(${template.labelCountX}, ${template.labelWidth})`,
                         gridTemplateRows: `repeat(${template.labelCountY}, ${template.labelHeight})`,
                         columnGap: template.gapX,
                         rowGap: template.gapY,
                     }}>
        <p
            style={{
                position: 'absolute',
                top: (parseFloat(template.marginTop) - 4.5) > 0 ? (parseFloat(template.marginTop) - 4.5) + 'mm' : '0',
                right: template.headerPosition === 'right' ? parseInt(template.marginLeft) + parseInt(template.gapX) + 'mm' : 'auto',
                left: template.headerPosition === 'left' ? parseInt(template.marginLeft) + parseInt(template.gapX) + 'mm' : 'auto',
                fontSize: '3mm',
                lineHeight: '3mm'
            }}>
            {prefixAlphabet}{startNumberString}{suffixCheckDigit ? 'C' : ''}～{prefixAlphabet}{endNumberString}{suffixCheckDigit ? 'C' : ''} 【{prefixAlphabet !== '' ? 'CODE39' : 'NW-7'}{suffixCheckDigit ? ' (M10W21)' : ''}】 {index + 1}/{countNumber}シート
        </p>
        {numbers.map((number: string) => {
            let checkDigitNumber: number | null = null
            if (suffixCheckDigit) checkDigitNumber = calcCheckDigit(number.replace(/[A-Z]/g, ''))
            return <Barcode number={number} checkDigit={checkDigitNumber} prefixAlphabet={prefixAlphabet} libName={libName} template={template} key={number}/>
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


