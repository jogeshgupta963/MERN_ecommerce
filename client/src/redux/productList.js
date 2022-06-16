import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ keyword, pageNumber }) => {
    try {
      keyword = keyword ? keyword : ''
      pageNumber = pageNumber ? pageNumber : 1
      const { data } = await axios.get(
        `/products?keyword=${keyword}&pageNumber=${pageNumber}`,
      )
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
    page: 1,
    pages: 1,
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
      state.products = action.payload.product
      state.page = action.payload.page
      state.pages = action.payload.pages

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
