const express = require('express');
const router = express.Router();
const Issue = require('../model/wishlist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');
const { route } = require('./users');


route.post('/issue', authUser, authRole('basic'), async (req, res) => {
    try {
        const issues = await Wishlist.find({
            email: req.body.email//need to be edited
        }).wlist;
        res.send(issues);
    }
    catch (err) {
        console.log(err)
    }
});

route.post('/issue/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await Wishlist.findOneAndUpdate({
            email: req.body.email//need to be edited
        },
            {
                $addToSet: {
                    book_id: id,
                    doi: (new Date()).toLocaleDateString(),
                    period: req.body.period,
                    amount: req.body.amount,
                }
            }
        )
    }
    catch (err) {
        console.log(err)
    }
});