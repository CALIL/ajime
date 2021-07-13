import React, { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

const Barcode = (props: { number: string, libName: string }) => {
    const svgElement = useRef(null)
    useEffect(() => {
      JsBarcode(svgElement.current, props.number, {
        format: 'codabar',
        width: 2.25,
        height: 52,
        textMargin: 2,
        fontSize: 20,
        margin: 0,
      })
    })
    return (
      <div className="barcode">
        {props.libName!=='' ? (
          <div>{props.libName}</div>
        ) : null}
        <svg ref={svgElement} xmlns="http://www.w3.org/2000/svg" version="1.1" />
      </div>
    )
}

export default Barcode