import { Request, Response } from "express";
import User, {IUser} from "../models/User"
import jwt from "jsonwebtoken"

export const singUp = async (req : Request, res: Response) => {  
  //saving a new user 
  const newuser : IUser = new User({
   username: req.body.username,
   email: req.body.email,
   password: req.body.password
 });
    newuser.password = await newuser.encrypPassword (newuser.password)
    const savedUser = await newuser.save()
    //creating Token
    const token: string = jwt.sign({_id : savedUser._id}, process.env.TOKEN_SECRET || "")
 
    res.header("auth-token" , token).json(savedUser) 
};

export const singIn = async (req : Request, res: Response) => {
  const newuser = await User.findOne({ email: req.body.email });
  if (!newuser) return res.status(400).json('Email or Password is wrong');
  const correctPassword = await newuser.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json('Invalid Password');

  // Create a Token
  const token: string = jwt.sign({ _id: newuser._id }, process.env.TOKEN_SECRET || '');
  res.header('auth-token', token).json(token);
};

 

export const Profile = async (req : Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No User found');
    }
    res.json(user);
};