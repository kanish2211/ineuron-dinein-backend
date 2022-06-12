const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router=require('./routes')
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
app.use("/", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,accept,access_token,X-Requested-With,authtoken,region,data-key,key-id"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  // res.header('Access-Control-Expose-Headers', 'authtoken');
  next();
});

const uri = process.env.MONGOOSE_CONNECTION_STRING;

mongoose.connect(uri, {
  useNewUrlParser: true,
  //   useCreateIndex:true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", (err) => {
  console.log("connection established");
});

app.use('/',router);

// app.use((err,req,res,next) => {
//   if(err.name==='ValidationError') {
//     const error=typeof err.message === 'string' ? {message:err.message} : err.message;

//     return res.status(400).json({
//       error: "ValidationError",
//       ...error
//     });
//   }
// });

app.use("/", (req, res) => {
  res.json("data");
});

app.listen(3000);
