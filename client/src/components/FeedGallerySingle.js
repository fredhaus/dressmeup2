import React from "react";
import { withRouter } from "react-router-dom";
import PhotoSizeSelectSmallTwoToneIcon from '@material-ui/icons/PhotoSizeSelectSmallTwoTone';
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";

let hm_url_base = "https://www2.hm.com";

class SingleFavoriteGallery extends React.Component {
  state = {
    outfit: this.props.outfits,
    large: false
  };

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  toggleClass = () => {
    this.setState(prevState => ({
      large: !prevState.large
    }));
  }

  render() {
    const height = 300;
    return (
      <div>
      {this.state.large ? ( 
      <div className="backgroundSilouette">
  
        <img
          className="face"
          src={
            this.state.outfit.owner.headPic
          }
          alt="Face"
        />

        <div className="topImageDiv">
        <a target="_blank" href={hm_url_base + this.state.outfit.topImage.linkPdp}>
          <img className="topImage" src={this.state.outfit.topImage.imageUrl} alt="" />
        </a>
        </div>
        <div className="bottomImageDiv">
        <a target="_blank" href={hm_url_base + this.state.outfit.bottomImage.linkPdp}>
          <img
            className="bottomImage"
            src={this.state.outfit.bottomImage.imageUrl}
            alt=""
          />
          </a>
        </div>
        <div className="shoes" style={{marginTop: "35px"}}>
        <a target="_blank" href={hm_url_base + this.state.outfit.shoeImage.linkPdp}>
          <img
            className="shoeImageLeft"
            src={this.state.outfit.shoeImage.imageUrl}
            alt=""
          />
          <img
            className="shoeImage"
            src={this.state.outfit.shoeImage.imageUrl}
            alt=""
          />
          </a>
        </div>

      
      <CancelTwoToneIcon onClick={this.toggleClass} style={{opacity: "0.7", margin: "5px"}}/>
      </div>
      
      ) : (
      
      <div className="backgroundSilouetteResponsive" style={{ height }}>
        
        <img
          className="faceResponsive"
          src={
            this.state.outfit.owner.headPic
          }
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
      
      <PhotoSizeSelectSmallTwoToneIcon onClick={this.toggleClass} style={{opacity: "0.7", margin: "10px"}}/>
      </div>
      )}
      </div>
      
    )
  }
}

export default withRouter(SingleFavoriteGallery);
