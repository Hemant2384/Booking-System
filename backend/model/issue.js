const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email: { type: String, unique: true },
    issue_details:[{
        book_id: {type: String,unique:true},
        doi: {type: Date,unique:true},
        period: {type: Number ,unique:true},
        amount: {type: Number,unique:true},
        }
    ]
});

module.exports = mongoose.model("issue", userSchema);