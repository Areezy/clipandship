const { response } = require('express');
var express = require('express');
var router = express.Router();
const {Clips} = require('../models/clips');
const mongoose = require('mongoose');
const moment = require('moment');



router.get('/', (req, res) => {
  res.render('index', {title : "Clip&Ship"});
});

router.post('/', async(req, res) => {
  let url;

  if(req.body.urlToSave){
    const clipExists = await Clips.findOne({url : req.body.urlToSave});
    if(clipExists) return res.redirect("/" + clipExists.url);
    
  }
  
  url = req.body.urlToSave;


  //encode url in base64
  if(!url) url = Buffer.from(Date.now().toString()).toString('base64');

  // TODO

  const id = new mongoose.Types.ObjectId(); 
  const deleteTime = moment(id.getTimestamp()).add(parseInt(req.body.deleteTime), 'm').toDate();
   
  clip = new Clips({
    _id: id,
    url:url,
    content: req.body.content,
    deleteTime:deleteTime
  });

  try{
    const status = await clip.save();
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



router.get('/:url', async (req, res) => {
  const clip = await Clips.findOne({url : req.params.url});
  if (!clip) return res.redirect("/");

  
  if((clip.deleteTime < moment().toDate()) && clip.visited == true){
    const status = await clip.delete();
    return res.redirect("/");
  }

  clip.visited = true;
  const result = await clip.save();

  res.render('getContent',
   {
    content:clip.content,
    title:"Internet Clipboard"
  });

  try{
    Promise.all([result, status]);

  }catch(err){
    console.log(err.message);
  }



});





module.exports = router;
