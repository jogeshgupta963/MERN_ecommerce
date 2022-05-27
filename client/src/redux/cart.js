import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 


import axios from 'axios'


// export const addToCart = createAsyncThunk(
//     'cart/addToCart',
//       async({id,qty})=>{
//         try {
            
//             const {data} = await axios.get(`/products/${id}`)
//             return {...data,qty};
//         } catch (error) {
//             return error.message;
//         }
//     } 
//   )
const cartItemsFromLS = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))[0] : []
console.log(cartItemsFromLS[0])
export const cartSlice = createSlice({

    name:'cart',
    initialState:{
        cart:cartItemsFromLS,
        // cart:[],
        status:null,
        error:""
    },
    reducers:{
        addToCart:(state,{payload})=>{

            if(state.cart.find(item=>item._id === payload._id)){
                return;
            }
            state.cart.push(payload)
            localStorage.setItem('cart',JSON.stringify([state.cart]))
            state.status = 'success'
        }
    }
    // extraReducers:{

    //     [addToCart.pending]:state=>{
    //         state.status='loading'
    //     },
    //     [addToCart.fulfilled]:(state,{payload})=>{

    //        let isExist = state.cart.find(item=>item._id===payload._id)

    //        if(isExist){
    //             isExist.qty = payload.qty;
    //             state.cart.map(item=>{
    //                 if(item._id===payload._id){
    //                     item.qty = payload.qty;
    //                 }
    //             })
                
    //        }else{
    //             state.cart.push(payload)
    //        }

    //         localStorage.setItem('cart',JSON.stringify(state.cart))
    //         state.status='succeeded'            
            
    //     },
    //     [addToCart.rejected]:(state,{payload})=>{
    //         state.error = payload
    //         state.status = 'error'
    //     }
    // }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer;