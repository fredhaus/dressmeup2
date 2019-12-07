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
      <div className="backgroundSilouette">
        <img
          className="face"
          width="90px"
          src={
            this.props.user
              ? this.props.user.headPic
              : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574844969/default_face_jaglaw.png"
          }
          alt="Face"
        />

        <div className="topImageDiv">
        <a target="_blank" href={hm_url_base + this.state.topImage.linkPdp}>
          <img className="topImage" src={this.state.topImage.imageUrl} alt="" />
        </a>
        </div>
        <div className="bottomImageDiv">
        <a target="_blank" href={hm_url_base + this.state.bottomImage.linkPdp}>
          <img
            className="bottomImage"
            src={this.state.bottomImage.imageUrl}
            alt=""
          />
          </a>
        </div>
        <div className="shoes">
        <a target="_blank" href={hm_url_base + this.state.shoeImage.linkPdp}>
          <img
            className="shoeImageLeft"
            src={this.state.shoeImage.imageUrl}
            alt=""
          />
          <img
            className="shoeImage"
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
