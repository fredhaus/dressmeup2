const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
  topImage: { type: Schema.Types.ObjectId, ref: 'Garment_m' },
  bottomImage: { type: Schema.Types.ObjectId, ref: 'Garment_m' },
  shoeImage: { type: Schema.Types.ObjectId, ref: 'Garment_m' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;