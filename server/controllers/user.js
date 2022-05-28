import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import 'dotenv/config'


//@route /user/login
//@desc POST login user
//@access Public
async function loginUser(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json('User not found');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json('Invalid password');
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_COOKIE_EXPIRES_IN});

        res.cookie('JWT', token, 
        {
            expiresIn:process.env.JWT_COOKIE_EXPIRES_IN,
        });

        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}

//@route /user/register
//@desc POST register user
//@access Public
async function registerUser(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            throw new Error('User already exists');
        }

        req.body.password = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create(req.body);
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_COOKIE_EXPIRES_IN});
        res.cookie('JWT', token, 
        {
            expiresIn:process.env.JWT_COOKIE_EXPIRES_IN,
        });
        return res.status(200).json(newUser);
    }
    catch(err){
         res.status(404).json(err.message);
    }
}
//@route /user/profile
//@desc GET user profile
//@access Private
async function getUserProfile(req,res){
    try{
        const user = await User.findById(req.user._id).select('-password');
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}
//@route /user/logout
//@desc GET logout user
//@access Private
async function logoutUser(req,res){
    try{
        res.clearCookie('JWT');
        return res.status(200).json('Logged out');
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}
//@route /user/allProfiles
//@desc GET all users
//@access Private/Admin

async function getAllUsers(req,res){
    try{
        const users = await User.find({});
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}

//@route /user/profile
//@desc PUT update user profile
//@access Private
async function updateUserProfile(req,res){
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            throw new Error('User not found');
        }
        let reqKeys = Object.keys(req.body);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.json(err.message);
    }
}


export {loginUser,updateUserProfile,registerUser,getUserProfile,logoutUser,getAllUsers};