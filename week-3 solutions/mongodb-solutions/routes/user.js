const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const {username, password} = req.body;

    await User.create({
        username,
        password
    })

    res.status(200).json({
        message: "User created successfully"
    })

    
});

router.get('/courses', async(req, res) => {

    const response = await Course.find({});

     res.json({
         courses: response
     })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const {courseId} = req.params;
    const {username} = req.headers;

    await User.updateOne({
        username
    }, {
        "$push": {
            purchasedCourse: courseId
        }
    })

    res.status(200).json({
        message: "Purchase Completed! Happy Learing!."
    })

    
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const {username} = req.headers;

    const userDetails = await User.findOne({
        username
    })

    const courses = await Course.find({
        _id: {
            "$in": userDetails.purchasedCourses
        }
    })

    res.json({
        courses
    })
    
});

module.exports = router