import React from "react";
import axios from "axios";
import _ from "lodash";
import UploadPhoto from "./UploadPhoto";
import Slider from "./Slider";
let hm_url_base = "https://www2.hm.com/de_de/productpage.";

class AddProject extends React.Component {
  state = {
    topObj: '',
    imageTop: '',
    topUrl: '',
    bottomObj: '',
    imageBottom: '',
    bottomUrl: '',
    shoeObj: '',
    imageShoe: '',
    shoeUrl: '',
    favorite: false,
    topArr: [],
    bottomArr: [],
    shoeArr: [],
  };

  fillGarmentArryays = () => {
    axios.get("/api/garments/get_m_many_tbs", this.state).then(response =>{
      console.log("Response", response)
      this.setState({
        topArr: response
      })
    })
  }

  componentDidMount = () => {
    this.fillGarmentArryays()
  }

  onClickFavoriteHandler = (top, bottom, shoe, user) =>{
    axios.post("/api/garments/favorite", this.state).then(response =>{
      this.setState({
        favorite: true
      })
    })
  }

  onClickConsoleLog = () =>{
    console.log(this.state)
  }

  onClickHandlerMen = () => {
    axios.get("/api/garments/get_m_top").then(response => {
      console.log("TOP:", response.data);
      this.setState({
        topObj: response.data,
        imageTop: response.data.imageUrl, //imageTop: response.data.images[0].url,
        TopUrl: hm_url_base + response.data.articles[0].code + ".html"
      });
    });
    axios.get("/api/garments/get_m_bottom").then(response => {
      console.log("BOTTOM:", response.data);
      this.setState({
        bottomObj: response.data,
        imageBottom: response.data.imageUrl,
        bottomUrl: hm_url_base + response.data.articles[0].code + ".html"
      });
    });
    axios.get("/api/garments/get_m_shoe").then(response => {
      console.log("SHOE:", response.data);
      this.setState({
        shoeObj: response.data,
        imageShoe: response.data.imageUrl,
        shoeUrl: hm_url_base + response.data.articles[0].code + ".html"
      });
    });
  };

  render() {
    return (
      <div className="randomClothes">
        <button onClick={this.onClickConsoleLog}>Console Log</button>
        <button onClick={this.onClickHandlerMen}>Randon MEN Clothes</button>
        <button onClick={this.onClickFavoriteHandler}>FAVORITE this outfit</button>
        <br></br>
        <div className="break"></div>

        <div className="backgroundSilouette">
          
          <img
            className="face"
            width="90px"
            // src={this.user.headPic}
            src={this.props.user ? this.props.user.headPic : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574796842/arnieProxyFace_ttegde.png"}       
            //"https://res.cloudinary.com/dok2ttvhu/image/upload/v1574796842/arnieProxyFace_ttegde.png"
            alt="ARnienothere"
          />

          <div className="topImageDiv">
            {this.state.imageTop ? (
              <a target="_blank" href={this.state.TopUrl}>
                <img className="topImage" src={this.state.imageTop} alt="" />
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="bottomImageDiv">
            {this.state.imageBottom ? (
              <a target="_blank" href={this.state.bottomUrl}>
                <img
                  className="bottomImage"
                  src={this.state.imageBottom}
                  alt=""
                />
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="shoes">
            {this.state.imageBottom ? (
              <a target="_blank" href={this.state.shoeUrl}>
                <img
                  className="shoeImageLeft"
                  src={this.state.imageShoe}
                  height="150px"
                  alt=""
                />
              </a>
            ) : (
              ""
            )}
            {this.state.imageBottom ? (
              <a target="_blank" href={this.state.shoeUrl}>
                <img
                  className="shoeImage"
                  src={this.state.imageShoe}
                  height="150px"
                  alt=""
                />
              </a>
            ) : (
              ""
            )}
          </div>

          
          
          
        </div>
        <UploadPhoto user={this.props.user} updateUserImage={this.props.updateUserImage}></UploadPhoto>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      <Slider></Slider>
      </div>
    );
  }
}

export default AddProject;
