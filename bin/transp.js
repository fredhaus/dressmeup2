let mongoose = require('mongoose')
var ImageJS = require("imagejs");
var Jimp = require("jimp");

let cloudinary = require("cloudinary").v2;
let util = require("util");

let axios = require('axios')

let cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

const { Garments_m } = require("../models/garment");

require('dotenv').config()

let makeTransPng2 = async (url, id) => {
  var transparent = { r: 255, g: 255, b: 255, a: 0 }; // alpha defaults to 255
  var bitmap = new ImageJS.Bitmap();

  const jimpImageObj = await Jimp.read(url);
  console.log("image has been loaded");
  jimpImageObj.write("image.jpg");
  jimpImageObj.greyscale();

  jimpImageObj.write("image_grey.jpg"); // save

  await bitmap.readFile("image_grey.jpg");
  let height = bitmap._data.height;
  let width = bitmap._data.width;

  let basePixel = bitmap.getPixel(1, 1);
  let transpObj = {
    left: [],
    right: [],
    top: [],
    bottom: []
  };
  let edgeObj = {
    left: [],
    right: [],
    top: [],
    bottom: []
  };

  let y_topEncounter = 500
  let y_bottomEncounter = 0

  // TRANSPARENT from Left
  for (let index = 0; index < height; index++) {
    const y_Coord = index;
    for (let index = 0; index < width; index++) {
      const x_Coord = index;
      let pixelToCheck = bitmap.getPixel(x_Coord, y_Coord);
      if (
        pixelToCheck.r > (basePixel.r - 30) || // rec238 - 213
        pixelToCheck.g > (basePixel.g - 30) ||
        pixelToCheck.b > (basePixel.b - 30)
      ) {
        transpObj.left.push([x_Coord, y_Coord]);
      } else {
        edgeObj.left.push([x_Coord, y_Coord]);
        break;
      }
    }
  }

  // TRANSPARENT from right
  for (let index = 0; index < height; index++) {
    const y_Coord = index;
    for (let index = width; index > 0; index--) {
      const x_Coord = index;
      let pixelToCheck = bitmap.getPixel(x_Coord, y_Coord);
      if (
        pixelToCheck.r > (basePixel.r - 30) ||
        pixelToCheck.g > (basePixel.g - 30) ||
        pixelToCheck.b > (basePixel.b - 30)
      ) {
        transpObj.right.push([x_Coord, y_Coord]);
      } else {
        break;
      }
    }
  }

  // TRANSPARENT from top
  for (let index = 0; index < width; index++) {
    const x_Coord = index;
    for (let index = 0; index < height; index++) {
      const y_Coord = index;
      let pixelToCheck = bitmap.getPixel(x_Coord, y_Coord);
      if (
        pixelToCheck.r > (basePixel.r - 30) ||
        pixelToCheck.g > (basePixel.g - 30) ||
        pixelToCheck.b > (basePixel.b - 30)
      ) {
        transpObj.top.push([x_Coord, y_Coord]);
      } else {
        if (y_Coord < y_topEncounter){
          y_topEncounter = y_Coord
        }
        break;
      }
    }
  }

  // TRANSPARENT from bottom
  for (let index = 1; index < width; index++) {
    const x_Coord = index;
    for (let index2 = height - 1; index2 > 0; index2--) {
      const y_Coord = index2;
      let pixelToCheck = bitmap.getPixel(x_Coord, y_Coord);
      if (
        pixelToCheck.r > (basePixel.r - 30) ||
        pixelToCheck.g > (basePixel.g - 30) ||
        pixelToCheck.b > (basePixel.b - 30)
      ) {
        transpObj.bottom.push([x_Coord, y_Coord]);
      } else {
        
        if (y_Coord > y_bottomEncounter){
          y_bottomEncounter = y_Coord
        }
        break;
      }
    }
  }

  await bitmap.readFile("image.jpg");
  for (let index = 0; index < transpObj.left.length; index++) {
    let x = transpObj.left[index][0];
    let y = transpObj.left[index][1];
    bitmap.setPixel(x, y, transparent);
  }

  for (let index = 0; index < transpObj.right.length; index++) {
    let x = transpObj.right[index][0];
    let y = transpObj.right[index][1];
    bitmap.setPixel(x, y, transparent);
  }
  for (let index = 0; index < transpObj.top.length; index++) {
    let x = transpObj.top[index][0];
    let y = transpObj.top[index][1];
    bitmap.setPixel(x, y, transparent);
  }
  for (let index = 0; index < transpObj.bottom.length; index++) {
    let x = transpObj.bottom[index][0];
    let y = transpObj.bottom[index][1];
    bitmap.setPixel(x, y, transparent);
  }


  let cropped =  bitmap.crop({
    top: y_topEncounter,
    left: 0,
    width: width,
    height: y_bottomEncounter - y_topEncounter
  })
  

  await cropped.writeFile("transp.png", { quality: 100 })

  console.log("FILE HAS BEEN SAVED!")


  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

  cloudinary.image("transp.png", {
    gravity: "g_auto",
    crop: "fill"
  });

  let upload = cloudinaryUpload("transp.png", { tags: id });
  return upload
};

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {        
    let count = 0
    const results_m = await Garments_m.find({});
    for (let element of results_m) {
      count += 1
      console.log("CURRENTLY :", count)
      console.log("TOTAL MEN :", results_m.length)
      try {
        const upload = await makeTransPng2(
          element.images[0].url,
        );

        console.log("URL IS ", upload.url)
        axios.get(upload.url).catch((err) => {
          console.log(" Cloudinary upload error ")
          console.log(err)
          throw new Error(err)
        })

        await Garments_m.findOneAndUpdate(
          { _id: element._id }, // find through Article ID??
          { imageUrl: upload.url }
        );
      } catch (error) {
        console.error("error ", error);

      }
    }
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  }).then( () => {
    mongoose.connection.close()
  })




