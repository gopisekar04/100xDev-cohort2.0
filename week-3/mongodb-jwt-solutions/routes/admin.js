const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middleware/admin");
const {Admin, Course} =  require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const {usernameSchema, passwordSchema, courseSchema} = require('./type');


// Admin Routes
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
            message: "invalid email/ username"
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

        res.json({
            token
        })
    }else{
        res.status(411).json({
            message: "Incorrest emial or password"
        })
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    const response = courseSchema.safeParse(req.body);
    const {title, description, price, imageLink} = req.body;

    if(response.success){
         Course.create({
            title,
            description,
            price,
            imageLink            
        }).then((course) => {
            res.status(201).json({
                message: "Course created successfully",
                course_id: course._id
            })
        })
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    try{
        const courses = await Course.find({})
        res.json({
            courses
        })
    }catch(e){
        res.json({
            message: "Couldn't fetch courses"
        })
    }


});

module.exports = router;
