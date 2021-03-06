const mongoose = require('mongoose');

const clipSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
   url : {
       type: String,
   },
   content : {
       type: String,
       required: true
   },
   deleteTime:{
       type: Date
   },
   visited:{
       type:Boolean,
       default:false
   }
});

const Clips = mongoose.model('clips', clipSchema);

exports.Clips = Clips;
