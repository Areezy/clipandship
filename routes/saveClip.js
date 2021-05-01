var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');


router.get('/status', async(req, res) => {
  //replace in production
  const qrCodeURL = process.env.qrcodelink + req.query.url;
  QRCode.toDataURL(qrCodeURL, function (err, url) {
  res.render('saveStatus', {status:"Clip Saved Successfully", src:url, link:qrCodeURL});
});
  
 
  });




module.exports = router;
