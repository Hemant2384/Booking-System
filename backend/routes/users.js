const express = require('express');
const router = express.Router();
const User = require('../model/user');
const Issue = require('../model/issue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');

//Register
router.post('/register', async (req, res) => {
    try {
        //Get the input
        const { name, email, gender, password ,role} = req.body;

        //Validating the fields entered
        if (!(email && password && role && name && gender)) {
            res.status(400).json({ message: "All inputs are required" });
        }
        //Checking if user already exists
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            res.status(409).json({ message: "User is already registered" });
        }

        let encryptedPassword = await bcrypt.hash(password, 15);

        const user = await User.create({
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: 60 * 60 *60
            }
        );

        user.token = token;
        user.name = name;
        user.gender = gender;
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

        const { email,password,role} = req.body;

        // Validate user input
        if (!(email && password && role)) {
            res.status(400).json({ message: "All input is required" });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password)) && role===user.role) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
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

// authUser,authRole('admin')

router.post('/users',authUser,authRole('admin'),async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users)
    }
    catch (err) {
        console.log(err);
    }

})

router.get('/admin',authUser,authRole('admin'),async (req,res)=>{
    const curr_user = await User.findOne({email:req.body.email});
    res.send(curr_user)
})



module.exports = router;