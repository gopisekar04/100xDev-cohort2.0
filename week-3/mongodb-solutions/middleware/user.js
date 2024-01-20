const {User} = require("../db");

function userMiddleware(req, res, next) {
    const {username, password} = req.headers;

    User.findOne({
        username: username,
        password: password
    })
    .then((res) => {
        if(res){            
            next();
        }else{
            res.status(403).send("User doesnot exist")
        }
    })


}

module.exports = userMiddleware;