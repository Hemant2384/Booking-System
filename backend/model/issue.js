const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const issueSchema=new Schema({
    email: { type: String, unique: true, required : true },
    issue_details_list:[{
        bid: {type: Number,unique:true},
        doi: {type: String},
        period: {type: Number },
        amount: {type: Number},
        }
    ]
});

module.exports = mongoose.model("issue", issueSchema);