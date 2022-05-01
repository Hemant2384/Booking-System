const express = require('express');
const router = express.Router();
const Book = require('../model/book');
const { authUser, authRole } = require('../basicAuth');
const { route } = require('./users');
const user = require('../model/user');

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.send(books);
    }
    catch (err) {
        console.log(err)
    }
});

router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.find({bid:Number(req.params.id)});
        res.send(book);
    }
    catch (err) {
        console.log(err)
    }
});


router.post('/book/add',  async (req, res) => { //authUser, authRole('admin'),
    try {
        const { bid, bname, author, url, desc, rent ,isIssued} = req.body;

        const book = await Book.create({
            bid:bid,
            bname:bname,
            author:author,
            url:url,
            desc:desc,
            rent:rent,
            isIssued:isIssued
        });
        book.save();
        res.send(book);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;