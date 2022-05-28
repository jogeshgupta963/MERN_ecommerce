import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 

const cartItemsFromLS = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))[0] : []

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
            // state.status = 'success'
        },
        removeFromCart:(state,{payload})=>{
            state.cart = state.cart.filter(item=>item._id !== payload._id)
            localStorage.setItem('cart',JSON.stringify([state.cart]))
        },
        updateCart:(state,{payload})=>{
           



             state.cart.forEach(item=>{
                // console.log(item._id=== payload._id);
                if(item._id === payload._id){
                    item.qty = payload.qty
                }
            })

            localStorage.setItem('cart',JSON.stringify([state.cart]))
        },
        clearCart:(state)=>{
            state.cart = []
            localStorage.setItem('cart',JSON.stringify([state.cart]))
        },
    }
})

export const {addToCart,removeFromCart,updateCart,clearCart} = cartSlice.actions
export default cartSlice.reducer;