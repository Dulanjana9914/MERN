require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser=require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");

const app = express();

//available port number assign
const PORT = process.env.PORT || 8070;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles:true
}))

//Routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/upload'))


//connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//Open the connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Succesfull");
});


//Run in port
app.listen(PORT, () => {
    console.log(`Server is up and running on port number ${PORT}`);
  })
  