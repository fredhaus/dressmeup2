let ladies0 = require("./ladies_all_Page0.json")
let ladies1 = require("./ladies_all_Page1.json");
let ladies2 = require("./ladies_all_Page2.json");
let ladies3 = require("./ladies_all_Page3.json");
let ladies4 = require("./ladies_all_Page4.json");
let men0 = require("./men_all_Page0.json");
let men1 = require("./men_all_Page1.json");
let men2 = require("./men_all_Page2.json");
let men3 = require("./men_all_Page3.json");
let men4 = require("./men_all_Page4.json");

let ladies_0_5 = [...ladies0, ...ladies1, ...ladies2, ...ladies3, ...ladies4];

let men_0_5 = [...men0, ...men1, ...men2, ...men3, ...men4];

let men1000 = require("./men_all_10p_1000prod_v3.json")
let ladies1000 = require ("./ladies_all_10p_1000prod_v3.json")


// Main Cat Codes

let men_0_5_mainCatCodes = [];

men_0_5.forEach(element => {
  const x = element.mainCategoryCode.split("_");
  men_0_5_mainCatCodes.push(...x);
});

const uniqueSet = new Set(men_0_5_mainCatCodes);
men_0_5_mainCatCodes = [...uniqueSet].sort();

//_______________________

let ladies_0_5_mainCatCodes = [];

ladies_0_5.forEach(element => {
  const x = element.mainCategoryCode.split("_");
  ladies_0_5_mainCatCodes.push(...x);
});

const uniqueSet2 = new Set(ladies_0_5_mainCatCodes);
ladies_0_5_mainCatCodes = [...uniqueSet2].sort();

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
    "midiskirts",
  ],
  shoes: ["shoes","sneakers", "boots", "pumps", "shoes", "sandals", "slippers"]
};


let men_0_5_tops = []
let men_0_5_bottom = []
let men_0_5_shoes = []

let ladies_0_5_tops = []
let ladies_0_5_bottom = []
let ladies_0_5_shoes = []

men1000.forEach(element => {
  let catCodeArr = element.mainCategoryCode.split("_")
  
  for (let index = 0; index < catCodeArr.length; index++) {
    const partialCatCode = catCodeArr[index];
    if (topBottomShoes.top.includes(partialCatCode)) {
      if (!men_0_5_tops.includes(element)){
        men_0_5_tops.push(element)
      }
    }
    if (topBottomShoes.bottom.includes(partialCatCode)) {
      if (!men_0_5_bottom.includes(element)){
        men_0_5_bottom.push(element)
      }
    }
    if (topBottomShoes.shoes.includes(partialCatCode)) {
      if (!men_0_5_shoes.includes(element)){
        men_0_5_shoes.push(element)
      }

    }
  }

});

let uniqueSet_tops = new Set(men_0_5_tops);
men_0_5_tops = [...uniqueSet_tops];

let uniqueSet_bottom = new Set(men_0_5_bottom);
men_0_5_bottom = [...uniqueSet_bottom];

let uniqueSet_shoes = new Set(men_0_5_shoes);
men_0_5_shoes = [...uniqueSet_shoes];



ladies1000.forEach(element => {
  let catCodeArr = element.mainCategoryCode.split("_")
  
  for (let index = 0; index < catCodeArr.length; index++) {
    const partialCatCode = catCodeArr[index];
    if (topBottomShoes.top.includes(partialCatCode)) {
      if (catCodeArr[index+1] !== "bodys") {
        if (!ladies_0_5_tops.includes(element)){
          ladies_0_5_tops.push(element)
        }
        
      }
    }
    if (topBottomShoes.bottom.includes(partialCatCode)) {
      if (catCodeArr[index-1] !== "dresses") {
        if (!ladies_0_5_bottom.includes(element)){
          ladies_0_5_bottom.push(element)  
        }
      }
    }
    if (topBottomShoes.shoes.includes(partialCatCode)) {
      if (!ladies_0_5_shoes.includes(element)){
      ladies_0_5_shoes.push(element)
      }
    }
  }

});

let uniqueSet_tops_ladies = new Set(ladies_0_5_tops);
ladies_0_5_tops = [...uniqueSet_tops_ladies];

let uniqueSet_bottom_ladies = new Set(ladies_0_5_bottom);
ladies_0_5_bottom = [...uniqueSet_bottom_ladies];

let uniqueSet_shoes_ladies = new Set(ladies_0_5_shoes);
ladies_0_5_shoes = [...uniqueSet_shoes_ladies];


console.log("MEN")
console.log(men_0_5_tops.length)
console.log(men_0_5_bottom.length)
console.log(men_0_5_shoes.length)

console.log("LADIES")
console.log(ladies_0_5_tops.length)
console.log(ladies_0_5_bottom.length)
console.log(ladies_0_5_shoes.length)

module.exports = {
  men_0_5_tops, men_0_5_bottom, men_0_5_shoes, ladies_0_5_tops, ladies_0_5_bottom, ladies_0_5_shoes
}

