import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config'

const isLoggedIn = async (req,res,next)=>{
    try{
        if(req.cookies.JWT){
            const decoded = jwt.verify(req.cookies.JWT,process.env.JWT_SECRET);
            const user = await User.findOne({_id: decoded._id});
            if(user){
                req.user = user;
                next();
            }
            else{
                return res.status(401).json('Unauthorized');
            }
        }
        else{
            return res.status(401).json('Unauthorized');
        }
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}

const isAdmin = async (req,res,next)=>{
    try{
        if(req.user.role === 'Admin'){
            next();
        }
        else{
            return res.status(401).json('Unauthorized');
        }
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}

export {isLoggedIn,isAdmin};