var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const {Clips} = require('../models/clips');
const moment = require('moment');
var QRCode = require('qrcode');



router.get('/', async(req, res) => {

  const clipExists = await Clips.findOne({url : req.query.urlToSave});
  let url = req.query.urlToSave;

  //encode url in base64
  if(!url) url = Buffer.from(Date.now().toString()).toString('base64');

  // TODO
  
  if(clipExists) return res.redirect('/get/:id', {
    content:clipExists.content,
    title:"Internet Clipboard"
  
  });

  const id = new mongoose.Types.ObjectId(); 
  const deleteTime = moment(id.getTimestamp()).add(parseInt(req.query.deleteTime), 'm').toDate();
   
  clip = new Clips({
    _id: id,
    url:url,
    content: req.query.savedItem,
    deleteTime:deleteTime
  });

  try{
    const status = await clip.save();
    console.log(status);
    res.redirect(`/save/status/?url=${url}`);
  }catch(err){
    console.log(err.message);
  }

  try{
    Promise.all([clipExists, status]);

  }catch(err){
    console.log(err.message);
  }


});

router.get('/status', async(req, res) => {
  //replace in production
  const qrCodeURL = process.env.qrcodelink + req.query.url;
  QRCode.toDataURL(qrCodeURL, function (err, url) {
  res.render('saveStatus', {status:"Clip Saved Successfully", src:url, link:qrCodeURL});
});
  
 
  });



module.exports = router;
