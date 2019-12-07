import React from 'react'

const Slide = ({ image, hidden, subClass, urlBase, urlKey, transSpeed}) => {
  let url = urlBase+ urlKey
  return <div>
    <a target="_blank" href={url}>
      <img className={subClass} src={image} alt="" style={{transitionDuration : `${transSpeed}s`}}/>
    </a>
  </div>
}

export default Slide