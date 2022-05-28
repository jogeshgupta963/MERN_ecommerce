
import express from'express'

import {loginUser,updateUserProfile,registerUser,getUserProfile,logoutUser,getAllUsers } from '../controllers/user.js'

import {isLoggedIn} from '../middlewares/auth.js'

const router = express.Router();

router
.route('/login')
.post(loginUser)

router
.route('/logout')
.get(isLoggedIn,logoutUser)

router
.route('/register')
.post(registerUser)

router
.route('/profile')
.get(isLoggedIn, getUserProfile)
.put(isLoggedIn, updateUserProfile)

router
.route('/allProfiles')
.get(isLoggedIn, getAllUsers)




export {router}