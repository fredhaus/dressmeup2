import React from "react";
import axios from "axios";
import _ from "lodash";
import UploadPhoto from "./UploadPhoto";
import Slider from "./Slider";
import Slide3 from "./Slide_3";
import Slide4 from "./Slide_4";
import { withRouter } from "react-router-dom";

let hm_url_base = "https://www2.hm.com";
let transSpeed = 0.5
let limit = 100



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
    deleteIDs : []
  };

  shuffle = async () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let sleepTime = 200
    let shuffleNr = 10

    for (let index = 1; index < shuffleNr; index++) {

      if(index<shuffleNr/2){
        sleepTime = sleepTime - 30
      }
      else{
        sleepTime = sleepTime + 30 // slowing down
      }
      transSpeed = sleepTime*0.001
      // console.log(sleepTime)
      await sleep(sleepTime).then(() => { this.goToNextSlide() });
    }
    transSpeed = 0.5

  }

  goToNextSlide = () => {
    if(this.state.currentIndexTop === this.state.topArr.length-50) {
      this.fillTopArryay()
    }
    if(this.state.currentIndexBottom === this.state.bottomArr.length-50) {
      this.fillBottomArryay()
    }
    if(this.state.currentIndexShoe === this.state.shoeArr.length-1) {
      this.fillShoeArryay()
    }

    if(this.state.currentIndexTop === this.state.topArr.length-1) {
      this.setState({
        currentIndexTop: 0
      })
    }
    if(this.state.currentIndexBottom === this.state.bottomArr.length-1) {
      this.setState({
        currentIndexBottom: 0
      })
    }
    if(this.state.currentIndexShoe === this.state.shoeArr.length-1) {
      this.setState({
        currentIndexShoe: 0
      })
    }
    this.setState(prevState => ({
      currentIndexTop: prevState.currentIndexTop + 1,
      currentIndexBottom: prevState.currentIndexBottom + 1,
      currentIndexShoe: prevState.currentIndexShoe + 1,
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
      currentIndexShoe: prevState.currentIndexShoe - 1,
    }));
    console.log("TOP", this.state.currentIndexTop)
    console.log("BOTTOM", this.state.currentIndexBottom)
    console.log("SHOE", this.state.currentIndexShoe)
  };

  fillTopArryay = () => {
    console.log("FILLING TopArr")

    axios.get(`/api/garments/get_m_many_tops?limit=${limit}&offset=${this.state.topArr.length}`, this.state).then(response => {
      console.log("TOP: ", response);
      let newData = _.shuffle(response.data)
      this.setState({
        topArr: [...this.state.topArr, ...newData]
      });
    });
  };

  fillBottomArryay = () => {
    console.log("FILLING BottomArr")

    axios.get(`/api/garments/get_m_many_bottoms?limit=${limit}&offset=${this.state.topArr.length}`, this.state).then(response => {
      console.log("BOTTOM: ", response);
      this.setState({
        bottomArr: [...this.state.bottomArr, ...response.data]
      });
    });
  };

  fillShoeArryay = () => {
    console.log("FILLING ShoeArr")

    axios.get(`/api/garments/get_m_many_shoes?limit=${limit}&offset=${this.state.topArr.length}`, this.state).then(response => {
      console.log("SHOE: ", response);
      this.setState({
        shoeArr: [...this.state.shoeArr, ...response.data]
      });
    });
  };

  componentDidMount = () => {
    this.fillShoeArryay()
    this.fillBottomArryay()
    this.fillTopArryay();
  };

  onClickFavoriteHandler = () => {
    let topId = this.state.topArr[this.state.currentIndexTop]._id
    let bottomId = this.state.bottomArr[this.state.currentIndexBottom]._id
    let shoeId = this.state.shoeArr[this.state.currentIndexShoe]._id
    let user = this.state.user._id
    axios.post(`/api/garments/favorite?topId=${topId}&bottomId=${bottomId}&shoeId=${shoeId}&user=${user}`,).then(response => {
      console.log(response)
    });
  };

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  deleteBottomId = () => {
    let id = this.state.bottomArr[this.state.currentIndexBottom]._id
    console.log(id)
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response)
      console.log(id, " has been deleted")
    })
  }
  
  deleteShoeId = () => {
    let id = this.state.shoeArr[this.state.currentIndexShoe]._id
    console.log(id)
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response)
      console.log(id, " has been deleted")
    })
  }
  
  deleteTopId = () => {
    let id = this.state.topArr[this.state.currentIndexTop]._id
    console.log(id)
    axios.get(`/api/garments/delete?id=${id}`).then(response => {
      console.log(response)
      console.log(id, " has been deleted")
    })
    }


  render() {
    return (
      <div className="randomClothes">
        <button onClick={this.onClickConsoleLog}>Console Log</button>
        <button onClick={this.onClickHandlerMen}>Randon MEN Clothes</button>
        <button onClick={this.onClickFavoriteHandler}>
          FAVORITE this outfit
        </button>
        <br></br>
        <div className="break"></div>
        <button onClick={this.goToNextSlide} onKeyPress={this.goToNextSlide}> {"<<<<<"} </button>
        <button onClick={this.goToPrevSlide}> {">>>>>"} </button>
        <button onClick={this.shuffle}> Shuffle </button>

        {this.state.topArr.length !== 0 || this.state.bottomArr.length !== 0 || this.state.shoeArr.length !== 0 ? (
        <div className="backgroundSilouette">
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
              this.state.currentIndexTop >= i ? (
                    this.state.currentIndexTop > i ? (
                      <Slide3
                        key={i}
                        image={topObj.imageUrl}
                        urlBase={hm_url_base}
                        urlKey={topObj.linkPdp}
                        subClass="slideImageLeftTop"
                        transSpeed={transSpeed}
                      />
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
              this.state.currentIndexBottom >= i ? (
                    this.state.currentIndexBottom > i ? (
                      <Slide3
                        key={i}
                        image={bottomObj.imageUrl}
                        urlBase={hm_url_base}
                        urlKey={bottomObj.linkPdp}
                        subClass="slideImageRightBottom" //slideImageLeftBottom
                        transSpeed={transSpeed}
                      />
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
                  ) : (
                    <Slide3
                      key={i}
                      image={bottomObj.imageUrl}
                      urlBase={hm_url_base}
                      urlKey={bottomObj.linkPdp}
                      subClass="slideImageLeftBottom" //slideImageRightBottom
                    />
                  )
                )}
          </div>
          <div className="shoes slider">
          {this.state.shoeArr.map((shoeObj, i) =>
              this.state.currentIndexShoe >= i ? (
                    this.state.currentIndexShoe > i ? (
                      <Slide4
                        key={i}
                        image={shoeObj.imageUrl}
                        urlBase={hm_url_base}
                        urlKey={shoeObj.linkPdp}
                        subClass="slideImageLeftShoe"
                        transSpeed={transSpeed}
                      />
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
        </div>) : <div>"SOME SPINNER"</div>}
        <button onClick={this.deleteTopId}> delete TOP ID </button>
        <button onClick={this.deleteBottomId}> delete BOTTOM ID </button>
        <button onClick={this.deleteShoeId}> Delete SHOE ID </button>
        <UploadPhoto
          user={this.props.user}
          updateUserImage={this.props.updateUserImage}
        ></UploadPhoto>
      </div>
    );
  }
}

export default withRouter(AddProject);
