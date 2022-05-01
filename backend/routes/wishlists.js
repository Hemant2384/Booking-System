const express = require('express');
const router = express.Router();
const Wishlist = require('../model/wishlist');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authUser, authRole } = require('../basicAuth');
const { route } = require('./users');

//wishlist array for an email
router.post('/wishlist', async (req, res) => {// authUser, authRole('basic'),
    try {
        const wishlist_arr = await Wishlist.find({
            email: req.body.email//need to be edited
        });
        res.send(wishlist_arr);
    }
    catch (err) {
        console.log(err)
    }
});

//add book to wishlist
router.post('/wishlist/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await Wishlist.findOneAndUpdate({
            email: req.body.email//need to be edited
        },
            {
                $addToSet: {
                    wlist: req.params.id
                }
            }
        )
    }
    catch (err) {
        console.log(err)
    }
});

//remove from wishlist
router.delete('/wishlist/remove/:id', authUser, authRole('basic'), async (req, res) => {
    try {
        await collection.update(
            { email: req.body.email },
            { $pull: { wlist: { book_id: req.params.id } } }
        );

    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;