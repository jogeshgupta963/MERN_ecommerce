import express from 'express'

import {
  loginUser,
  updateUserProfile,
  registerUser,
  getUserProfile,
  logoutUser,
  getAllUsers,
  forgotPassword,
  resetPasswordLink,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} from '../controllers/user.js'

import { isLoggedIn, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.route('/login').post(loginUser)

router.route('/logout').get(isLoggedIn, logoutUser)

router.route('/register').post(registerUser)

router
  .route('/profile')
  .get(isLoggedIn, getUserProfile)
  .put(isLoggedIn, updateUserProfile)

router.route('/allProfiles').get(isLoggedIn, isAdmin, getAllUsers)

router.route('/forgot-password').post(forgotPassword)

router.route('/resetPassword/:id').post(resetPasswordLink)
router
  .route('/:id')
  .delete(isLoggedIn, isAdmin, deleteUser)
  .get(isLoggedIn, isAdmin, getUserById)
  .put(isLoggedIn, isAdmin, updateUserByAdmin)
export { router }
