import React from 'react'

const Slide = ({ image, opac, time, pos }) => {
  return <div>
    <img src={image} alt="" style={{
        position:"absolute", 
        left:"0", 
        top:"0", 
        opacity: opac + "%",
        width: "200px",
        height: "auto",
        transform: "translateX(" + pos + "%)",
        transitionProperty: "all",
        transitionPuration: time + "s",
        transitionTimingFunction:"ease"
    }}/>
  </div>
}

export default Slide