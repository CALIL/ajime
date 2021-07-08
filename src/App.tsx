import React, { Component } from 'react'
import JsBarcode from 'jsbarcode'


interface App {
  canvasDiv: HTMLDivElement | null
}


interface Props {
}

interface State {
}


class App extends Component<Props, State> {
  constructor(props:Props) {
      super(props)
      this.state = {
      }
      this.canvasDiv = null
  }
  componentDidMount() {
    this.renderBarcode('123456789')
  }
  renderBarcode(number: string) {
    const canvas = document.createElement('canvas')
    JsBarcode(canvas, number, {
      format: 'codabar'
    })
    if (this.canvasDiv) {
      this.canvasDiv.appendChild(canvas)
    }
  }
  render() {
    return (
      <div className="App">
        <div ref={element => this.canvasDiv = element}></div>
      </div>
    )  
  }
}

export default App
