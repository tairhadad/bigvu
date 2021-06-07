import React, { useState, useEffect, useRef } from 'react'
import logo from '../BIGVU.png'

const ViewImageBonus = (props) => {
  const [fontSize, SetFontSize] = useState(35)
  const myCanvas = useRef(null)

  useEffect(() => {
    drawText(props.displayText)
    drawImage(props.selectedImage)
  })

  const drawText = (text) => {
    const c = myCanvas.current

    // var c = document.getElementById('myCanvas')
    const ctx = c.getContext('2d')
    ctx.font = fontSize.toString() + 'px ' + 'Inter'
    ctx.fillStyle = props.background
    ctx.fillRect((c.width * 4) / 5, c.height / 3, 300, 240)

    ctx.fillStyle = 'rgb(56,36,66)'
    // ctx.textAlign = 'center'
    // ctx.fillText(text, (c.width * 4) / 6 + 36, c.height / 2, 600, 40)
    printAt(ctx, text, (c.width * 4) / 6 + 20, c.height / 2, 32, 170)
  }

  const drawImage = (image) => {
    const canvas = myCanvas.current

    const context = canvas.getContext('2d')
    const base_image = new Image()

    base_image.src = image
    base_image.onload = () => {
      context.drawImage(base_image, 20, 20, 400, 320)

      drawText(props.displayText)
    }
  }

  const printAt = (context, text, x, y, lineHeight, fitWidth) => {
    fitWidth = fitWidth || 0

    if (fitWidth <= 0) {
      context.fillText(text, x, y)
      return
    }

    for (var idx = 1; idx <= text.length; idx++) {
      var str = text.substr(0, idx)

      if (context.measureText(str).width > fitWidth) {
        if (300 < y) {
          context.fillStyle = props.background

          context.fillRect((640 * 4) / 6, 360 / 3, 300, 240)
          SetFontSize(fontSize - 1)
          context.font = 'bold ' + fontSize.toString() + 'px ' + 'Inter'

          text = props.displayText
          printAt(
            context,
            text,
            (640 * 4) / 6 + 36,
            360 / 2,
            lineHeight - 6,
            fitWidth,
          )
          return
        }
        context.fillStyle = 'rgb(56,36,66)'
        context.fillText(text.substr(0, idx - 1), x, y)
        printAt(
          context,
          text.substr(idx - 1),
          x,
          y + lineHeight,
          lineHeight,
          fitWidth,
        )
        return
      }
    }
    context.fillText(text, x, y)
  }

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <canvas
          style={{ background: props.background, borderRadius: 10 }}
          id="myCanvas"
          width="640"
          height="360"
          ref={myCanvas}
        ></canvas>
      </div>
      <div className="col-3"></div>
      <div className="div-logo">
        <br />
        <br />
        <img className="img-logo" src={logo} alt="logo" />
      </div>
    </div>
  )
}

export default ViewImageBonus
