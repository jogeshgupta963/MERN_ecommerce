import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid';
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

        //nodemailer    
        // let gmailPass = process.env.gmailPass

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'jogeshgupta963@gmail.com',
        //         pass: gmailPass
        //     }
        // });
        // let info = transporter.sendMail({
        //     from: '"Welcome👻" <jogeshgupta963@gmail.com>',
        //     to: newUser.email,
        //     subject: `Welcome ${newUser.name} .`,
        //     html: `<b>Welcome to ${jaduu} </b>`,
        // });

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
        console.log(req.body);
        if(!user){
            throw new Error('User not found');
        }
        if(req.body.password){
            const match = await bcrypt.compare(req.body.oldPassword, user.password);
            if(!match){
                throw new Error('Invalid password');
            }
            
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        res.json(err.message);
    }
}

//@route /user/forgot-password
//@desc POST mail reset password link
//@access Public
async function forgotPassword(req,res){
    try {
        const {email} = req.body
        let gmailPass = process.env.gmailPass
        
        const user = await User.findOne({email});

        if(!user) throw new Error('email does not exist')

        let resetPasswordLink = `${req.protocol}://localhost:3000/user/resetPassword/${user._id}-${uuidv4()}` 
        // let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetPassword/${user._id}-${uuidv4()}` 

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jogeshgupta963@gmail.com',
                pass: gmailPass
            }
        });
        let info = transporter.sendMail({
            from: '"Reset Paswword👻" <jogeshgupta963@gmail.com>',
            to: email,
            subject: `Password reset for.`,
            html: `<b>Click here to reset ur password ${resetPasswordLink} </b>`,
        });
        res.json("reset link sent")
    } catch (err) {
        res.json(err.message);
    }
}

//@route /user/resetPassword/:id
//@desc POST reset password
//@access Public

async function resetPasswordLink(req,res){
    try {
        const id = req.params.id.split('-')[0];
        const {password }= req.body
        const user = await User.findById(id);

        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.json(user);
    } catch (err) {
        res.json(err.message)
    }
}

export {loginUser,updateUserProfile,registerUser,getUserProfile,logoutUser,getAllUsers,forgotPassword,resetPasswordLink};