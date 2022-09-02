import express from 'express';
import bcrypt, { hash } from 'bcrypt';

import {UserModel} from '../Models/User';
import userValidation from '../Validation/ValidateDetails';

const Router = express.Router();


Router.post('/signup', userValidation, async(req,res)=>{
    try{
        const hashedPasssword = bcrypt.hash(req.body.password,10);
        req.body.password=hashedPasssword;
        const user = UserModel.create(req.body);
        return res.status(200).json({message:"User Successfully Created",user});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
})