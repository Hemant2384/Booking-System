const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/users');
const bookRoutes=require('./routes/books');
const issueRoutes=require('./routes/issues');
const wishlistRoutes=require('./routes/wishlists');
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', wishlistRoutes);
app.use('/', issueRoutes);
const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
})
mongoose.connect(process.env.MONGO_URL, {family:4,useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('DB connected');
})