
import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productList.js'
import singleProductReducer from './singleProduct.js'
import cartReducer from './cart'
export const store = configureStore({
    reducer: { 
      products:productListReducer,
      product:singleProductReducer,
      cart:cartReducer
  }
  })