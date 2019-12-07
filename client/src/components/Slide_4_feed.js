import React from 'react'

const Slide = ({ image, hidden, subClass, urlBase, urlKey, transSpeed}) => {
  let url = urlBase+ urlKey
  return <div className={subClass} style={{transitionDuration : `${transSpeed}s`}}>
    <a target="_blank" href={url}>
      <img className="slideShoeRight"src={image} alt=""  />
      <img className="slideShoeLeft"src={image} alt="" />
    </a>
  </div>
}

export default Slide