import React from 'react'

import presets from './preset/index'


export const Nav = (props: any) => {
    return (<ol className="steps">
        <li className={props.currentStep === 1 ? 'current' : ''}>Step 1</li>
        <li className={props.currentStep === 2 ? 'current' : ''}>Step 2</li>
        <li className={props.currentStep === 3 ? 'current' : ''}>Step 3</li>
    </ol>)
}

export const Step1 = (props: any) => {
    console.log(props.templateName)
    console.log(presets)
    return (
        <div className="step step1">
            <h2>Step {props.currentStep}</h2>
            <p>印刷に使うラベルシールを選んでください</p>
            <ul>
                {Object.values(presets).map((preset: any) => (
                    <li key={preset.id}>
                        <input type="radio" name="template" id={preset.id} value={preset.id} checked={preset.id===props.templateName} onChange={(e) => props.onSelectTemplate(e.target.value)} />
                        <label htmlFor={preset.id}>{preset.name} (
                            <a href={preset.url} target="_blank">{preset.linkText}</a>
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
                <input type="number" style={{width: "6rem"}} defaultValue={props.startNumber} min="1" max="99999" required onChange={(e) => props.changeStartNumber(e.target.value)} />
                からスタートで
                <input type="number" style={{width: "4rem"}} defaultValue={props.countNumber} min="1" max="100" required onChange={(e) => props.changeCountNumber(e.target.value)} />ページ
            </div>
            {/* <label htmlFor="libName">図書館名:</label> */}
            <input type="text" name="libName" id="libName" placeholder="図書館名" onChange={(e) => props.setLibName(e.target.value)} />
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
            <p>さあ、印刷しましょう！</p>
            <nav>
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={print} className="active">印刷</button>
            </nav>
        </div>
    )
}
