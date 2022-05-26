
import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productList.js'
export const store = configureStore({
    reducer: { 
      products:productListReducer,
      
  }
  })