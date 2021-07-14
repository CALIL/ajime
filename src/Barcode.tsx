import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

const Barcode = (props: { number: string, libName: string, preset: any }) => {
    const {number, libName, preset} = props
    const svgElement = useRef(null)
    useEffect(() => {
      JsBarcode(svgElement.current, number, {
        format: 'codabar',
        width: 2.25,
        height: 52,
        textMargin: 2,
        fontSize: 20,
        margin: 0,
      })
    })
    return (
      <div className={'barcode' + (libName!=='' ? ' libName' : '')} style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: preset.labelWidth,
        height: preset.labelHeight,
      }}>
        {libName!=='' ? (
          <div className="name">{libName}</div>
        ) : null}
        <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" version="1.1" />
      </div>
    )
}

export default Barcode