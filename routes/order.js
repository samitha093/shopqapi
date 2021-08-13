const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req, res) => {
    res.status(400).json("You cant Access to this file");
});

router.route('/add').post((req, res) => {
    const store = req.body.store;
    const buyer = req.body.buyer;
    const status = req.body.status;
    const product = req.body.product;
    const address = req.body.address;
    
    const newOrder= new Order({
        store,
        buyer,
        status,
        product,
        address,
    });
  
    newOrder.save()
      .then(() => res.json('order added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Order.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error'));
});

router.route('/seller/:id').get((req, res) => {
    Order.find({store:req.params.id},(error,data)=>{
      if(data.length > 0){
        res.json({orders:data});
      }else{
        res.status(400).json("No User");
      }
    })
  });
  router.route('/user/:id').get((req, res) => {
    Order.find({buyer:req.params.id},(error,data)=>{
      if(data.length > 0){
        res.json({orders:data});
      }else{
        res.status(400).json("No User");
      }
    })
  });


  router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
      .then(exercise => {
        exercise.store = req.body.store;
        exercise.buyer = req.body.buyer;
        exercise.status = req.body.status;
        exercise.product = req.body.product;
        exercise.address = req.body.address;
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;