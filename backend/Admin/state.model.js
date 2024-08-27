var mongoose = require('mongoose');
const schema = mongoose.Schema;
var State = new schema({
  stid: { type: Number },
  stname: { type: String },
  status: { type: Number }
},
  {
    collection: 'state'
  });
module.exports = mongoose.model('State', State);
