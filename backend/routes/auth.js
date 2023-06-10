const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');

const JWT_secret = "HeySiddharth"


// creating a new user. does not require authentication 
router.post('/createuser', [
    body('name', 'Enter a name of min 5 length').isLength({ min: 5 }),
    body('password', 'Enter a pass of min 7 length').isLength({ min: 7 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {

    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // checking a user with email
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists. Try another one" })
        }

        const salt = await bcrypt.genSalt(5);
        const secPassword = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_secret);

        res.json({ authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }


})

// logging in a user. Require authentication 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
], async (req, res) => {

    // checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please enter correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_secret);
        res.json({ authToken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }

})

router.post('/getuser',fetchUser, async (req, res) => {

    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error')
    }
})

module.exports = router 