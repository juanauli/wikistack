const express = require('express');
const { Page } = require('../models');
const  wikipage  = require('../views/wikipage');
const { main } = require('../views');
const { addPage } = require('../views');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
      const allPages = await Page.findAll();
      res.send(main(allPages));
    }
    catch(err) {
      next(err);
    }
  });

router.get('/add', (req, res, next) => {
    try{
        res.send(addPage());
    }
    catch(err) {
        next(err);
    }
});

router.get('/:slug', async (req, res, next) => {
    try{
      const foundPage = await Page.findOne({
          where: {slug: req.params.slug}
      });
      console.log(wikipage);
      res.send(wikipage(foundPage));
    }
    catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });
    res.redirect(`/wiki/${page.slug}`);
  }
  catch(err) {
      next(err);
  }

});


module.exports = router;
