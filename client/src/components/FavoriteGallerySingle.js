import React from "react";
import { withRouter } from "react-router-dom";
let hm_url_base = "https://www2.hm.com";

class SingleFavoriteGallery extends React.Component {
  state = {
    topImage: this.props.topImage,
    bottomImage: this.props.bottomImage,
    shoeImage: this.props.shoeImage,
    favorite: true
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="backgroundSilouetteResponsiveFav">
        <img
          className="faceResponsive"
          
          src={
            this.props.user
              ? this.props.user.headPic
              : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574844969/default_face_jaglaw.png"
          }
          alt="faceResponsive"
        />

        <div className="topImageDivResponsive">
        <a target="_blank" href={hm_url_base + this.state.topImage.linkPdp}>
          <img className="topImageResponsive" src={this.state.topImage.imageUrl} alt="" />
        </a>
        </div>
        <div className="bottomImageDivResponsive">
        <a target="_blank" href={hm_url_base + this.state.bottomImage.linkPdp}>
          <img
            className="bottomImageResponsive"
            src={this.state.bottomImage.imageUrl}
            alt=""
          />
          </a>
        </div>
        <div className="shoesResponsive">
        <a target="_blank" href={hm_url_base + this.state.shoeImage.linkPdp}>
          <img
            className="shoeImageLeftResponsive"
            src={this.state.shoeImage.imageUrl}
            alt=""
          />
          <img
            className="shoeImageResponsive"
            src={this.state.shoeImage.imageUrl}
            alt=""
          />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleFavoriteGallery);
