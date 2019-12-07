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
    return (
      <div className="backgroundSilouette">
        <button onClick={this.onClickConsoleLog}>CONSOOOOLE</button>
        <img
          className="face"
          width="90px"
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

        <div className="topImageDiv slider">
        <a target="_blank" href={hm_url_base + this.state.outfit.topImage.linkPdp}>
          <img className="slideImageTop" src={this.state.outfit.topImage.imageUrl} alt="" />
        </a>
        </div>
        <div className="bottomImageDiv slider">
        <a target="_blank" href={hm_url_base + this.state.outfit.bottomImage.linkPdp}>
          <img
            className="slideImageBottom"
            src={this.state.outfit.bottomImage.imageUrl}
            alt=""
          />
          </a>
        </div>
        <div className="shoes slider">
        <a target="_blank" href={hm_url_base + this.state.outfit.shoeImage.linkPdp}>
          <img
            className="slideImageShoe"
            src={this.state.outfit.shoeImage.imageUrl}
            alt=""
          />
          <img
            className="slideImageShoe"
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
