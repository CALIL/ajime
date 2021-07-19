import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

const Barcode = (props: { number: string, libName: string, preset: any, checkDigit: number | null }) => {
    const {number, libName, preset, checkDigit} = props
    const svgElement = useRef(null)
    useEffect(() => {
      JsBarcode(svgElement.current, checkDigit===null ? number : number + checkDigit, {
        format: preset.barcode,
        width: 2.25,
        height: parseInt(preset.labelHeight) > 20 ? 52 : 26,
        text: checkDigit===null ? number : number + '-' + checkDigit.toString(),
        textMargin: 2,
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
      </div>
    )
}

export default Barcode