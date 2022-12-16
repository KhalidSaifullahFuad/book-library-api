// Dependency
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token)
        return res.status(401).json({error : "Access denied"});

    try{
        const payload = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = payload;
        next();
    }catch(err){
        res.status(400).json({error : "Invalid token"});
    }
}