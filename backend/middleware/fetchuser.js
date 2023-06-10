const jwt = require('jsonwebtoken');
const JWT_secret = "HeySiddharth"

const fetchUser = (req, res, next) => {

    // header is the one in which we generally pass content-type->application/json
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please enter a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please enter a valid token"})
    }
}

module.exports = fetchUser;