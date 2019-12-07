import React from "react";
import { withRouter } from "react-router-dom";
let hm_url_base = "https://www2.hm.com";

class SingleFavoriteGallery extends React.Component {
  state = {
    outfit: this.props.outfits,
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
    const height = 300;
    return (
      <div className="backgroundSilouetteResponsive" style={{ height }}>
        
        <img
          className="faceResponsive"
          src={
            this.state.outfit.owner.headPic
          }
          // src={
          //   this.props.user
          //     ? this.props.user.headPic
          //     : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574844969/default_face_jaglaw.png"
          // }
          alt="Face"
        />

        <div className="topImageDivResponsive">
        <a target="_blank" href={hm_url_base + this.state.outfit.topImage.linkPdp}>
          <img className="topImageResponsive" src={this.state.outfit.topImage.imageUrl} alt="" />
        </a>
        </div>
        <div className="bottomImageDivResponsive">
        <a target="_blank" href={hm_url_base + this.state.outfit.bottomImage.linkPdp}>
          <img
            className="bottomImageResponsive"
            src={this.state.outfit.bottomImage.imageUrl}
            alt=""
          />
          </a>
        </div>
        <div className="shoesResponsive">
        <a target="_blank" href={hm_url_base + this.state.outfit.shoeImage.linkPdp}>
          <img
            className="shoeImageLeftResponsive"
            src={this.state.outfit.shoeImage.imageUrl}
            alt=""
          />
          <img
            className="shoeImageResponsive"
            src={this.state.outfit.shoeImage.imageUrl}
            alt=""
          />
          </a>
        </div>
      </div>
    );
  }
}

export default withRouter(SingleFavoriteGallery);
