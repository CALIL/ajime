import React from 'react'

import templates from './templates/index'


export const Nav = (props: any) => {
    return (<ol className="steps">
        <li className={props.currentStep === 1 ? 'current' : ''}>Step 1</li>
        <li className={props.currentStep === 2 ? 'current' : ''}>Step 2</li>
        <li className={props.currentStep === 3 ? 'current' : ''}>Step 3</li>
    </ol>)
}

export const Step1 = (props: any) => {
    return (
        <div className="step step1">
            <h2>Step {props.currentStep}</h2>
            <p>印刷するラベル用紙を選んでください</p>
            <ul>
                {Object.values(templates).map((template: any) => (
                    <li key={template.id}>
                        <input type="radio" name="template" id={template.id} value={template.id} checked={template.id===props.templateName} onChange={(e) => props.onSelectTemplate(e.target.value)} />
                        <label htmlFor={template.id}>{template.name} (
                            <a href={template.url} target="_blank">{template.linkText}</a>
                        )</label>
                    </li>
                ))}
            </ul>
            <nav>
                <button onClick={props.nextStep} className="active">次へ</button>
            </nav>
        </div>
    )
}
export const Step2 = (props: any) => {
    return (
        <div className="step step2">
            <h2>Step {props.currentStep}</h2>
            <p>印刷するバーコードラベルを設定しましょう</p>
            <div>
                <input type="text" style={{width: "8rem"}} value={props.startNumber} min="1" max="99999" maxLength={16} required 
                    onChange={(e) => {
                        if (e.target.value.toUpperCase().match(/^[A-Z]*?[0-9]+C?$/)) {
                            props.changeStartNumber(e.target.value.toUpperCase())
                        } else {
                            e.target.value = props.startNumber
                        }
                    }}
                />
                からスタートで
                <input type="number" style={{width: "4rem"}} defaultValue={props.countNumber} min="1" max="100" required onChange={(e) => props.changeCountNumber(e.target.value)} />ページ
            </div>
            {/* <label htmlFor="libName">図書館名:</label> */}
            <input type="text" name="libName" id="libName" placeholder="図書館名" defaultValue={props.libName} onChange={(e) => props.setLibName(e.target.value)} />
            <nav>
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={() => {
                    if(props.renderBarCodes()) {
                        props.nextStep()
                    }
                }} className="active">次へ</button>
            </nav>
        </div>
    )
}
export const Step3 = (props: any) => {
    return (
        <div className="step step3">
            <h2>Step {props.currentStep}</h2>
            <p>合計 {props.countNumber} 枚</p>
            <p>さあ、印刷しましょう！</p>
            <nav>
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={props.print} className="active" disabled={props.printing}>印刷</button>
            </nav>
        </div>
    )
}
