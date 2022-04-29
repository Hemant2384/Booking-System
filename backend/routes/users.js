const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');

//Register
router.post('/register', async (req, res) => {
    try {
        //Get the input
        const { username, password ,role} = req.body;

        //Validating the fields entered
        if (!(username && password && role)) {
            res.status(400).json({ message: "All inputs are required" });
        }
        //Checking if user already exists
        const oldUser = await User.findOne({ username: username });
        if (oldUser) {
            res.status(409).json({ message: "User is already registered" });
        }

        let encryptedPassword = await bcrypt.hash(password, 15);

        const user = await User.create({
            username: username.toLowerCase(), // sanitize: convert username to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: 60 * 60 *60
            }
        );

        user.token = token;
        user.role=role;
        user.save();
        res.status(201).json({ message: "User successfully registered" });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//Login
router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        // Get user input

        const { username, password,role} = req.body;

        // Validate user input
        if (!(username && password && role)) {
            res.status(400).json({ message: "All input is required" });
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password)) && role===user.role) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            user.token = token;
            user.save();
            res.status(200).json({ message: "Successful log in", token: token });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
        // res.status(500).json({message: "Internal Server Error"});
    }
});


router.get('/users',authUser,authRole('admin'),async (req,res)=>{
    const users = await User.find();
    res.send(users)

})

router.get('/admin',authUser,authRole('admin'),async (req,res)=>{
    const curr_user = await User.findOne({username:req.body.username});
    res.send(curr_user)

})



module.exports = router;