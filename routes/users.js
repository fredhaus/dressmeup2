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
    res.status(200).json(imageUrl);

    try{
    User.findByIdAndUpdate(req.user._id, {headPic: imageUrl})
    }
    catch(error) {
      console.error(error)
    }
  })

})

module.exports = router;
