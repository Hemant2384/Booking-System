const express = require('express');
const router = express.Router();
const Issue = require('../model/issue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');
const { route } = require('./users');

//get all issues for all emails
route.get('/issue', authUser, authRole('basic'), async (req, res) => {
    try {
        const issues = await Wishlist.find();
        res.send(issues);
    }
    catch (err) {
        console.log(err)
    }
});

//get all issues for an email
route.post('/issue', authUser, authRole('basic'), async (req, res) => {
    try {
        const issues = await Issue.find({
            email: req.body.email//need to be edited
        });
        res.send(issues);
    }
    catch (err) {
        console.log(err)
    }
});

//issue a book
route.post('/issue/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await Wishlist.findOneAndUpdate({
            email: req.body.email
        },
            {
                $addToSet: {
                    book_id: req.params.id,
                    doi: (new Date()).toLocaleString().slice(0,9),
                    period: req.body.period,
                    amount: req.body.amount,
                }
            }
        )
        res.send({message:"Success"});
    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;