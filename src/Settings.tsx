import React, {Component} from 'react'

import templates from './templates/index'
import {Button, Form, Checkbox, Icon, Message, Input, Accordion, Divider, Label} from 'semantic-ui-react'

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

    handleClick = (e: any, titleProps: any) => {
        const {index} = titleProps
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

                <Accordion fluid>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        ラベル用紙を選ぶ
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Form>
                            <Form.Group grouped>
                                {Object.values(templates).map((template: any) => (
                                    <Form.Field key={template.id}>
                                        <Checkbox
                                            radio
                                            label={template.name}
                                            name='template'
                                            value={template.id}
                                            checked={template.id === this.props.templateName}
                                            onChange={(e, {value}) => this.props.onSelectTemplate(value as string)}
                                        />
                                    </Form.Field>
                                ))}
                            </Form.Group>
                            <Message size='small'>
                                <p>
                                    以下の用紙に対応しています。
                                    <ul>
                                        {Object.values(templates).map((template: any) => {
                                                if (template.id === this.props.templateName) {
                                                    return Object.values(template.sku).map((sku: any) => (
                                                        <li key={sku[0]}><a href={sku[1]} target="_blank">{sku[0]} <Icon name='external'/></a></li>
                                                    ))
                                                }
                                            }
                                        )}
                                    </ul>
                                </p>
                            </Message>
                        </Form>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        内容を決める
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Form>
                            <Message size='small'>
                                <p>
                                    <ul style={{paddingLeft: '10px'}}>
                                        <li>6桁～10桁程度が一般的です</li>
                                        <li>最後にCを入力するとチェックデジットを付与します</li>
                                        <li>先頭に0を入力すると「ゼロ埋め」ができます</li>
                                        <li>エクセルなどで扱いやすくするたに「100000」などのようにゼロ埋めを不要とするのがおすすめです</li>
                                    </ul>
                                </p>
                            </Message>

                            <Form.Field>
                                <label>開始番号</label>
                                <Input placeholder='000000...' className="startnum" value={this.props.startNumber} maxLength={16} required onChange={(e, value) => {
                                    if (e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)) {
                                        this.props.changeStartNumber(e.target.value.toUpperCase())
                                    } else {
                                        e.target.value = this.props.startNumber
                                    }
                                }}/>
                            </Form.Field>
                            <Form.Field>
                                <label>図書館名</label>
                                <Input placeholder='カーリル図書館' value={this.props.libName} maxLength={16} onChange={(e, value) => this.props.setLibName(e.target.value)}/>
                                {(isWideHeight == false && this.props.libName.length > 0) ? (
                                    <Label pointing>
                                        ラベルが小さいため印刷されません
                                    </Label>
                                ) : null}
                            </Form.Field>


                        </Form>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        枚数を決める
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Form>
                            <Form.Field>
                                <label>印刷するシート数</label>
                                <Input className="countNumber" type="number" value={this.props.countNumber} min="1" max="300" required onChange={(e, value) => this.props.changeCountNumber(e.target.value)}/>
                            </Form.Field>
                        </Form>
                    </Accordion.Content>
                </Accordion>
                <Divider/>
                <div style={{'marginTop': '10px', 'textAlign': 'center'}}>
                    <p style={{"marginBottom": '10px'}}>合計 {parseInt(this.props.countNumber) * countPerPage} 個のバーコード</p>
                    <Button primary icon loading={this.props.printing} size="big" labelPosition='right' onClick={this.props.print}>印刷する<Icon name='print'/></Button>
                    <br/>
                    <span className="poweredby"></span>
                </div>
            </div>
        )
    }
}


