const router = require('express').Router();
const jwt = require("jsonwebtoken");
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    res.status(400).json("You cant Access to this file");
});

// router.route('/:id').get((req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
  const username = req.body.r_username;
  const password = req.body.r_password;

  const newUser = new User({
    username,
    password
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.find({username:username, password:password},(error,data)=>{
    if(data.length > 0){
      const token = jwt.sign(
        {username: data[0].username, password: data[0].password},"Secretkey"
        );
      res.json({username:data[0].username,token});
    }else{
      res.status(400).json("No User");
    }
  })
});

router.route('/update/:id').post((req, res) => {
  User.find({username:req.params.id},(error,data)=>{
    if(data.length > 0){
      //res.json({username:data[0].id});
      User.findById(data[0].id)
      .then(exercise => {
        exercise.username = req.body.username;
        exercise.password = req.body.password;
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error : ' + err));
      })
      .catch(err => res.status(400).json('Error : ' + err));
    }else{
      res.status(400).json('Error 112')
    }
  })
 
});


module.exports = router;
