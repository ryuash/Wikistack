const express = require('express');
const router = express.Router();
const { Page } = require("../models");
// const { addPage } = require("../views");
// in one line const router = require('express').Router();
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/', async(req, res,next) => {
  try{
    const allPages = await Page.findAll();
    res.send(mainPage(allPages));
  }
  catch(error){
    next(error);
  }
  // res.send(mainPage());
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status:req.body.status,
  });


  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  }
  catch(error){ next(error) }
});

router.get('/:slug', async (req, res, next) => {
  try{
    const content = await Page.findOne({
      where: {slug:req.params.slug},
    });
    // await Page.save();
    res.send(wikiPage(content));
    // res.redirect(`/wiki/${content.slug}`);
  }
  catch(error){
    next(error);
  }
  
  // console.log(slug.dataValues);
  // res.send(wikiPage());
});

module.exports = router;
