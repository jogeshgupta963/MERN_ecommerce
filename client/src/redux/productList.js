import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 


import axios from 'axios'


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
      async()=>{
        try {
            
            const {data} = await axios.get('/products')
            return data;
        } catch (error) {
            return error.message;
        }
    } 
  )
export const productListSlice = createSlice({

    name:'products',
    initialState:{
        products:[],
        status:null,
        error:""
    },
    extraReducers:{

        [fetchProducts.pending]:state=>{
            state.status='loading'
        },
        [fetchProducts.fulfilled]:(state,action)=>{
            state.products = action.payload
            state.status = 'success'
        },
        [fetchProducts.rejected]:(state,{payload})=>{
            state.error = payload
            state.status = 'error'
        }
    }
})

// export const {product_list} = productListSlice.actions;
export default productListSlice.reducer;