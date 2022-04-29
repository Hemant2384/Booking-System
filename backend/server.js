const express=require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/users');
require('dotenv').config();


app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', userRoutes);

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on the port ${PORT}`);
})
mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log('DB connected');
})