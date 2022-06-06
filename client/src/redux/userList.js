import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const getUserList = createAsyncThunk(
  'userList/getUserList',
  async (id) => {
    try {
      const { data } = await axios.get(`/user/allProfiles`)
      return data
    } catch (error) {
      return error.message
    }
  },
)
export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    userList: [],
    status: null,
    error: '',
  },
  reducers: {
    deleteUser: (state, { payload }) => {
      state.userList = state.userList.filter((user) => user._id !== payload)
    },
  },
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.status = 'loading'
    },
    [getUserList.fulfilled]: (state, action) => {
      state.userList = action.payload
      state.status = 'success'
    },
    [getUserList.rejected]: (state, { payload }) => {
      state.error = payload
      state.status = 'error'
    },
  },
})
export const { deleteUser } = userListSlice.actions
export default userListSlice.reducer
