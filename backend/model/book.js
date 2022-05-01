const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bookSchema=new Schema({
    bid:{type:Number,unique:true},
    bname: { type: String },
    author: { type: String },
    url: { type: String },
    desc: { type: String },
    rent: { type: Number },
    isIssued: {type:Boolean,default:false}

});

module.exports = mongoose.model("book", bookSchema);