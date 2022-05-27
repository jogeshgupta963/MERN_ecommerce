import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 
import axios from 'axios'

export const fetchSingleProduct = createAsyncThunk(
    'product/fetchSingleProduct',
      async(id)=>{
        try {
            
            const {data} = await axios.get(`/products/${id}`)
            return data;
        } catch (error) {
            return error.message;
        }
    } 
  )


export const singleProductSlice = createSlice({

    name:'product',
    initialState:{
        product:{},
        status:null,
        error:""
    },
    extraReducers:{

        [fetchSingleProduct.pending]:state=>{
            state.status='loading'
        },
        [fetchSingleProduct.fulfilled]:(state,action)=>{
            state.product = action.payload
            state.status = 'success'
        },
        [fetchSingleProduct.rejected]:(state,{payload})=>{
            state.error = payload
            state.status = 'error'
        }
    }
})

export default singleProductSlice.reducer;