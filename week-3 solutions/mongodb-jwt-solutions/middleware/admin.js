const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

function adminMiddleware(req, res, next) {
    const jwtToken = req.headers.authorization.split(" ")[1]
    try{
        const decoded = jwt.verify(jwtToken, JWT_SECRET);
        if(decoded.username){
            next();
        }else{
            res.status(403).json({
                message: "You are not authenticated"
            })
        }
    }catch(e){
        res.json({
            msg: "Incorrect inputs"
        })
    }    
}

module.exports = adminMiddleware;