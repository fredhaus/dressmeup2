import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "./styles/index.css";
import ImagePreview from "./ImagePreview"; // source code : ./src/demo/AppWithImagePreview/ImagePreview
import axios from "axios";
import CancelTwoToneIcon from "@material-ui/icons/CancelTwoTone";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import ReplayTwoToneIcon from "@material-ui/icons/ReplayTwoTone";

let util = require("util");

class UploadPhoto extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { dataUri: null };
    this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
    this.againHandler = this.againHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onClickConsoleLog = this.onClickConsoleLog.bind(this);
  }

  onTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto");
    this.setState({ dataUri });
    // console.log(this.state.dataUri);
  }

  againHandler() {
    this.setState({
      dataUri: null
    });
  }

  submitHandler() {
    this.props.toggle();
    this.props.toggleSnackbar()
    // this.props.snackbarHandleClick()
    if (this.state.dataUri != null) {
      axios
        .post("/api/users/imageupload", {
          ...this.state,
          user: this.props.user
        })
        .then(response => {
          console.log(response.data); //Image URL!
          // let user = { username: this.props.user.username };
          this.props.updateUserImage(response.data);
        });
    }
  }

  onClickConsoleLog = () => {
    console.log(this.state);
  };
  

  render() {
    return (
      <div className="photo">
        
        <br />
        <br />
        {/* <div className="photoMaskOverlay">
        </div> */}
        <div className="photoCamera photoUploaderMaster">
          {this.state.dataUri ? (
            <div className="photoUploaderMaster">
              <img
                className="photoMaskOverlayImage_after"
                src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575120710/PhotoOvalOverlay_ejlkoj.png"
              />

              <ImagePreview dataUri={this.state.dataUri} />
            </div>
          ) : (
            <div className="photoUploaderMaster" style={{ height: "225px" }}>
              <img
                className="photoMaskOverlayImage"
                src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575120710/PhotoOvalOverlay_ejlkoj.png"
              />
              <Camera
                onTakePhotoAnimationDone={this.onTakePhotoAnimationDone}
              />
            </div>
          )}
          {this.state.dataUri ? (
            <div className="photoIconsDiv photoUploaderMaster">
              <CheckCircleTwoToneIcon
                style={{ filter: "drop-shadow(0 0 0.25rem #b0ffb4)", marginLeft: "50px",height: "35px", width: "35px" ,transform: "rotateY(0deg)",
                transitionProperty: "all",
                transitionDuration: "0.5s",
                transitionTiminFunction:"ease", marginTop:"10px", marginBottom:"10px", opacity:"1"}}
                onClick={this.submitHandler}
                className="photoIcon photoUploaderMaster"
              />
              <CancelTwoToneIcon
                style={{ height: "35px", width: "35px", marginTop:"10px", marginBottom:"10px" }}
                onClick={this.props.toggle}
              />
              <ReplayTwoToneIcon
                style={{ filter: "drop-shadow(0 0 0.3rem #708fff)",  marginRight: "50px", height: "35px", width: "35px" ,transform: "rotateY(0deg)",
                transitionProperty: "all",
                transitionDuration: "0.5s",
                transitionTiminFunction:"ease", marginTop:"10px", marginBottom:"10px", opacity:"1"}}
                onClick={this.againHandler}
                className="photoIcon photoUploaderMaster"
              />
            </div>
          ) : (
            <div className="photoIconsDiv photoUploaderMaster">
              <CheckCircleTwoToneIcon
                style={{ marginLeft: "50px", height: "35px", width: "35px" ,transform: "rotateY(90deg)",
                transitionProperty: "all",
                transitionDuration: "0.5s",
                transitionTiminFunction:"ease", marginTop:"10px", marginBottom:"10px", opacity:"0"}}
                onClick={this.submitHandler}
                className="photoIconHidden"
              />
              <CancelTwoToneIcon
                style={{  height: "35px", width: "35px", marginTop:"10px", marginBottom:"10px"}}
                onClick={this.props.toggle}
              />
              <ReplayTwoToneIcon
                style={{ marginRight: "50px", height: "35px", width: "35px" ,transform: "rotateY(90deg)",
                transitionProperty: "all",
                transitionDuration: "0.5s",
                transitionTiminFunction:"ease",marginTop:"10px", marginBottom:"10px", opacity:"0"}}
                onClick={this.againHandler}
                className="photoIconHidden"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UploadPhoto;
