import React, { Component } from "react";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
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
      });
    // console.log("image upload happening!")
    // cloudinary.config({
    //   cloud_name: "dok2ttvhu",
    //   api_key: "254219857648234",
    //   api_secret: "wa3rRnlI4tNxtyCMa0y-HlKe2JM"
    // });

    // cloudinary.image(this.state.dataUri, {transformation: [
    //   {width: 400, height: 400, gravity: "face", radius: "max", crop: "crop"},
    //   {width: 200, crop: "scale"}
    //   ]})

    // cloudinary.uploader.upload(this.state.dataUri, (err, result) => {
    //   console.log(err)
    //   console.log(result)
    //   if (err) return err
    //   this.setState({
    //     imageUrl: result.url
    //   })
    // })

    // PROMISIFY VARIANT
    // cloudinaryUpload(this.state.dataUri, { tags: "FE_test" }).then(res => {
    //   console.log(res.url)
    // })
  }

  // https://res.cloudinary.com/dok2ttvhu/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1575066544/owerm5v17nijbutl4teu.png

  onClickConsoleLog = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="photo">
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
