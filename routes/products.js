const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find({status:"Active"})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/store/:id').get((req, res) => {
    Product.find({store:req.params.id})
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/store/v/:id').get((req, res) => {
    Product.find({store:req.params.id , status:"Active"})
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const img = req.body.img;
    const price = req.body.price;
    const qty = req.body.qty;
    const status = req.body.status;
    const store = req.body.store;
  
    const newproduct = new Product({
        title,
        img,
        price,
        qty,
        status,
        store
    });
  
    newproduct.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });



  router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
      .then(exercise => {
        exercise.title = req.body.title;
        exercise.img = req.body.img;
        exercise.price = req.body.price;
        exercise.qty = req.body.qty;
        exercise.status = req.body.status;
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json('Product deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;