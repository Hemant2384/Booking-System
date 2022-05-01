const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const wishlistSchema=new Schema({
    email: { type: String, unique: true },
    wlist:[{
        book_id: {type: String,unique:true}
        }
    ]
});

module.exports = mongoose.model("wishlist", wishlistSchema);