
let men1000 = require("./men_all_10p_1000prod_v3.json")
let ladies1000 = require ("./ladies_all_10p_1000prod_v3.json")


// Main Cat Codes

// let men_0_5_mainCatCodes = [];

// men_0_5.forEach(element => {
//   const x = element.mainCategoryCode.split("_");
//   men_0_5_mainCatCodes.push(...x);
// });

// const uniqueSet = new Set(men_0_5_mainCatCodes);
// men_0_5_mainCatCodes = [...uniqueSet].sort();

// //_______________________

// let ladies_0_5_mainCatCodes = [];

// ladies_0_5.forEach(element => {
//   const x = element.mainCategoryCode.split("_");
//   ladies_0_5_mainCatCodes.push(...x);
// });

// const uniqueSet2 = new Set(ladies_0_5_mainCatCodes);
// ladies_0_5_mainCatCodes = [...uniqueSet2].sort();

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

let men1000db = []
let ladies1000db = []

men1000.forEach(element => {
  let catCodeArr = element.mainCategoryCode.split("_")
  
  for (let index = 0; index < catCodeArr.length; index++) {
    const partialCatCode = catCodeArr[index];
    if (topBottomShoes.top.includes(partialCatCode)) {
      if (!men1000db.includes(element)){
        element.topBottomShoe = "top"
        men1000db.push(element)
        return
      }
    }
    if (topBottomShoes.bottom.includes(partialCatCode)) {
      if (!men1000db.includes(element)){
        element.topBottomShoe = "bottom"
        men1000db.push(element)
        return
      }
    }
    if (topBottomShoes.shoes.includes(partialCatCode)) {
      if (!men1000db.includes(element)){
        element.topBottomShoe = "shoe"
        men1000db.push(element)
        return
      }
    }
  
  } 

});
ladies1000.forEach(element => {
  let catCodeArr = element.mainCategoryCode.split("_")
  
  for (let index = 0; index < catCodeArr.length; index++) {
    const partialCatCode = catCodeArr[index];
    if (topBottomShoes.top.includes(partialCatCode)) {
      if (!ladies1000db.includes(element)){
        element.topBottomShoe = "top"
        ladies1000db.push(element)
        return
      }
    }
    if (topBottomShoes.bottom.includes(partialCatCode)) {
      if (!ladies1000db.includes(element)){
        element.topBottomShoe = "bottom"
        ladies1000db.push(element)
        return
      }
    }
    if (topBottomShoes.shoes.includes(partialCatCode)) {
      if (!ladies1000db.includes(element)){
        element.topBottomShoe = "shoe"
        ladies1000db.push(element)
        return
      }
    }
  
  } 

});

// console.log("MEN")
// console.log(men1000db.length)

// console.log("LADIES")
// console.log(ladies1000db.length)

// console.log(men1000db[0])

module.exports = {
  men1000db, ladies1000db
}

