const { Garments_f, Garments_m } = require("../models/garment");

// Garments_m.collection.findOneAndUpdate({"articles.code": "0145872001"}, {$set: {"imageUrl": "diesdasjenes.com"}})
// Garments_m.collection.find({"articles.code": "0145872001"})  //{$set: {"imageUrl": "diesdasjenes.com"}}
//   .then(result => {
//     return console.log(result)
//   })


Garments_m.findOne({"name": "Sportshirt"}).then(article =>{
  console.log(article.name)
})


console.log("done")
