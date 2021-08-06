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


module.exports = router;
