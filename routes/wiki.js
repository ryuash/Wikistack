const express = require('express');
const router = express.Router();
// in one line const router = require('express').Router();
const addPage = require('../views/addPage');

router.get('/', (req, res) => {
  res.send('Got to get wiki');
});

router.post('/', (req, res) => {
  res.send('Got to post wiki')
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
