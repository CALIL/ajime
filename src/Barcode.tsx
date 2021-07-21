import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

interface Props  {
  number: string,
  libName: string,
  preset: any,
  checkDigit: number | null,
  univStartAlphabet: string | null
}

const Barcode = (props: Props) => {
    const {number, libName, preset, checkDigit, univStartAlphabet} = props
    const svgElement = useRef(null)
    let tempNumber = number
    if (univStartAlphabet!==null) tempNumber = univStartAlphabet + number
    useEffect(() => {
      JsBarcode(svgElement.current, tempNumber, {
        format: univStartAlphabet!==null ? 'code39' : 'codabar',
        width: 2.25,
        height: parseInt(preset.labelHeight) > 20 ? 52 : 26,
        displayValue: false,
        text: checkDigit===null ? tempNumber : tempNumber + '-' + checkDigit.toString(),
        textMargin: 0,
        fontSize: parseInt(preset.labelHeight) > 20 ? 20 : 15,
        font: '"Conv_OCRB",Sans-Serif',
        margin: 0,
      })
    })
    const showLibName = libName!=='' && parseInt(preset.labelHeight) > 20
    return (
      <div className="barcode" style={{
        display: 'inline-flex',
        flexDirection: showLibName ? 'column' : 'row',
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        width: preset.labelWidth,
        height: preset.labelHeight,
        borderRadius: preset.borderRadius,
        padding: showLibName ? parseInt(preset.labelPadding) / 2 + 'mm' : preset.labelPadding,
        paddingTop: showLibName ? parseInt(preset.labelPadding) / 3 + 'mm' : preset.labelPadding,
        border: '1px solid #CCCCCC'
      }}>
        {showLibName ? (
          <div className="libName" style={{
            fontFamily: '"Noto Sans JP"',
            fontSize: libName.length<10 ? '3mm' : '1.5mm',
            marginBottom: '1mm'
          }}>{libName}</div>
        ) : null}
        <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" version="1.1" />
        <div style={{
            fontFamily: '"Conv_OCRB",Sans-Serif',
            fontSize: '3.5mm',
            marginTop: '1mm'
        }}>
          {tempNumber}
          {checkDigit===null ? null :  (
          <span style={{
            fontFamily: '"Conv_OCRB",Sans-Serif',
            // fontWeight: 'bold',
            // fontSize: '3.25mm',
            textDecoration: 'underline'
          }}>{checkDigit}</span>
        )}</div>
      </div>
    )
}

export default Barcode