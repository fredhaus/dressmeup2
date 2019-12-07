var express = require("express");
var router = express.Router();
let cloudinary = require("cloudinary").v2;
let cloudinaryPreset = "/t_face_191130"
const User = require("../models/user");


/* GET users listing. */
router.post("/imageupload", function(req, res, next) {
  const dataUri = req.body.dataUri;

  // console.log(username)

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  cloudinary.image(dataUri, {
    transformation: [
      { width: 400, height: 400, gravity: "face", radius: "max", crop: "crop" },
      { width: 200, crop: "scale" }
    ]
  });

  cloudinary.uploader.upload(dataUri, (err, result) => {
    
    if (err){
      console.log(err)
    }
    console.log("result :", result);
    
    let imageUrl = result.url.replace('upload', 'upload' + cloudinaryPreset)

    User.findByIdAndUpdate(req.user._id, {headPic: imageUrl} ).then(foundUser => {
        console.log(foundUser)
        res.status(200).json(imageUrl);

      })

  });

});

module.exports = router;

// cloudinary.config({
//   cloud_name: "dok2ttvhu",
//   api_key: "254219857648234",
//   api_secret: "wa3rRnlI4tNxtyCMa0y-HlKe2JM"
// });

// // cloudinary.image("transp.png", {
// //   gravity: "g_auto",
// //   crop: "fill"
// // });

// var dataURI = this.state.dataUri
// var uploadStr = 'data:image/jpeg;base64,' + dataURI;

// cloudinary.uploader.upload(uploadStr, {
//     overwrite: true,
//     invalidate: true,
//     crop: "fill"
// },
//     function (error, result) {
//         console.log(result)
//     });

// // UPLOAD TO CLOUDINARY ROUND BUT FROM BACKEND
// // UPLOAD TO CLOUDINARY ROUND BUT FROM BACKEND
// // UPLOAD TO CLOUDINARY ROUND BUT FROM BACKEND
// #
