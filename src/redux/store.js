import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./slice/userDetailSlice";
import authSlice from "./slice/authSlice";

const store = configureStore({
    reducer:{
        userDetail:userDetailSlice,
        auth:authSlice
    }
})

export default store;