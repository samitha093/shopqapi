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

router.route('/seller/:id').get((req, res) => {
    Order.find({store:req.params.id},(error,data)=>{
      if(data.length > 0){
        res.json({store:data[0]});
      }else{
        res.status(400).json("No User");
      }
    })
  });
  router.route('/user/:id').get((req, res) => {
    Order.find({buyer:req.params.id},(error,data)=>{
      if(data.length > 0){
        res.json({store:data[0]});
      }else{
        res.status(400).json("No User");
      }
    })
  });

module.exports = router;