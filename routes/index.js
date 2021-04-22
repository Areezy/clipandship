var express = require('express');
var router = express.Router();
const {Clips} = require('../models/clips');

/* GET home page. */

router.get('/', (req, res) => {
  res.render('index', {title : "Internet Clipboard"});
});

// router.get('/:url', async (req, res) => {
//  const clip = await Clips.find({url : req.params.url});
//   if (!clip) res.redirect('/');

//   res.send(req.params.url);
// });





module.exports = router;
