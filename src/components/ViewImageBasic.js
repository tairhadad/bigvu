import React, { useState, useEffect, useRef } from 'react'
import logo from '../BIGVU.png'

const ViewImageBasic = (props) => {
  const [fontSize] = useState(50)
  const myCanvas = useRef(null)

  useEffect(() => {
    drawText(props.displayText)
    drawImage(props.selectedImage)
  })

  const drawText = (text) => {
    const c = myCanvas.current

    const ctx = c.getContext('2d')
    ctx.font = 'bold ' + fontSize.toString() + 'px ' + 'Inter'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(text, c.width / 2, c.height / 2 + 10, 600, 40)
  }

  const drawImage = (image) => {
    const canvas = myCanvas.current

    const context = canvas.getContext('2d')
    const base_image = new Image()
    console.log(image)

    base_image.src = image
    base_image.onload = () => {
      context.drawImage(base_image, 20, 20, 600, 320)
      drawText(props.displayText)
    }
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

export default ViewImageBasic
