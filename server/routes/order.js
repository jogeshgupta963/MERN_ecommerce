import express from 'express'
import { isLoggedIn } from '../middlewares/auth.js'

import {
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
  payment,
} from '../controllers/order.js'
const router = express.Router()

router.route('/').post(isLoggedIn, createNewOrder)

router.route('/:id').get(isLoggedIn, getOrderById)

router
  .route('/:id/pay')
  .put(isLoggedIn, updateOrderToPaid)
  .post(isLoggedIn, payment)

// router.route('/:id/pay').put(isLoggedIn, updateOrderToPaid)

export { router }
