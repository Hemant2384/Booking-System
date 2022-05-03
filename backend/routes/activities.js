const express = require('express');
const router = express.Router();
const Activity = require('../model/activity');
const { authUser, authRole } = require('../basicAuth');


//authUser, authRole('basic'),
router.get('/activities', async (req, res) => {
    try {
        const activities = await Activity.find().sort({ date: -1 }).limit(5);
        res.send(activities);
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/activity', async (req, res) => {
    try {
        const activity_obj = {
            email: req.body.email,
            bid: req.body.bid,
            bname: req.body.bname,
            date: new Date()
        }
        const activity = await Activity.create(
            activity_obj);
        activity.save();

        //res.send({ "message": "logged" })

        const activities = await Activity.find().sort({ date: -1 }).limit(5);
        await Activity.remove({});
        //const options = { ordered: true };
        await Activity.insertMany(activities);
        res.send(activities)
    }
    catch (err) {
        console.log(err);
    }

});

router.delete('/activity/delete', async (req, res) => {
    try {
        await Activity.remove({})
        res.send({ "message": "dropped" })
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;