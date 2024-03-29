import React from "react";
import axios from "axios";
import _ from "lodash";
import UploadPhoto from "./UploadPhoto";
import Slide3 from "./Slide_3";
import Slide4 from "./Slide_4";
import { withRouter } from "react-router-dom";
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
  "#fc3903",
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
    mute: this.props.mute,
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

  audio_plop = new Audio(
    "https://res.cloudinary.com/dok2ttvhu/video/upload/v1576098907/19987__acclivity__fingerplop1_erdxa7.mp3"
  );

  shuffle = async () => {
    
    if (!this.props.mute) {
      this.audio_shuffle.play();
    }

    this.setState((prevState) => ({
      shuffle: !prevState.shuffle,
    }));

    let ShuffledColors = _.shuffle(colors);

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
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
      
      await sleep(sleepTime).then(() => {
        this.goToNextSlide();
      });
    }
    transSpeed = 0.5;
    bgColor = "crimson";

    this.setState((prevState) => ({
      shuffle: !prevState.shuffle,
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
        currentIndexTop: 0,
      });
    }

    if (this.state.currentIndexBottom === this.state.bottomArr.length - 40) {
      this.fillBottomArryay();
    }
    if (this.state.currentIndexBottom === this.state.bottomArr.length - 1) {
      this.setState({
        currentIndexBottom: 0,
      });
    }

    if (this.state.currentIndexShoe === this.state.shoeArr.length - 30) {
      this.fillShoeArryay();
    }
    if (this.state.currentIndexShoe === this.state.shoeArr.length - 1) {
      this.setState({
        currentIndexShoe: 0,
      });
    }

    this.setState((prevState) => ({
      favorite: false,
      currentIndexTop: prevState.currentIndexTop + 1,
      currentIndexBottom: prevState.currentIndexBottom + 1,
      currentIndexShoe: prevState.currentIndexShoe + 1,
    }));
  };

  goToPrevSlide = () => {
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexTop: prevState.currentIndexTop - 1,
      currentIndexBottom: prevState.currentIndexBottom - 1,
      currentIndexShoe: prevState.currentIndexShoe - 1,
    }));
  };

  fillTopArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_tops?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then((response) => {
        let newData = _.shuffle(response.data);
        this.setState({
          topArr: [...this.state.topArr, ...newData],
        });
      });
  };

  fillBottomArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_bottoms?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then((response) => {
        this.setState({
          bottomArr: [...this.state.bottomArr, ...response.data],
        });
      });
  };

  fillShoeArryay = () => {
    axios
      .get(
        `/api/garments/get_m_many_shoes?limit=${limit}&offset=${this.state.topArr.length}`,
        this.state
      )
      .then((response) => {
        this.setState({
          shoeArr: [...this.state.shoeArr, ...response.data],
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
      if (!this.state.favorite) {
        if (!this.props.mute) {
          if (this.props.user) {
            this.audio_favorite.play();
          } else {
            this.audio_plop.play();
          }
        }
      }
      this.setState((prevState) => ({
        favorite: !prevState.favorite,
      }));
      if (this.props.user) {
        let topId = this.state.topArr[this.state.currentIndexTop]._id;
        let bottomId = this.state.bottomArr[this.state.currentIndexBottom]._id;
        let shoeId = this.state.shoeArr[this.state.currentIndexShoe]._id;
        let user = this.state.user._id;
        axios
          .post(
            `/api/garments/favorite?topId=${topId}&bottomId=${bottomId}&shoeId=${shoeId}&user=${user}`
          )
          .then((response) => {
            
          });
      } else {
        this.props.history.push("/login");
      }
    } catch (err) {
      
    }
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  togglePhoto = () => {
    if (!this.props.mute) {
      this.audio_swoosh.play();
    }
    this.setState((prevState) => ({
      photo: !prevState.photo,
    }));
  };

  snackbarHandleClick = () => {
    this.setState((prevState) => ({
      snackbar: !prevState.photo,
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
        favorite: false,
        currentIndexTop: 0,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexTop: prevState.currentIndexTop + 1,
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
        favorite: false,
        currentIndexBottom: 0,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexBottom: prevState.currentIndexBottom + 1,
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
        favorite: false,
        currentIndexShoe: 0,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexShoe: prevState.currentIndexShoe + 1,
    }));
  };

  topMinus = () => {
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    if (this.state.currentIndexTop < 0) {
      this.setState({
        favorite: false,
        currentIndexTop: this.state.topArr.length - 1,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexTop: prevState.currentIndexTop - 1,
    }));
  };

  bottomMinus = () => {
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    if (this.state.currentIndexBottom < 0) {
      this.setState({
        favorite: false,
        currentIndexBottom: this.state.bottomArr.length - 1,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexBottom: prevState.currentIndexBottom - 1,
    }));
  };

  shoeMinus = () => {
    if (!this.props.mute && !this.state.shuffle) {
      this.audio_swipe.play();
    }
    
    if (this.state.currentIndexShoe < 0) {
      this.setState({
        favorite: false,
        currentIndexShoe: this.state.shoeArr.length - 1,
      });
    }
    this.setState((prevState) => ({
      favorite: false,
      currentIndexShoe: prevState.currentIndexShoe - 1,
    }));
  };

  render() {
    return (
      <div className="master" style={{ height: "100vh" }}>
        {this.state.photo ? (
          <UploadPhoto
            user={this.props.user}
            snackbar={this.props.snackbar}
            toggleSnackbar={this.props.toggleSnackbar}
            updateUserImage={this.props.updateUserImage}
            toggle={this.togglePhoto}
          ></UploadPhoto>
        ) : (
          ""
        )}
        <div className="flexClothes">
          <div className="leftSide" style={{ width: "50px", height: "531px" }}>
            {this.state.photo ? (
              <AddAPhotoTwoToneIcon
                onClick={this.togglePhoto}
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginRight: "20px",
                  color: "crimson",
                  filter: "drop-shadow(0 0 0.5rem crimson)",
                }}
              />
            ) : (
              <AddAPhotoTwoToneIcon
                onClick={this.togglePhoto}
                style={{
                  width: "35px",
                  height: "35px",
                  marginTop: "20px",
                  marginRight: "20px",
                }}
              />
            )}
            <img
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.topPlus}
              alt=""
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginRight: "20px",
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
                marginRight: "20px",
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
                marginRight: "20px",
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
                    src={
                      this.props.user
                        ? this.props.user.headPic
                        : "https://res.cloudinary.com/dok2ttvhu/image/upload/v1574844969/default_face_jaglaw.png"
                    }
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
                  filter: "drop-shadow(0 0 0.75rem crimson)",
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
                  transitionTimingFunction: "ease",
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
                marginLeft: "20px",
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
                marginLeft: "20px",
                // marginRight: "20px",
              }}
            ></img>
            <img
              alt=""
              class="arrowDS"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.shoeMinus}
              style={{
                zIndex: "3",
                width: "25px",
                height: "52px",
                marginLeft: "20px",
              }}
            ></img>
          </div>
        </div>
        <div className="shuffleButtonsAll">
          <div
            onClick={this.goToNextSlide}
            className="arrowDSBottomDiv"
            style={{ marginRight: "30px" }}
          >
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_left_nalwbx.png"
              onClick={this.goToNextSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px",
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
                height: "25px",
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
          <div
            onClick={this.goToPrevSlide}
            className="arrowDSBottomDiv"
            style={{ marginLeft: "30px" }}
          >
            <img
              class="arrowDSBottom"
              src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575980275/arrow_right_aw3xnb.png"
              onClick={this.goToPrevSlide}
              alt=""
              style={{
                zIndex: "3",
                width: "12px",
                height: "25px",
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
                height: "25px",
              }}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddProject);
