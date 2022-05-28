
import express from'express'
import products from'../data/product.js'
import {getAllProducts,getSingleProduct} from '../controllers/products.js'

const router = express.Router();

router
.route('/')
.get(getAllProducts)

router
.route('/:id')
.get(getSingleProduct)


export {router}