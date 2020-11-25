import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import SingleFavoriteGallery from "./FavoriteGallerySingle";
import FlareTwoToneIcon from '@material-ui/icons/FlareTwoTone';

class Favorites extends React.Component {
  state = {
    user: this.props.user,
    outfits: [],
    isLoading: true
  };

  getAllOutfits = () => {
    axios.get("/api/garments/outfits", this.state).then(response => {
      this.setState({ outfits: response.data, isLoading: false }); // this triggers a re-render

    });
  };

  componentDidMount() {
    this.getAllOutfits();
  }

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
      <div style={{ height: "100vh" }} className="cardwrapper">
        <div className="sectionHead"> 
        <FlareTwoToneIcon style={{width: "35px", height: "35px", color: "gold"}}></FlareTwoToneIcon>
        <h3><FlareTwoToneIcon style={{width: "35px", height: "35px", color: "gold"}}></FlareTwoToneIcon>
           My Outfits 
          <FlareTwoToneIcon style={{width: "35px", height: "35px", color: "gold"}}></FlareTwoToneIcon></h3></div>
        <div className="break"></div>
        {this.state.outfits.map((outfit, i) => {
          return (
            <SingleFavoriteGallery
              key={i}
              user={this.props.user}
              topImage={outfit.topImage}
              bottomImage={outfit.bottomImage}
              shoeImage={outfit.shoeImage}
            ></SingleFavoriteGallery>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Favorites);
