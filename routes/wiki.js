const express = require('express');
const { Page } = require('../models');
const {addPage} = require('../views');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('It worked!!');
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
  });

router.post('/', async (req, res, next) => {
  try {
    // const name = req.body.name;
    // const email = req.body.email;
    // const title = req.body.title;
    // const content = req.body.content;
    // const status = req.body.status;
    const page = await Page.create(req.body);

    res.redirect('/');
  }
  catch(err) {
      next(err);
  }

});


module.exports = router;
