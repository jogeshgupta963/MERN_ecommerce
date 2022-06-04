import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const cartItemsFromLS = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))[0]
  : []

const shippingAddress = localStorage.getItem('shiping')
  ? JSON.parse(localStorage.getItem('shipping'))
  : {}

const paymentChoice = localStorage.getItem('payment')
  ? JSON.parse(localStorage.getItem('payment'))
  : ''

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: cartItemsFromLS,
    shipping: shippingAddress,
    payment: paymentChoice,
    status: null,
    error: '',
  },
  reducers: {
    addToCart: (state, { payload }) => {
      if (state.cart.find((item) => item._id === payload._id)) {
        return
      }
      state.cart.push(payload)
      localStorage.setItem('cart', JSON.stringify([state.cart]))
      // state.status = 'success'
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item._id !== payload._id)
      localStorage.setItem('cart', JSON.stringify([state.cart]))
    },
    updateCart: (state, { payload }) => {
      state.cart.forEach((item) => {
        if (item._id === payload._id) {
          item.qty = payload.qty
        }
      })

      localStorage.setItem('cart', JSON.stringify([state.cart]))
    },
    clearCart: (state) => {
      state.cart = []
      localStorage.setItem('cart', JSON.stringify([state.cart]))
    },
    saveShippingAddress: (state, { payload }) => {
      state.shipping = payload
      localStorage.setItem('shipping', JSON.stringify(state.shipping))
    },
    savePaymentMethod: (state, { payload }) => {
      state.payment = payload
      localStorage.setItem('payment', JSON.stringify(state.payment))
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions
export default cartSlice.reducer
