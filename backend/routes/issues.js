const express = require('express');
const router = express.Router();
const Issue = require('../model/issue');
const { authUser, authRole } = require('../basicAuth');
//get all issues for all emails

//authUser, authRole('basic'),
router.get('/issues', async (req, res) => {
    try {
        const issues = await Issue.find();
        res.send(issues);
    }
    catch (err) {
        console.log(err)
    }
})

//GET all issues for a particular email
//authUser, authRole('basic'),
router.post('/issue', async (req, res) => {
    try {
        const issue_obj = await Issue.findOne({
            email: req.body.email//need to be edited
        });
        console.log(issue_obj.issue_details_list);
        res.send(issue_obj.issue_details_list);
    }
    catch (err) {
        console.log(err)
    }
});

//ISSUE a book
//authUser, authRole('basic'),
router.post('/issue/:id',authUser, authRole('basic'), async (req, res) => {

    try {
        var today = new Date();
        var date = (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()).toString();
        const detail = {
            bid: Number(req.params.id),
            doi: date,
            period: req.body.period,
            amount: req.body.amount,
            bname: req.body.bname,
            author: req.body.author,
            url: req.body.url
        }
        const query = { email: req.body.email };
        const update = { $push: { issue_details_list: detail } };
        const options = { upsert: true };
        await Issue.updateOne(query, update, options);
        // res.json({ "message": "Issued" })
    }
    catch (err) {
        console.log(err)
    }
    try {
        const issue_obj = await Issue.findOne({
            email: req.body.email//need to be edited
        });
        console.log(issue_obj.issue_details_list[issue_obj.issue_details_list.length-1]);
        res.send(issue_obj.issue_details_list[issue_obj.issue_details_list.length-1]);
    }
    catch (err) {
        console.log(err)
    }
});

//RETURN the book
router.post('/issue/remove/:id',authUser, authRole('basic'), async (req, res) => {
    try {
        
        await Issue.updateOne(
            { email: req.body.email },
            { $pull: { issue_details_list: { bid: Number(req.params.id) } } },
            {
                upsert:false,
                multi:true
            }
        );
        res.json({ "message": "Book returned." })

    }
    catch (err) {
        console.log(err)
    }
});

module.exports = router;