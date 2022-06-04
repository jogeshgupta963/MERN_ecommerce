import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productList.js'
import singleProductReducer from './singleProduct.js'
import cartReducer from './cart'
import userReducer from './user'
import orderReducer from './order'

export const store = configureStore({
  reducer: {
    products: productListReducer,
    product: singleProductReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
})
