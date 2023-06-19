const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String, default: 'nopic.png' },
  location: {
    lat: Number,
    lgn: Number
  }, 
  // createdAt:{type: Date, default: Date.now},
  // updatedAt:{type: Date, default: Date.now}
},{
    toJSON: {virtuals: true},
    timestams: true, // Use
    collection: 'shops'
});
schema.virtual('menus',{
  ref: 'Menu', //Link to Menu modal
  localField: '_id', // Fiel Shop modal
  foreignField: 'shop' // Fiel Menu modal
});
const shop = mongoose.model('Shop', schema);

module.exports = shop;