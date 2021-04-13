"use strict";
var ImageJS = require("imagejs");
var Jimp = require("jimp");
let cloudinary = require("cloudinary").v2;
let util = require("util");

let cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

var express = require("express");
var router = express.Router();

const {Garments_m} = require("../models/garment");
const Outfit = require("../models/outfit");

let amount = 100;

router.get("/console", (req, res, next) => {
  Garments_m.find().then(result => {
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      console.log(element.name);
    }
  });
});

router.post("/insertshoes", (req, res, next) => {
  console.log("saving");
  Garments_m.collection.insertMany(manualShoes);
});

router.get("/get_m_top", (req, res, next) => {
  let q = {
    topBottomShoe: "top",
    imageUrl: { $exists: true },
    "articles.color.text": { $not: /wei(ss|ß)/i }
  };
  Garments_m.count(q).then(count => {
    console.log(count);
    let random = Math.floor(Math.random() * count);
    Garments_m.findOne(q)
      .skip(random)
      .then(result => {
        res.status(200).json(result);
      });
  });
});

router.get("/get_m_bottom", (req, res, next) => {
  Garments_m.count({
    topBottomShoe: "bottom",
    imageUrl: { $exists: true }
  }).then(count => {
    console.log(count);
    let random = Math.floor(Math.random() * count);
    Garments_m.findOne({ topBottomShoe: "bottom", imageUrl: { $exists: true } })
      .skip(random)
      .then(result => {
        res.status(200).json(result);
      });
  });
});

router.get("/get_m_shoe", (req, res, next) => {
  Garments_m.count({ topBottomShoe: "shoe", imageUrl: { $exists: true } }).then(
    count => {
      console.log(count);
      let random = Math.floor(Math.random() * count);
      Garments_m.findOne({ topBottomShoe: "shoe", imageUrl: { $exists: true } })
        .skip(random)
        .then(result => {
          res.status(200).json(result);
        });
    }
  );
});

router.get("/get_m_many_tops", (req, res, next) => {
  let limit = parseInt(req.query.limit); //für DB
  let offset = parseInt(req.query.offset); //für "Page"

  let q = {
    topBottomShoe: "top",
    imageUrl: { $exists: true },
    "articles.color.text": { $not: /(wei(ss|ß)|hellgrau|hellbeige|hellrosa)/i },
  };

  
  Garments_m.find(q)
    .limit(limit)
    .skip(offset)
    .then(result => {
      res.status(200).json(result);
    });
});

router.get("/get_m_many_bottoms", (req, res, next) => {
  let limit = parseInt(req.query.limit); //für DB
  let offset = parseInt(req.query.offset); //für "Page"
  
  Garments_m.find({
    topBottomShoe: "bottom",
    imageUrl: { $exists: true }
  })
    .limit(limit)
    .skip(offset)
    .then(result => {
      res.status(200).json(result);
    });
});

router.get("/get_m_many_shoes", (req, res, next) => {
  let limit = parseInt(req.query.limit); //für DB
  let offset = parseInt(req.query.offset); //für "Page"

  console.log("LIMIT :", limit);
  console.log("OFFSET :", offset);
  
  Garments_m.find({
    topBottomShoe: "shoe",
    imageUrl: { $exists: true }
  })
    .limit(limit)
    .skip(offset)
    .then(result => {
      res.status(200).json(result);
    });
});

router.post("/favorite", (req, res, next) => {
  Outfit.create({
    topImage: req.query.topId,
    bottomImage: req.query.bottomId,
    shoeImage: req.query.shoeId,
    owner: req.query.user
  })
    .then(response => {
      res.json( "Outfit favorited" );
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/outfits", (req, res, next) => {
  Outfit.find({ owner: req.user._id })

    .populate("topImage")
    .populate("bottomImage")
    .populate("shoeImage") 
    .then(Outfits => {
      res.json(Outfits);
    })
    .catch(error => console.log("Error: ", error));
});

router.get("/alloutfits", (req, res, next) => {
  Outfit.find()
    .populate("topImage")
    .populate("bottomImage")
    .populate("shoeImage")
    .populate("owner")
    .then(Outfits => {
      res.json(Outfits);
    })
    .catch(error => console.log("Error: ", error));
});

router.get("/delete", (req, res, next) => {
  let id = req.query.id; //für DB
  console.log(id)
  Garments_m.findOneAndRemove({_id: id}).then((response) =>{
    res.json({ response });
    console.log(response)
    console.log(id, " has been delelted")
  })
})

module.exports = router;
