import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const getOrderDetails = createAsyncThunk(
  'orderDetails/getOrderDetails',
  async (id) => {
    try {
      const { data } = await axios.get(`/orders/${id}`)

      return data
    } catch (error) {
      return error.message
    }
  },
)
export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    orderDetails: {},
    status: null,
    error: '',
  },
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.status = 'loading'
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.orderDetails = action.payload
      state.status = 'success'
    },
    [getOrderDetails.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const {product_list} = productListSlice.actions;
export default orderDetailsSlice.reducer
