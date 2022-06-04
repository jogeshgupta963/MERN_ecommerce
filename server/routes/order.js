import express from 'express'
import { isLoggedIn } from '../middlewares/auth.js'

import { createNewOrder } from '../controllers/order.js'
const router = express.Router()

router.route('/').post(isLoggedIn, createNewOrder)

export { router }
