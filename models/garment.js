const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garmentSchema = new Schema({
  name: String,
  images: [{url: String}],
  articles: [{code: String}],
  imageUrl: String,
  price: Number,
  article_id: Number,
  sale: Boolean,
  topBottomShoe: { type: String, index: true }
});


const Garments_m = mongoose.model("Garment_m", garmentSchema);

module.exports = {
  Garments_m,
};
