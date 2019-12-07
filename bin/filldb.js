let _ = require("lodash")
let mongoose = require("mongoose");
let pantsArr = require("./scraped_pants");
let shoesArr = require("./scraped_shoes.js");

let tshirtArr = require("./scraped_tshirts.js");
let jackenArr = require("./scraped_jackets.js");
let cardArr = require("./scraped_cardigans");
let hoodiesArr = require("./scraped_hoodies.js");
let sakkoArr = require("./scraped_sakkos.js");
let hemdenArr = require("./scraped_hemden.js");


const Garments_m = require("../models/garment");
const dotenv = require("dotenv");
dotenv.config();
let unirest = require("unirest");
let unireq = unirest(
  "GET",
  "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list"
);
let topBottomShoes = {
  top: [
    "TSHIRTSTANKS",
    "blazers",
    "blouses",
    "cardigans",
    "cardigansjumpers",
    "coats",
    // "dresses",
    "hoodies",
    "hoodiessweatshirts",
    "hoodiesswetshirts",
    "jacketscoats",
    "jackets",
    "jumpers",
    "shirt",
    "shirts",
    "shirtblouses",
    "shirts",
    "shirtsblouses",
    "shortsleeve",
    "sweatshirts",
    "tshirtstanks",
    "turtleneck",
    "tops",
    "parkas",
    "longsleeve",
    "vests"
  ],
  bottom: [
    "joggers",
    "chinos",
    "jeans",
    "leggings",
    "trousers",
    "swimwear",
    "skirts",
    "shorts",
    "skirts",
    "midiskirts"
  ],
  shoes: ["shoes", "sneakers", "boots", "pumps", "shoes", "sandals", "slippers"]
};

let getProducts = (i, category, pagesNr, targetGarmentCollection) => {
  let tempArr = [];
  unireq.query({
    categories: category, //ladies_all, men_all
    sortBy: "ascPrice",
    country: "de",
    lang: "de",
    currentpage: i,
    pagesize: "100" // 100 == maxSize
  });

  unireq.headers({
    "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    "x-rapidapi-key": "026b46b42amsh9c60acc67a1ca29p1be23ejsn4988aee524e9"
  });

  unireq.end(function(res) {
    if (res.error) throw new Error(res.error);
    console.log("Page: " + i);
    let dbArr = [];
    tempArr.push(...res.body.results);
    console.log("TempArrLenght: " + tempArr.length);

    tempArr.forEach(element => {
      element.articles = element.articles[0];

      let catCodeArr = element.mainCategoryCode.split("_");

      for (let index = 0; index < catCodeArr.length; index++) {
        const partialCatCode = catCodeArr[index];
        if (topBottomShoes.top.includes(partialCatCode)) {
          if (!dbArr.includes(element)) {
          element.topBottomShoe = "top";
          dbArr.push(element);
          return;
          }
        }
        if (topBottomShoes.bottom.includes(partialCatCode)) {
          if (!dbArr.includes(element)) {
          element.topBottomShoe = "bottom";
          dbArr.push(element);
          return;
          }
        }
        if (topBottomShoes.shoes.includes(partialCatCode)) {
          if (!dbArr.includes(element)) {
          element.topBottomShoe = "shoe";
          dbArr.push(element);
          return;
          }
        }
      }
    });

    targetGarmentCollection.collection.insertMany(dbArr);

    if (i < pagesNr) {
      getProducts(i + 1, category, pagesNr, targetGarmentCollection);
    } else {
      console.log("DataBase has been Filled");
    }
  });
};

let dbArr = [];



for (let index = 0; index < shoesArr.length; index++) {
  const element = shoesArr[index];
  let tempObj = {
    name: element.name,
    images: [
      {
        url: "https://" + element.imageLink
      }
    ],
    linkPdp: element.productLink,
    imageUrl: "https://" + element.imageLink,
    price: parseInt(element.price),
    sale: false,
    topBottomShoe: "shoe",
    article_id: 123456789
  };
  dbArr.push(tempObj)
}



for (let index = 0; index < pantsArr.length; index++) {
  const element = pantsArr[index];
  let tempObj = {
    name: element.name,
    images: [
      {
        url: "https://" + element.imageLink
      }
    ],
    linkPdp: element.productLink,
    imageUrl: "https://" + element.imageLink,
    price: parseInt(element.price),
    sale: false,
    topBottomShoe: "bottom",
    article_id: 123456789
  };
  dbArr.push(tempObj)
}


//_______________________________________

let topArr = [...jackenArr, ...tshirtArr, ...cardArr, ...hoodiesArr, ...sakkoArr, ...hemdenArr]
topArr = _.shuffle(topArr)

for (let index = 0; index < topArr.length; index++) {
  const element = topArr[index];
  let tempObj = {
    name: element.name,
    images: [
      {
        url: "https://" + element.imageLink
      }
    ],
    linkPdp: element.productLink,
    imageUrl: "https://" + element.imageLink,
    price: parseInt(element.price),
    sale: false,
    topBottomShoe: "top",
    article_id: 123456789
  };
  dbArr.push(tempObj)
}


console.log(dbArr.length)

mongoose.connect(process.env.MONGODB_URI).then(() => {
  Garments_m.Garments_m.collection.insertMany(dbArr)
  console.log("saving")
  // getProducts(0, "men_all", 20, Garments_m.Garments_m)
});





