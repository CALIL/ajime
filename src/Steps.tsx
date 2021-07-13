import React from 'react'

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
            <p>印刷に使うラベルシールを選んでください</p>
            <ul>
                <li>
                    <input type="radio" name="template" id="AONE" value="AONE" defaultChecked={true} onChange={(e) => props.onSelectTemplate(e.target.value)} />
                    <label htmlFor="AONE">A-One・ラベルシール (
                        <a href="https://www.askul.co.jp/p/334079/" target="_blank">ASKULで購入</a>
                    )</label>
                </li>
                <li>
                    <input type="radio" name="template" id="KIHARA" value="KIHARA" onChange={(e) => props.onSelectTemplate(e.target.value)} />
                    <label htmlFor="KIHARA">キハラ・ラベルシール (
                        <a href="https://www.monotaro.com/g/04604493/" target="_blank">モノタロウで購入</a>
                    )</label>
                </li>
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
                <input type="number" style={{width: "6rem"}} defaultValue="10000" min="1" onChange={(e) => props.changeStartNumber(e.target.value)} />
                からスタートで
                <input type="number" style={{width: "4rem"}} defaultValue="1" min="1" onChange={(e) => props.changeCountNumber(e.target.value)} />ページ
            </div>
            <nav>
                <button onClick={props.previousStep}>戻る</button>
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
                <button onClick={props.previousStep}>戻る</button>
                <button onClick={print} className="active">印刷</button>
            </nav>
        </div>
    )
}
