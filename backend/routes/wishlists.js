const express = require('express');
const router = express.Router();
const Wishlist = require('../model/wishlist');
const { authUser, authRole } = require('../basicAuth');

//wishlist array for an email
router.post('/wishlist', async (req, res) => {// authUser, authRole('basic'),
    try {
        const wishlist_obj = await Wishlist.findOne({
            email: req.body.email//need to be edited
        });
        console.log(wishlist_obj.wlist);
        res.send(wishlist_obj.wlist);
    }
    catch (err) {
        console.log(err)
    }
});

//add book to wishlist
router.post('/wishlist/:id', async (req, res) => {//authUser, authRole('basic'),
    try {
        const query = { email: req.body.email};
        const update = { $push: {  wlist:{bid:(req.params.id) }}};
        const options = { upsert: true };
        await Wishlist.updateOne(query, update, options);
        res.json({"message":"Added"})
    }
    catch (err) {
        console.log(err)
    }
});

//remove from wishlist
//authUser, authRole('basic')
router.delete('/wishlist/remove/:id',  async (req, res) => {
    try {
        await Wishlist.updateOne(
            { email: req.body.email },
            { $pull: { wlist: { bid: Number(req.params.id)} } }
        );
        res.json({"message":"Deleted from wishlist"})

    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router; 
