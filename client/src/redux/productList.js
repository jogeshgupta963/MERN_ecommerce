import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (keyword = '') => {
    try {
      const { data } = await axios.get(`/products?keyword=${keyword}`)
      return data
    } catch (error) {
      return error.message
    }
  },
)
export const productListSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: null,
    error: '',
  },
  reducers: {
    deleteProduct: (state, { payload }) => {
      state.products = state.products.filter((prod) => prod._id !== payload)
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload
      state.status = 'success'
    },
    [fetchProducts.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

export const { deleteProduct } = productListSlice.actions
export default productListSlice.reducer
