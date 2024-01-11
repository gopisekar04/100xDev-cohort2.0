const {Admin} = require('../db');

function adminMiddleware(req, res, next) {    
    const {username, password} = req.headers; 

    Admin.findOne({
        username: username,
        password: password
    })
    .then((res) => {     
        if(res){            
            next();
        }else{
            res.status(403).send("Admin doesnot exist");
        }
    })
}


module.exports = adminMiddleware;