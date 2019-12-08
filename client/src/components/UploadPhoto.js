import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "./styles/index.css";
import ImagePreview from "./ImagePreview"; // source code : ./src/demo/AppWithImagePreview/ImagePreview
import axios from "axios";
// let cloudinary = require("cloudinary").v2;
let cloudinary = require("cloudinary/lib/cloudinary");

let util = require("util");
let cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

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
    axios
      .post("/api/users/imageupload", { ...this.state, user: this.props.user })
      .then(response => {
        console.log(response.data); //Image URL!
        let user = { username: this.props.user.username };
        this.props.updateUserImage(response.data);
        this.props.toggle()
      });
    }

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="photo">
        <button onClick={this.props.toggle}>Cancel</button>
        <div className="photoMaskOverlay">
        </div>
        <div className="photoCamera">
          {this.state.dataUri ? (
            <div>
              
              <ImagePreview className="cameraViewfinder" dataUri={this.state.dataUri} />
              <button onClick={this.submitHandler}>SUBMIT THIS</button>
              <button onClick={this.againHandler}>TAKE AGAIN!</button>
              <button onClick={this.onClickConsoleLog}>Console Log</button>
            </div>
          ) : (
            <div>
            <img className="photoMaskOverlayImage" src="https://res.cloudinary.com/dok2ttvhu/image/upload/v1575120710/PhotoOvalOverlay_ejlkoj.png" />
            <Camera
              className="cameraViewfinder"
              onTakePhotoAnimationDone={this.onTakePhotoAnimationDone}
            />
            </div>
          )}
        </div>
        
      </div>
    );
  }
}

export default UploadPhoto;
