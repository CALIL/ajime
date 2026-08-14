import React, {Component} from 'react'

import templates from './templates/index'

interface Props {
    templateName: string
    onSelectTemplate: (templateName: string, setHash?: boolean) => void
    startNumber: string
    countNumber: string
    changeStartNumber: (number: string) => void
    changeCountNumber: (number: string) => void
    libName: string
    setLibName: (libName: string) => void
    renderBarCodes: () => void
    printing: boolean
    print: () => void
    copyUrl: () => void
    printSupported: boolean // 印刷に必要な機能がそろっているか
}

interface State {
    activeIndex: number
}


export default class Settings extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            activeIndex: 0
        }
    }

    handleClick = (index: number) => {
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({activeIndex: newIndex})
    }

    render() {
        const {activeIndex} = this.state
        let countPerPage = 0
        let isWideHeight = false

        Object.values(templates).forEach((template: any) => {
                if (template.id === this.props.templateName) {
                    countPerPage = template.labelCountX * template.labelCountY
                    if (parseInt(template.labelHeight) > 20) {
                        isWideHeight = true
                    }
                }
            }
        )

        return (
            <div className="settings">
                <div>
                    {this.props.printSupported === false ? (
                        <div className="ui small negative message">
                            お使いのブラウザでは正しく印刷できない可能性があります。以下のブラウザを推奨します。
                            <ul>
                                <li><a href="https://www.microsoft.com/ja-jp/edge" target="_blank">Microsoft Edge <i className="external icon" aria-hidden="true"/></a></li>
                                <li><a href="https://www.google.co.jp/chrome/index.html" target="_blank">Google Chrome <i className="external icon" aria-hidden="true"/></a></li>
                                <li><a href="https://www.mozilla.org/ja/firefox/" target="_blank">Firefox <i className="external icon" aria-hidden="true"/></a></li>
                            </ul>
                        </div>
                    ) : null}
                    <div className="setting">
                        <div className="ui fluid accordion">
                            <div className={activeIndex === 0 ? 'active title' : 'title'} onClick={() => this.handleClick(0)}>
                                <i className="dropdown icon" aria-hidden="true"/>
                                ラベル用紙を選ぶ
                            </div>
                            <div className={activeIndex === 0 ? 'active content' : 'content'}>
                                <form className="ui form">
                                    <div className="grouped fields">
                                        {Object.values(templates).map((template: any) => (
                                            <div className="field" key={template.id}>
                                                <div className="ui radio checkbox">
                                                    <input
                                                        type="radio"
                                                        id={'template-' + template.id}
                                                        name="template"
                                                        value={template.id}
                                                        checked={template.id === this.props.templateName}
                                                        onChange={(e) => this.props.onSelectTemplate(e.target.value)}
                                                    />
                                                    <label htmlFor={'template-' + template.id}>{template.name}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ui small message">
                                        <div>
                                            以下の用紙に対応しています。
                                            <ul>
                                                {Object.values(templates).map((template: any) => {
                                                        if (template.id === this.props.templateName) {
                                                            return Object.values(template.sku).map((sku: any) => (
                                                                <li key={sku[0]}><a href={sku[1]} target="_blank">{sku[0]} <i className="external icon" aria-hidden="true"/></a></li>
                                                            ))
                                                        }
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className={activeIndex === 1 ? 'active title' : 'title'} onClick={() => this.handleClick(1)}>
                                <i className="dropdown icon" aria-hidden="true"/>
                                内容を決める
                            </div>
                            <div className={activeIndex === 1 ? 'active content' : 'content'}>
                                <form className="ui form">
                                    <div className="ui small message">
                                        <div>
                                            <ul style={{paddingLeft: '10px'}}>
                                                <li>6桁～10桁程度が一般的です</li>
                                                <li>最後にCを入力するとチェックデジットを付与します</li>
                                                <li>先頭に0を入力すると「ゼロ埋め」ができます</li>
                                                <li>エクセルなどで扱いやすくするたに「100000」などのようにゼロ埋めを不要とするのがおすすめです</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label>開始番号</label>
                                        <div className="ui input startnum">
                                            <input placeholder='000000...' value={this.props.startNumber} maxLength={14} required onChange={(e) => {
                                                if (e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)) {
                                                    this.props.changeStartNumber(e.target.value.toUpperCase())
                                                } else {
                                                    e.target.value = this.props.startNumber
                                                }
                                            }}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>図書館名</label>
                                        <div className="ui input">
                                            <input placeholder='カーリル図書館' value={this.props.libName} onChange={(e) => this.props.setLibName(e.target.value)}/>
                                        </div>
                                        {(isWideHeight == false && this.props.libName.length > 0) ? (
                                            <div className="ui pointing label">
                                                ラベルが小さいため印刷されません
                                            </div>
                                        ) : null}
                                    </div>


                                </form>
                            </div>

                            <div className={activeIndex === 2 ? 'active title' : 'title'} onClick={() => this.handleClick(2)}>
                                <i className="dropdown icon" aria-hidden="true"/>
                                枚数を決める
                            </div>
                            <div className={activeIndex === 2 ? 'active content' : 'content'}>
                                <form className="ui form">
                                    <div className="field">
                                        <label>印刷するシートの枚数</label>
                                        <div className="ui input countNumber">
                                            <input type="number" value={this.props.countNumber} min="1" max="300" required onChange={(e) => this.props.changeCountNumber(e.target.value)}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="ui divider"/>
                        <div style={{'marginTop': '10px', 'textAlign': 'center'}}>
                            <p style={{"marginBottom": '10px'}}>合計 {parseInt(this.props.countNumber) * countPerPage} 個のバーコード</p>
                            <button
                                className={'ui primary big icon right labeled button' + (this.props.printing ? ' loading' : '')}
                                onClick={this.props.print}
                            >印刷する<i className="print icon" aria-hidden="true"/></button>
                        </div>
                    </div>
                    <div className="cppyLink">
                        <div onClick={this.props.copyUrl}>
                            <i className="copy outline icon"></i><span>設定をURLとしてコピー</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

