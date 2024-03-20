import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"userAuth",
    initialState:{
        user:{
            username:"Admin",
        }
    },
   
})

export default authSlice.reducer;