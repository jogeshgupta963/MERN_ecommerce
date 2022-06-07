import express from 'express'
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  editProduct,
} from '../controllers/products.js'
import { isLoggedIn, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.route('/').get(getAllProducts).post(isLoggedIn, isAdmin, createProduct)

router
  .route('/:id')
  .get(getSingleProduct)
  .delete(isLoggedIn, isAdmin, deleteProduct)
  .put(isLoggedIn, isAdmin, editProduct)

export { router }
