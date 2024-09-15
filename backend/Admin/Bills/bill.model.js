const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
  billid: { type: Number },
  billdata: { type: String },
  cid: { type: Number },
  pid: { type: Number }
},
  {
    collection: 'Bill'
  }
);

module.exports = mongoose.model('Bill', Bill);
