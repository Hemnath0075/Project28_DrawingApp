import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
require("dotenv").config();

import AuthRoute from './API/Auth'

const app = express();  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err.message));

app.use('/',AuthRoute);

const port = process.env.PORT || 7000
app.listen(port,()=>{
    console.log("server is running Successfully!!!")
})

