import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './productList.js'
import singleProductReducer from './singleProduct.js'
import cartReducer from './cart'
import userReducer from './user'
import userListReducer from './userList.js'
import orderReducer from './order'
import orderDetailsReducer from './orderDetails'
import topProductsReducer from './topProducts.js'

export const store = configureStore({
  reducer: {
    products: productListReducer,
    product: singleProductReducer,
    cart: cartReducer,
    user: userReducer,
    userList: userListReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    topProducts: topProductsReducer,
  },
})
