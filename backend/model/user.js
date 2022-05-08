const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{type : String},
    email: { type: String, unique: true },
    gender : { type: String},
    password: { type: String },
    role:{ type : String},
    token: { type: String }
});

module.exports = mongoose.model("user", userSchema);