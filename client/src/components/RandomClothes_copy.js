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
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

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
    snackbar: false,
    mute: this.props.mute
  };

  audio_shuffle = new Audio(
    "https://res.cloudinary.com/dok2ttvhu/video/upload/v1576013071/shuffle_2_lucwoz.mp3"
  );
  audio_swipe = new Audio(
    "https://res.cloudinary.com/dok2ttvhu/video/upload/v1576014303/swoosh_short_edf6zu.mp3"
  );

  audio_swoosh = new Audio(
    "https://res.cloudinary.com/dok2ttvhu/video/upload/v1576014809/swoosh_2_ixxbxn.mp3"
  );

  audio_favorite = new Audio(
    "https://res.cloudinary.com/dok2ttvhu/video/upload/v1576017226/favortie2_ekh8hz.mp3"
  );


  shuffle = async () => {
    console.log(this.state)
    if (!this.props.mute) {
      this.audio_shuffle.play();
    }

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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop - 1,
      currentIndexBottom: prevState.currentIndexBottom - 1,
      currentIndexShoe: prevState.currentIndexShoe - 1
    }));
  };

  //////////// MINUES CASE HANDLES//////////// MINUES CASE HANDLES//////////// MINUES CASE HANDLES//////////// MINUES CASE HANDLES//////////// MINUES CASE HANDLES

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
      if(!this.state.favorite){
        if (!this.props.mute) {
          this.audio_favorite.play();
        }
        
      }
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

  // deleteBottomId = () => {
  //   let id = this.state.bottomArr[this.state.currentIndexBottom]._id;
  //   console.log(id);
  //   axios.get(`/api/garments/delete?id=${id}`).then(response => {
  //     console.log(response);
  //     console.log(id, " has been deleted");
  //   });
  // };

  // deleteShoeId = () => {
  //   let id = this.state.shoeArr[this.state.currentIndexShoe]._id;
  //   console.log(id);
  //   axios.get(`/api/garments/delete?id=${id}`).then(response => {
  //     console.log(response);
  //     console.log(id, " has been deleted");
  //   });
  // };

  // deleteTopId = () => {
  //   let id = this.state.topArr[this.state.currentIndexTop]._id;
  //   console.log(id);
  //   axios.get(`/api/garments/delete?id=${id}`).then(response => {
  //     console.log(response);
  //     console.log(id, " has been deleted");
  //   });
  // };

  togglePhoto = () => {
    if (!this.props.mute) {
      this.audio_swoosh.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
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
      currentIndexShoe: prevState.currentIndexShoe + 1
    }));
  };

  topMinus = () => {
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
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
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    console.log(this.state.currentIndexShoe);
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
      <div className="master" style={{ height: "800px" }}>
        
        
        {this.state.photo ? (
          <div className="photoUploaderMaster">
          <UploadPhoto
            // snackbarHandleClick={this.snackbarHandleClick}
            user={this.props.user}
            toggleSnackbar={this.props.toggleSnackbar}
            updateUserImage={this.props.updateUserImage}
            toggle={this.togglePhoto}
          ></UploadPhoto>
          </div>
        ) : (
          ""
        )}
        {/* <div width="329px" style={{backgroundColor: "red"}}><p>_________Snackbar Message here</p></div> */}
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
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.topPlus}
              alt=""
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginRight: "20px"
              }}
            />
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.bottomPlus}
              alt=""
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginRight: "20px"
              }}
            />
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.shoePlus}
              alt=""
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginRight: "20px"
              }}
            />
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
              <FavoriteTwoToneIcon
                className="favoriteIconTrans"
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginLeft: "10px",
                  transitionProperty: "all",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease",
                  color: "crimson",
                  filter: "drop-shadow(0 0 0.75rem crimson)"
                }}
                onClick={this.onClickFavoriteHandler}
              />
            ) : (
              <FavoriteTwoToneIcon
                className="favoriteIcon"
                style={{
                  filter: "drop-shadow(0 0 0rem white)",
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginLeft: "10px",
                  transitionProperty: "all",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease"
                }}
                onClick={this.onClickFavoriteHandler}
              />
            )}
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.topMinus}
              alt=""
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginLeft: "20px"
                // marginRight: "20px",
              }}
            ></img>
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              alt=""
              onClick={this.bottomMinus}
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginLeft: "20px"
                // marginRight: "20px",
              }}
            ></img>
            <img
              alt=""
              class="arrowDS"
              // src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.shoeMinus}
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginLeft: "20px"
                // marginRight: "20px",
              }}
            ></img>
          </div>
        </div>
        <div className="shuffleButtonsAll">
          <div onClick={this.goToNextSlide}>
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.goToNextSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px"
              }}
            ></img>
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.goToNextSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px"
              }}
            ></img>
          </div>

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
          <div onClick={this.goToPrevSlide}>
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.goToPrevSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px"
              }}
            ></img>
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.goToPrevSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px"
              }}
            ></img>
          </div>
        </div>
        {/* <CameraMobile></CameraMobile> */}
      </div>
    );
  }
}

export default withRouter(AddProject);
