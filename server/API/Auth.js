import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
require("dotenv").config();

import { UserModel } from "../Models/User";

import jwt from "jsonwebtoken";
import userValidation from "../Validation/ValidateDetails";
import passwordValidation from "../Validation/ValidateDetails";

const Router = express.Router();

Router.get('/verifytoken',async(req,res)=>{
  try{
    // console.log(req.headers);
    const token=req.headers.authorization
    const decode=jwt.verify(token,process.env.secretKey);
    const user=await UserModel.findById(decode.id);
    return res.status(200).json({data:decode,user});
  }
  catch(err){
    return res.status(500).json({error:err.message})
  }
})

Router.post("/signup", userValidation, async (req, res) => {
  try {
    const alreadyUser = await UserModel.findOne({ email: req.body.email });
    if (alreadyUser) throw new Error("User already exists with this Email");
    const hashedPasssword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPasssword;
    const user = await UserModel.create(req.body);
    return res.status(200).json({ message: "User Successfully Created", user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

Router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const alreadyUser = await UserModel.findOne({ email: req.body.email });
    if (!alreadyUser)
      throw new Error("You have not registered with this Email");
    const verifyPassword = await bcrypt.compare(req.body.password, alreadyUser.password);
    if (!verifyPassword) throw new Error("Password You Entered is Wrong!!");
    const token = jwt.sign({ id: alreadyUser._id }, process.env.secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token: token,
      user: alreadyUser,
      message: "loggedIn Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Router.post("/forgotpassword", async (req, res) => {
  try {
    const alreadyUser = await UserModel.findOne({ email: req.body.email });
    if (!alreadyUser) throw new Error("Email is invalid");
    const randomBytes = crypto.randomBytes(32);
    const resetToken = randomBytes.toString("hex");
    const setResetToken = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { resetToken: resetToken, tokenExpiry: Date.now() + 3600000 },
      { new: true }
    );
    return res
      .status(200)
      .json({
        user: setResetToken,
        message: "Reset link has been sent to your Email",
      });
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


const validateResetToken = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ resetToken: req.params.token , tokenExpiry:{$gt:Date.now()} });
    if (!user) throw new Error("Invalid Reset Token");
    next();
  }
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

Router.post("/resetpassword/:token", validateResetToken, passwordValidation, async (req, res) => {
  try {
    const resetPassword =await bcrypt.hash(req.body.password, 10);
    const updatePassword = await UserModel.findOneAndUpdate({resetToken:req.params.token},{password:resetPassword},{new:true});
    return res
      .status(200)
      .json({ user: updatePassword, message: "password Changed Successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

export default Router;
