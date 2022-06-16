import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const fetchTopProducts = createAsyncThunk(
  'topProducts/fetchTopProducts',
  async () => {
    try {
      const { data } = await axios.post(`/products/topRatedProducts`)
      console.log(data)
      return data
    } catch (error) {
      return error.message
    }
  },
)
export const topProductsSlice = createSlice({
  name: 'topProducts',
  initialState: {
    topProducts: [],
    status: null,
    error: '',
  },
  extraReducers: {
    [fetchTopProducts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchTopProducts.fulfilled]: (state, action) => {
      state.topProducts = action.payload
      state.status = 'success'
    },
    [fetchTopProducts.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const { deleteProduct } = productListSlice.actions
export default topProductsSlice.reducer
