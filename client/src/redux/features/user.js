import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
const token =localStorage.getItem("token");
const config={
    headers:{
        Authorization:token, 
    }
}
export const verifyToken = createAsyncThunk(
    "user/verifyToken",
    async()=>{
        const res=await axios.get("http://localhost:7000/verifytoken",config)
        return res.data;
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (data)=>{
        const res = await axios.post("http://localhost:7000/login",data);
        return res.data;
    }
)

export const signupUser = createAsyncThunk(
    "user/signupUser",
    async (data)=>{
        const res = await axios.post("http://localhost:7000/signup",data);
        return res.data;
    }
)

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (data)=>{
        const res = await axios.get("http://localhost:7000/forgotpassword",data);
        return res.data;
    }
)

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (data)=>{
        const res = await axios.post("http://localhost:7000/resetpassword",data);
        return res.data;
    }
)
export const isUserLoggedIn = createAsyncThunk(
    "user/isUserLoggedIn",
    async (data)=>{
        const res = await axios.post("http://localhost:7000/auth/",data);
        return res.data;
    }
)

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{},
        status:false,
        newuser:null,
    },
    reducers:{
        logout(state,action){
            state.status=false;
            state.user={}
        }
    },
    extraReducers:{
        [loginUser.fulfilled]:(state,action)=>{
            state.status=true;
            state.user=action.payload;
            localStorage.setItem("user",action.payload._id);
            localStorage.setItem("token",action.payload.token);
        }, 
        [loginUser.rejected]:(state,action)=>{
            state.status=false
        },
        [verifyToken.fulfilled]:(state,action)=>{
            state.status=true;
            state.user=action.payload.user;
        },
        [verifyToken.rejected]:(state,action)=>{
            state.status=false
        },
        [signupUser.fulfilled]:(state,action)=>{
            state.newuser="false";
        }, 
        [isUserLoggedIn.fulfilled]:(state,action)=>{
            state.user=action.payload;
            state.newuser="true";
            state.status=true;
        }, 
    }
    
})

export const GetUser=(state) => state.user;
export const {logout}=userSlice.actions;
// console.log(GetUser);
export const UserStatus=(state) => state.status;
// console.log(UserStatus);

export default userSlice.reducer;