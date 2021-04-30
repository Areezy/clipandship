const { response } = require('express');
var express = require('express');
var router = express.Router();
const {Clips} = require('../models/clips');



router.get('/', (req, res) => {
  res.render('index', {title : "Internet Clipboard"});
});


router.get('/clip/:url', async (req, res) => {
  const clip = await Clips.findOne({url : req.params.url});
  if (!clip) return res.status(404).send("Not Found");

  res.render('getContent',
   {content:clip.content,
    title:"Internet Clipboard"
  });
});





module.exports = router;
