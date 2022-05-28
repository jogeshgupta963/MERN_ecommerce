import {createSlice} from '@reduxjs/toolkit' 


const userFromStorage = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):{}

export const userSlice = createSlice({

    name:'user',
    initialState:{
        user:userFromStorage,
    },
    reducers:{
        getUser:(state,{payload})=>{
            state.user = payload;
            localStorage.setItem('user',JSON.stringify(state.user))
        },
        removeUser:(state)=>{
            state.user = {}
        }
    }
})

export const {getUser,removeUser} = userSlice.actions
export default userSlice.reducer;