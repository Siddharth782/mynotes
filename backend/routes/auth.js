const express = require('express')
const router = express.Router();

// '/' does not mean localhost:3000/. It means localhost:3000/api/auth (i.e it would be addition to the already existing route where it is required)
router.get('/',(req,res)=>{
res.send({a:"stupid",b:'really stupid'})
})

module.exports = router 