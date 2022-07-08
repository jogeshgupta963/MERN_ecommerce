import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderList) => {
    try {
      const { data } = await axios.post('/order', orderList)
      console.log(data)
      return data
    } catch (error) {
      return error.message
    }
  },
)
export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    status: null,
    error: '',
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.status = 'loading'
    },
    [createOrder.fulfilled]: (state, action) => {
      state.order = action.payload
      state.status = 'success'
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})

// export const {product_list} = productListSlice.actions;
export default orderSlice.reducer
