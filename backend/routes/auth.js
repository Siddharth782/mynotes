const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

// creating a new user. does not require authentication 
// don't use get for storing data as password would be exposed in that as data sent by 'get' is included in the url.
router.post('/',[
    body('name','Enter a name of min 5 length').isLength({min:5}),
    body('password','Enter a pass of min 7 length').isLength({min:7}),
    body('email','Enter a valid email').isEmail(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
    }

    // 1st method
    console.log(req.body);
    // const user = User(req.body)
    // user.save()
    // res.send(req.body)

    // 2nd method 
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }).then(user=>res.json(user)).catch(err=>{console.log(err)
     res.json({error:'Please enter a unique value for email',message:err.message})})

})

module.exports = router 