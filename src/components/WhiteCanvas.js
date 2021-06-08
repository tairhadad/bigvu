import React, { useState, useEffect } from 'react'
import ViewImageBonus from './ViewImageBonus'
import ViewImageBasic from './ViewImageBasic'
import { useDebounce } from 'use-debounce'

const axios = require('axios')

const url = 'http://localhost:8500/getImageList'

export function WhiteCanvas() {
  const [displayText, setDisplayText] = useState('Welcome to BIGVU')
  const [text] = useDebounce(displayText, 1000)
  const [selectedImage, setSelectedImage] = useState('')
  const [imageList, setImageList] = useState([{ value: '', name: '' }])
  const [background] = useState('white')
  const [selectedCanvas, setSelectedCanvas] = useState('basic')

  useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        setImageList(response.data)
        setSelectedImage(response.data[0].value)
      })
      .catch(function (error) {
        console.log(error)
      })
      .finally(function () {})
  }, [])

  const updateNewTextValue = (event) => {
    setDisplayText(event.target.value)
  }

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value)
  }
  const handleCanvasChange = (event) => {
    setSelectedCanvas(event.target.value)
    setDisplayText('Welcome to BIGVU')
  }

  return (
    <div>
      <div className="select">
        <label className="m-4 text-primary">background:</label>

        <select
          onChange={handleImageChange}
          value={selectedImage || imageList[0].value}
        >
          {imageList.map((s) => (
            <option value={s.value} key={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <label className="m-4 text-primary">Display text:</label>
        <input value={displayText} onChange={updateNewTextValue} />
        <label className="m-4 text-primary">template:</label>

        <select onChange={handleCanvasChange} value={selectedCanvas}>
          <option value={'basic'} key={'basic'}>
            Basic
          </option>
          <option value={'bonus'} key={'bonus'}>
            Bonus
          </option>
        </select>
        <div style={{ padding: 70 }}>
          {selectedCanvas === 'basic' ? (
            <ViewImageBasic
              background={background}
              selectedImage={selectedImage}
              displayText={text}
            />
          ) : (
            <ViewImageBonus
              background={background}
              selectedImage={selectedImage}
              displayText={text}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// export default WhiteCanvas
