const express = require('express');
const router = express.Router();
const { Page } = require("../models");
// const { addPage } = require("../views");
// in one line const router = require('express').Router();
const addPage = require('../views/addPage');

router.get('/', (req, res) => {
  res.send('Got to get wiki');
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });


  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
