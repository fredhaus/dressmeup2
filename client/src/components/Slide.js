import React from 'react'

const Slide = ({ image, hidden, subClass }) => {
  return <div style={{display: hidden? "none":"block"}}>
    <img className={subClass} src={image} alt="" />
  </div>
}

export default Slide