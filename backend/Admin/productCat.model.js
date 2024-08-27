var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ProductCat = new Schema({
  productId: { type: Number },
  productCatg: { type: String }
},
  {
    collection: 'productcat'
  });
module.exports = mongoose.model('ProductCat', ProductCat);