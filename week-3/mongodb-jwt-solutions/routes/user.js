const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db");
const {usernameSchema, passwordSchema, courseSchema} = require("./type")
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    const {username, password} = req.body;
    const usernameResponse = usernameSchema.safeParse(username);
    const passwordResponse = passwordSchema.safeParse(password);

    if(usernameResponse.success){
        if(passwordResponse.success){
            User.create({
                username,
                password
            }).then(() => {
                res.status(201).json({
                    message: "user created Successfully"
                })
            })
        }
        else{
            res.json({
                message: "Password should be minimum of 6 character"
            })
        }
    }else{
        res.json({
            message: "Invalid username/ email"
        })
    }
});

router.post('/signin', async(req, res) => {
    const {username, password} = req.body;

    const dbResponse = await User.findOne({
        username,
        password
    })

    if(dbResponse != null){
        const jwtToken = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token: jwtToken
        })
    }else{
        res.json({
            message: "user does not exist"
        })
    }
});

router.get('/courses', (req, res) => {
    Course.find({}).then((courses) => {
        res.json({
            courses            
        })
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const {courseId} = req.params
    const {username} = req.headers
    
    await User.updateOne({
        username
    }, {
        "$push": {
            purchasesCourses: courseId
        }
    })

    res.json({
        message: "course purchased successfully"
    })
});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    const user = await User.findOne({
        username: req.headers.username
    })

    const courses = await Course.find({
        _id: {
            "$in": user.purchasesCourses
        }
    })

    res.json({
        courses
    })
});

module.exports = router