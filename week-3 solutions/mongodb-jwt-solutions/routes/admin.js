const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} =  require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const z = require("zod")

// Admin Routes

const usernameSchema = z.string().email();
const passwordSchema = z.string().min(6);

router.post('/signup', async(req, res) => {
    const {username, password} = req.body;

    const usernameResponse = usernameSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(usernameResponse.success){
        if(passwordResponse.success){
        await Admin.create({
            username,
            password
        })
    
        res.json({
            message: "Admin created successfully"
        })
    }else{
        res.json({
            message: "Password must be mininum of 6 character"
        })
    }
    }
    else{
        res.json({
            message: "invalid email"
        })
    }     
});

router.post('/signin', async(req, res) => {
    const {username, password} = req.body;

    const user = await Admin.findOne({
        username, 
        password
    })

    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        req.json({
            token
        })
    }else{
        res.status(411).json({
            message: "Incorrest emial or password"
        })
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;
