import React, {useEffect, useRef} from 'react'
import JsBarcode from 'jsbarcode'

interface Props {
    number: string,
    libName: string,
    template: any,
    checkDigit: number | null,
    prefixAlphabet: string
}

const wordcount = (str: string): number => {
  let count = 0;
  for (const char of str) {
    count += char.charCodeAt(0) <= 0x7f ? 0.5 : 1; // 全角半角判定
  }
  return count;
}

const Barcode = (props: Props) => {
    const {number, libName, template, checkDigit, prefixAlphabet} = props
    const svgElement = useRef(null)

    let tempNumber = number
    if (prefixAlphabet !== '') tempNumber = prefixAlphabet + number

    const isWideHeight = parseInt(template.labelHeight) > 20

    useEffect(() => {
        JsBarcode(svgElement.current, tempNumber, {
            format: prefixAlphabet !== '' ? 'code39' : 'codabar',
            width: 2.25,
            height: isWideHeight ? 40 : 26,
            displayValue: false,
            margin: 0,
        })
    }, [template, tempNumber])
    const showLibName = libName !== '' && isWideHeight
  console.log(((parseFloat(template.labelWidth)-4)/3));
    return (
        <div className="barcode" style={{
            display: 'inline-flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            justifyContent: 'center',
            alignItems: 'center',
            width: template.labelWidth,
            height: template.labelHeight,
            borderRadius: template.borderRadius,
            padding: showLibName ? parseInt(template.labelPadding) / 2 + 'mm' : template.labelPadding,
            paddingTop: showLibName ? parseInt(template.labelPadding) / 3 + 'mm' : template.labelPadding,
            border: '1px solid #CCCCCC'
        }}>
            {showLibName ? (
                <div className="libName" style={{
                    fontFamily: '"Noto Sans JP"',
                    fontSize: (wordcount(libName) <= ((parseFloat(template.labelWidth)-4)/3)) ? '3mm' : '2.5mm',
                    fontWeight: 400,
                    marginBottom: '1mm',
                    lineHeight: '3.8mm'
                }}>{libName}</div>
            ) : null}
            <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" version="1.1"/>
            <div style={{
                fontFamily: '"Conv_OCRB",Sans-Serif',
                fontSize: isWideHeight ? '3.5mm' : '1.5mm',
                marginTop: isWideHeight ? '1.3mm' : '0.5mm',
                lineHeight: isWideHeight ? '3.5mm' : '2.5mm'
            }}>
                {tempNumber}
                {checkDigit !== null ? (
                    <span style={{
                        textDecoration: 'underline'
                    }}>{checkDigit}</span>
                ) : null}
            </div>
        </div>
    )
}

export default Barcode