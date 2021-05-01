var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const {Clips} = require('../models/clips');
const moment = require('moment');
var QRCode = require('qrcode');


router.get('/status', async(req, res) => {
  //replace in production
  const qrCodeURL = process.env.qrcodelink + req.query.url;
  QRCode.toDataURL(qrCodeURL, function (err, url) {
  res.render('saveStatus', {status:"Clip Saved Successfully", src:url, link:qrCodeURL});
});
  
 
  });




module.exports = router;
