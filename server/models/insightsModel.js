const mongoose = require('mongoose');

const wordCountSchema = new mongoose.Schema({
  url: {
    type:String
  },
  count: {
    type:Number
  },
  mediaUrls:[
    {
      type:String
    }
  ],
  linkUrls:[
    {
      type:String
    }
  ],
  favourite:{
    type:Boolean,
    default:null
  },
  created_at: {
     type: Date, default: Date.now 
    }
});


module.exports = mongoose.model('WordCount', wordCountSchema);

