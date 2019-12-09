import React from "react";
import axios from "axios";
import _ from "lodash";
import UploadPhoto from "./UploadPhoto";
import Slider from "./Slider";
import Slide3 from "./Slide_3";
import Slide4 from "./Slide_4";
import { withRouter } from "react-router-dom";
import CameraMobile from "./CameraMobile";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FavoriteBorderTwoToneIcon from "@material-ui/icons/FavoriteBorderTwoTone";
import AddAPhotoTwoToneIcon from "@material-ui/icons/AddAPhotoTwoTone";

let colors = [
  "crimson",
  "#c203fc",
  "#ce03fc",
  "#030ffc",
  "#ba0000",
  "#5e03fc",
  "#0380fc",
  "#00ba13",
  "#03befc",
  "#03fc77",
  "#e3fc03",
  "#fcc603",
  "#fc3903"
];
let hm_url_base = "https://www2.hm.com";
let transSpeed = 0.5;
let bgColor = "crimson";
let limit = 100;

class AddProject extends React.Component {
  state = {
    user: this.props.user,
    topObj: "",
    bottomObj: "",
    shoeObj: "",
    favorite: false,
    topArr: [],
    bottomArr: [],
    shoeArr: [],
    currentIndexTop: -1,
    currentIndexBottom: -1,
    currentIndexShoe: -1,
    deleteIDs: [],
    shuffle: false,
    photo: false,
    snackbar: false
  };

  shuffle = async () => {
    this.setState(prevState => ({
      shuffle: !prevState.shuffle
    }));

    let ShuffledColors = _.shuffle(colors);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let sleepTime = 300;
    let shuffleNr = 10;

    for (let index = 1; index < shuffleNr; index++) {
      bgColor = ShuffledColors[index];
      if (index < shuffleNr / 2) {
        sleepTime = sleepTime - 30;
      } else {
        sleepTime = sleepTime + 30; // slowing down
      }
      transSpeed = sleepTime * 0.001;
      // console.log(sleepTime)
      await sleep(sleepTime).then(() => {
        this.goToNextSlide();
      });
    }
    transSpeed = 0.5;
    bgColor = "crimson";

    this.setState(prevState => ({
      shuffle: !prevState.shuffle
    }));
  };

  goToNextSlide = () => {
    if (this.state.currentIndexTop === this.state.topArr.length - 50) {
      this.fillTopArryay();
    }
    if (this.state.currentIndexTop === this.state.topArr.length - 1) {
      this.setState({
        currentIndexTop: 0
      });
    }


    if (this.state.currentIndexBottom === this.state.bottomArr.length - 40) {
      this.fillBottomArryay();
    }
    if (this.state.currentIndexBottom === this.state.bottomArr.length - 1) {
      this.setState({
        currentIndexBottom: 0
      });
    }

    if (this.state.currentIndexShoe === this.state.shoeArr.length - 30) {
      this.fillShoeArryay();
    }
    if (this.state.currentIndexShoe === this.state.shoeArr.length - 1) {
      this.setState({
        currentIndexShoe: 0
      });
    }

    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop + 1,
      currentIndexBottom: prevState.currentIndexBottom + 1,
      currentIndexShoe: prevState.currentIndexShoe + 1
    }));
    // console.log("TOP", this.state.currentIndexTop)
    // console.log("BOTTOM", this.state.currentIndexBottom)
    // console.log("SHOE", this.state.currentIndexShoe)
    // console.log(this.props.history.push(""))
  };

  goToPrevSlide = () => {
    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop - 1,
      currentIndexBottom: prevState.currentIndexBottom - 1,
      currentIndexShoe: prevState.currentIndexShoe - 1
    }));
    console.log("TOP", this.state.currentIndexTop);
    console.log("BOTTOM", this.state.currentIndexBottom);
    console.log("SHOE", this.state.currentIndexShoe);
  };

  fillTopArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_tops?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then(response => {
        let newData = _.shuffle(response.data);
        this.setState({
          topArr: [...this.state.topArr, ...newData]
        });
      });
  };

  fillBottomArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_bottoms?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then(response => {
        this.setState({
          bottomArr: [...this.state.bottomArr, ...response.data]
        });
      });
  };

  fillShoeArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_shoes?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then(response => {
        this.setState({
          shoeArr: [...this.state.shoeArr, ...response.data]
        });
      });
  };

  componentDidMount = () => {
    this.fillShoeArryay();
    this.fillBottomArryay();
    this.fillTopArryay();
  };

  onClickFavoriteHandler = () => {
    try {
      this.setState(prevState => ({
        favorite: !prevState.favorite
      }));
      let topId = this.state.topArr[this.state.currentIndexTop]._id;
      let bottomId = this.state.bottomArr[this.state.currentIndexBottom]._id;
      let shoeId = this.state.shoeArr[this.state.currentIndexShoe]._id;
      let user = this.state.user._id;
      axios
        .post(
          `/api/garments/favorite?topId=${topId}&bottomId=${bottomId}&shoeId=${shoeId}&user=${user}`
        )
        .then(response => {
          console.log(response);
        });
    } catch (err) {
      console.error(err);
    }
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  deleteBottomId = () => {
    let id = this.state.bottomArr[this.state.currentIndexBottom]._id;
    console.log(id);
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response);
      console.log(id, " has been deleted");
    });
  };

  deleteShoeId = () => {
    let id = this.state.shoeArr[this.state.currentIndexShoe]._id;
    console.log(id);
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response);
      console.log(id, " has been deleted");
    });
  };

  deleteTopId = () => {
    let id = this.state.topArr[this.state.currentIndexTop]._id;
    console.log(id);
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response);
      console.log(id, " has been deleted");
    });
  };

  togglePhoto = () => {
    this.setState(prevState => ({
      photo: !prevState.photo
    }));
  };

  snackbarHandleClick = () => {
    this.setState(prevState => ({
      snackbar: !prevState.photo
    }));
  };

  topPlus = () => {
    if (this.state.currentIndexTop === this.state.topArr.length - 50) {
      this.fillTopArryay();
    }
    if (this.state.currentIndexTop === this.state.topArr.length - 1) {
      this.setState({
        currentIndexTop: 0
      });
    }
    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop + 1
    }));
  };

  bottomPlus = () => {
    if (this.state.currentIndexBottom === this.state.bottomArr.length - 40) {
      this.fillBottomArryay();
    }
    if (this.state.currentIndexBottom === this.state.bottomArr.length - 1) {
      this.setState({
        currentIndexBottom: 0
      });
    }
    this.setState(prevState => ({
      currentIndexBottom: prevState.currentIndexBottom + 1
    }));
  };

  shoePlus = () => {
    if (this.state.currentIndexShoe === this.state.shoeArr.length - 30) {
      this.fillShoeArryay();
    }
    if (this.state.currentIndexShoe === this.state.shoeArr.length - 1) {
      this.setState({
        currentIndexShoe: 0
      });
    }
    this.setState(prevState => ({
      currentIndexShoe: prevState.currentIndexShoe + 1
    }));
  };

  topMinus = () => {
    if (this.state.currentIndexTop < 0) {
      this.setState({
        currentIndexTop: this.state.topArr.length - 1
      });
    }
    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop - 1
    }));
  };

  bottomMinus = () => {
    if (this.state.currentIndexBottom < 0) {
      this.setState({
        currentIndexBottom: this.state.bottomArr.length - 1
      });
    }
    this.setState(prevState => ({
      currentIndexBottom: prevState.currentIndexBottom - 1
    }));
  };

  shoeMinus = () => {
    console.log(this.state.currentIndexShoe)
    if (this.state.currentIndexShoe < 0) {
      this.setState({
        currentIndexShoe: this.state.shoeArr.length - 1
      });
    }
    this.setState(prevState => ({
      currentIndexShoe: prevState.currentIndexShoe - 1
    }));
  };

  render() {
    return (
      <div style={{ height: "800px" }}>
        {/* <Snackbar id="Snackbar"></Snackbar> */}
        {this.state.photo ? (
          <UploadPhoto
            snackbarHandleClick={this.snackbarHandleClick}
            user={this.props.user}
            updateUserImage={this.props.updateUserImage}
            toggle={this.togglePhoto}
          ></UploadPhoto>
        ) : (
          ""
        )}
        <div className="flexClothes">
          <div className="leftSide" style={{ width: "50px", height: "531px" }}>
            <AddAPhotoTwoToneIcon
              onClick={this.togglePhoto}
              style={{
                width: "35px",
                height: "35px",
                marginTop: "20px",
                marginRight: "20px"
              }}
            />
            <button
            onClick={this.topPlus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {"<"}
            </button>
            <button
            onClick={this.bottomPlus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {"<"}
            </button>
            <button
              onClick={this.shoePlus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {"<"}
            </button>
          </div>

          <div className="randomClothes">
            {this.state.topArr.length !== 0 ||
            this.state.bottomArr.length !== 0 ||
            this.state.shoeArr.length !== 0 ? (
              <div>
                <div
                  className="backgroundSilouette"
                  style={{ filter: `drop-shadow(0 0 0.5rem ${bgColor})` }}
                >
                  <img
                    className="face"
                    width="90px"
                    // src={this.user.headPic}
                    src={
                      this.props.user
                        ? this.props.user.headPic
                        : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574844969/default_face_jaglaw.png"
                    }
                    //"https://res.cloudinary.com/dok2ttvhu/image/upload/v1574796842/arnieProxyFace_ttegde.png"
                    alt="Face"
                  />

                  <div className="topImageDiv slider">
                    {this.state.topArr.map((topObj, i) =>
                      this.state.currentIndexTop === -1 ? (
                        <Slide3
                          key={i}
                          image={topObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={topObj.linkPdp}
                          subClass="displayNone"
                          transSpeed={transSpeed}
                        />
                      ) : this.state.currentIndexTop >= i ? (
                        this.state.currentIndexTop > i ? (
                          this.state.currentIndexTop > i + 2 ? (
                            <Slide3
                              key={i}
                              image={topObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={topObj.linkPdp}
                              subClass="displayNone"
                              transSpeed={transSpeed}
                            />
                          ) : (
                            <Slide3
                              key={i}
                              image={topObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={topObj.linkPdp}
                              subClass="slideImageLeftTop"
                              transSpeed={transSpeed}
                            />
                          )
                        ) : (
                          <Slide3
                            key={i}
                            image={topObj.imageUrl}
                            urlBase={hm_url_base}
                            urlKey={topObj.linkPdp}
                            subClass="slideImageTop"
                            transSpeed={transSpeed}
                          />
                        )
                      ) : this.state.currentIndexTop < i - 2 ? (
                        <Slide3
                          key={i}
                          image={topObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={topObj.linkPdp}
                          subClass="displayNone"
                        />
                      ) : (
                        <Slide3
                          key={i}
                          image={topObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={topObj.linkPdp}
                          subClass="slideImageRightTop"
                        />
                      )
                    )}
                  </div>
                  <div className="bottomImageDiv slider">
                    {this.state.bottomArr.map((bottomObj, i) =>
                      this.state.currentIndexBottom === -1 ? (
                        <Slide3
                          key={i}
                          image={bottomObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={bottomObj.linkPdp}
                          subClass="displayNone"
                          transSpeed={transSpeed}
                        />
                      ) : this.state.currentIndexBottom >= i ? (
                        this.state.currentIndexBottom > i ? (
                          this.state.currentIndexBottom > i + 2 ? (
                            <Slide3
                              key={i}
                              image={bottomObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={bottomObj.linkPdp}
                              subClass="displayNone"
                              transSpeed={transSpeed}
                            />
                          ) : (
                            <Slide3
                              key={i}
                              image={bottomObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={bottomObj.linkPdp}
                              subClass="slideImageLeftBottom"
                              transSpeed={transSpeed}
                            />
                          )
                        ) : (
                          <Slide3
                            key={i}
                            image={bottomObj.imageUrl}
                            urlBase={hm_url_base}
                            urlKey={bottomObj.linkPdp}
                            subClass="slideImageBottom"
                            transSpeed={transSpeed}
                          />
                        )
                      ) : this.state.currentIndexBottom < i - 2 ? (
                        <Slide3
                          key={i}
                          image={bottomObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={bottomObj.linkPdp}
                          subClass="displayNone"
                        />
                      ) : (
                        <Slide3
                          key={i}
                          image={bottomObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={bottomObj.linkPdp}
                          subClass="slideImageRightBottom"
                        />
                      )
                    )}
                  </div>
                  <div className="shoes slider">
                    {this.state.shoeArr.map((shoeObj, i) =>
                      this.state.currentIndexShoe === -1 ? (
                        <Slide4
                          key={i}
                          image={shoeObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={shoeObj.linkPdp}
                          subClass="displayNone"
                          transSpeed={transSpeed}
                        />
                      ) : this.state.currentIndexShoe >= i ? (
                        this.state.currentIndexShoe > i ? (
                          this.state.currentIndexShoe > i + 2 ? (
                            <Slide4
                              key={i}
                              image={shoeObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={shoeObj.linkPdp}
                              subClass="displayNone"
                              transSpeed={transSpeed}
                            />
                          ) : (
                            <Slide4
                              key={i}
                              image={shoeObj.imageUrl}
                              urlBase={hm_url_base}
                              urlKey={shoeObj.linkPdp}
                              subClass="slideImageLeftShoe"
                              transSpeed={transSpeed}
                            />
                          )
                        ) : (
                          <Slide4
                            key={i}
                            image={shoeObj.imageUrl}
                            urlBase={hm_url_base}
                            urlKey={shoeObj.linkPdp}
                            subClass="slideImageShoe"
                            transSpeed={transSpeed}
                          />
                        )
                      ) : this.state.currentIndexShoe < i - 2 ? (
                        <Slide4
                          key={i}
                          image={shoeObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={shoeObj.linkPdp}
                          subClass="displayNone"
                        />
                      ) : (
                        <Slide4
                          key={i}
                          image={shoeObj.imageUrl}
                          urlBase={hm_url_base}
                          urlKey={shoeObj.linkPdp}
                          subClass="slideImageRightShoe"
                        />
                      )
                    )}
                  </div>
                </div>

                <button onClick={this.goToNextSlide}> {"<="} </button>
                {this.state.shuffle ? (
                  <img
                    className="shuffleButton"
                    style={{ width: "150px" }}
                    src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575828503/button_blue_jxy00w.png"
                    alt=""
                  />
                ) : (
                  <img
                    onClick={this.shuffle}
                    className="shuffleButton"
                    style={{ width: "150px" }}
                    src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575801773/button_red_oskdvl.png"
                    alt=""
                  />
                )}
                <button onClick={this.goToPrevSlide}> {"=>"} </button>
              </div>
            ) : (
              <div>
                <div className="backgroundSilouetteLoading"></div>
              </div>
            )}
            {/* <button onClick={this.deleteTopId}> delete TOP ID </button>
        <button onClick={this.deleteBottomId}> delete BOTTOM ID </button>
        <button onClick={this.deleteShoeId}> Delete SHOE ID </button> */}
          </div>
          <div className="rightSide" style={{ width: "50px", height: "531px" }}>
            {this.state.favorite ? (
              <img
                className="favoriteIconTrans"
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginLeft: "20px"
                }}
                onClick={this.onClickFavoriteHandler}
                src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575817229/heart_full_jznpod.png"
                alt=""
              />
            ) : (
              <img
                className="favoriteIcon"
                onClick={this.onClickFavoriteHandler}
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginLeft: "20px"
                }}
                src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575817229/heart_empty_r1gseu.png"
                alt=""
              />
            )}
            <button
              onClick={this.topMinus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {">"}
            </button>
            <button
            onClick={this.bottomMinus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {">"}
            </button>
            <button
            onClick={this.shoeMinus}
              style={{
                zIndex: "3",
                width: "50px",
                height: "50px"
                // marginTop: "20px",
                // marginRight: "20px",
              }}
            >
              {">"}
            </button>
          </div>
        </div>

        {/* <CameraMobile></CameraMobile> */}
      </div>
    );
  }
}

export default withRouter(AddProject);
