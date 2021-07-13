import React from 'react'

export const Nav = (props: any) => {
    return (<ol>
        <li className={props.currentStep === 1 ? 'current' : ''}>Step 1</li>
        <li className={props.currentStep === 2 ? 'current' : ''}>Step 2</li>
        <li className={props.currentStep === 3 ? 'current' : ''}>Step 3</li>
    </ol>)
}

export const Step1 = (props: any) => {
    return (
        <div className="step step1">
            <h2>Step {props.currentStep}</h2>
            <p>テンプレートの選択</p>
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
            <p>印刷するバーコードラベルの設定</p>
            <div>
                <input type="number" style={{width: "6rem"}} defaultValue="10000" ref={element => props.this.startNumber = element} />
                からスタートで
                <input type="number" style={{width: "4rem"}} defaultValue="1" ref={element => props.this.countNumber = element} />ページ
            </div>
            <nav>
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={() => {
                    if(props.this.renderBarCodes()) {
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
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={print} className="active">印刷</button>
            </nav>
        </div>
    )
}
