const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const wishlistSchema= new Schema({
    email: { type: String, unique: true },
    wlist:[{
        bid: {type: Number,unique:true}
        }
]
});

module.exports = mongoose.model("wishlist", wishlistSchema);