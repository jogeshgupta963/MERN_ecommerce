import express from 'express'
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  editProduct,
  createReview,
} from '../controllers/products.js'
import { isLoggedIn, isAdmin } from '../middlewares/auth.js'
import { upload } from '../middlewares/uploads.js'

const router = express.Router()

router
  .route('/')
  .get(getAllProducts)
  // .post(upload.single('image'), isLoggedIn, isAdmin, createProduct)
  .post(isLoggedIn, isAdmin, createProduct)

  .put(upload.single('image'), (req, res) => {
    try {
      res.send(`/${req.file.path}`)
    } catch (error) {
      res.json({ message: error.message })
    }
  })

router
  .route('/:id')
  .get(getSingleProduct)
  .delete(isLoggedIn, isAdmin, deleteProduct)
  .put(isLoggedIn, isAdmin, upload.single('image'), editProduct)

router.route('/reviews/:id').post(isLoggedIn, createReview)
export { router }
