const router = require('express').Router();
let Exercise = require('../models/cart.model');

router.route('/').get((req, res) => {
    res.status(400).json("You cant Access to this file");
});

router.route('/add').post((req, res) => {
    const productid = req.body.productid;
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const qty = req.body.qty;
    const username = req.body.username;
    const store = req.body.store;
    const status = req.body.status;
    const newExercise = new Exercise({
      productid,
      title,
      img,
      price,
      qty,
      username,
      store,
      status
    });
  
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req, res) => {
    Exercise.find({username:req.params.id})
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;