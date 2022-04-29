const express = require('express');
const router = express.Router();
const Wishlist = require('../model/wishlist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');
const { route } = require('./users');


route.post('/wishlist', authUser, authRole('basic'), async (req, res) => {
    try {
        const wishlist_arr = await Wishlist.find({
            email: req.body.email//need to be edited
        }).wlist;
        res.send(wishlist_arr);
    }
    catch (err) {
        console.log(err)
    }
});

route.post('/wishlist/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await Wishlist.findOneAndUpdate({
            email: req.body.email//need to be edited
        },
            {
                $addToSet: {
                    wlist: id
                }
            }
        )
    }
    catch (err) {
        console.log(err)
    }
});

route.post('/wishlist/remove/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await collection.update(
            { email: req.body.email },
            { $pull: { wlist: { book_id: id } } }
        );

    }
    catch (err) {
        console.log(err)
    }
});