import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import SingleFavoriteGallery from "./FavoriteGallerySingle";

class Favorites extends React.Component {
  state = {
    user: this.props.user,
    outfits: [],
    isLoading: true
  };

  getAllOutfits = () => {
    axios.get("/api/garments/outfits", this.state).then(response => {
      // console.log(response)
      this.setState({ outfits: response.data, isLoading: false }); // this triggers a re-render

      //response.data : [{"_id":"5ddea791c724a8b762cd6bab","topImage":"5ddd7bc7fbc3daa3a3501595","bottomImage":"5ddd7bc7fbc3daa3a3501596","shoeImage":"5ddd7bc7fbc3daa3a3501597","owner":"5dde3b7e7f9238b3411c4537","__v":0}]
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
      <div className="cardwrapper">
        Favorites:
        <button onClick={this.onClickConsoleLog}>Console Log</button>
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
