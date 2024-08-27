const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
  CUSerID: { type: Number },
  CUserPass: { type: String },
  CustomerName: { type: String },
  StId: { type: Number },
  CtId: { type: Number },
  CAddress: { type: String },
  CEmail: { type: String },
  CConatct: { type: String },
  CPicName: { type: String },
  Cid: { type: Number }

},
  {
    collection: 'Customer'
  }
);

module.exports = mongoose.model('Customer', Customer);