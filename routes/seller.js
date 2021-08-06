const router = require('express').Router();
let Seller = require('../models/seller.model');

router.route('/').get((req, res) => {
    res.status(400).json("You cant Access to this file");
});

router.route('/:id').get((req, res) => {
    Seller.find({storeid:req.params.id},(error,data)=>{
      if(data.length > 0){
        res.json({store:data[0]});
      }else{
        res.status(400).json("No User");
      }
    })
});

router.route('/user/:id').get((req, res) => {
  Seller.find({storeuser:req.params.id},(error,data)=>{
    if(data.length > 0){
      res.json({store:data[0]});
    }else{
      res.status(400).json("No User");
    }
  })
});

router.route('/add').post((req, res) => {
    const storename = req.body.storename;
    const storeid = req.body.storeid;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const province = req.body.province;
    const storeuser = req.body.storeuser;

    const newStore= new Seller({
        storename,
        storeid,
        email,
        mobile,
        address,
        province,
        storeuser
    });
  
    newStore.save()
      .then(() => res.json('seller added!'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const Storeuser = req.body.storeuser;
    const token = req.body.token;
  
    Seller.find({storeuser:Storeuser},(error,data)=>{
      if(data.length > 0){
        res.json({store:data[0]});
      }else{
        res.status(400).json("No User");
      }
    })
  });
  module.exports = router;
  