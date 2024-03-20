import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create user action
export const createUser = createAsyncThunk('createUser', async(data,{rejectWithValue}) => {
      try {
        const response = await axios.post("https://65f970f9df1514524611a0c0.mockapi.io/user",data);
        return response.data;
      } catch (error) {
         return rejectWithValue(error);
      }
    })

// list user action
export const listUser = createAsyncThunk("listUser", async(_,{rejectWithValue})=>{
   try {
       const response = await axios("https://65f970f9df1514524611a0c0.mockapi.io/user");
       return response.data;
   } catch (error) {
       return rejectWithValue(error)
   }
})

// delete user action
export const deleteUser = createAsyncThunk("deleteUser", async(id,{rejectWithValue})=>{
  try {
      const response = await axios.delete(`https://65f970f9df1514524611a0c0.mockapi.io/user/${id}`);
      return response.data;
  } catch (error) {
      return rejectWithValue(error)
  }
})

//update user action
export const updateUser = createAsyncThunk("updateUser", async(data,{rejectWithValue})=>{
  try {
      const response = await axios.put(`https://65f970f9df1514524611a0c0.mockapi.io/user/${data.id}`,data);
      return response.data;
  } catch (error) {
      return rejectWithValue(error)
  }
})
const userDetailSlice = createSlice({
    name:"userDetail",
    initialState:{
        users:[],
        isLoading:false,
        isError:false
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
          state.isLoading=true;
        }),
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users.push(action.payload)
          }),
          builder.addCase(createUser.rejected, (state, action) => {
            state.isError = true;
          }),

          builder.addCase(listUser.pending, (state, action) => {
            state.isLoading = true;
          }),
          builder.addCase(listUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
          }),
          builder.addCase(listUser.rejected, (state, action) => {
            state.isError = action.payload;
          })

          builder.addCase(updateUser.pending, (state, action) => {
            state.isLoading = true;
          }),
          builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.map((res)=>{
              return res.id === action.payload.id?action.payload:res
            })
          }),
          builder.addCase(updateUser.rejected, (state, action) => {
            state.isError = action.payload;
          })

          builder.addCase(deleteUser.pending, (state, action) => {
            state.isLoading = true;
          }),
          builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = state.users.filter(res=>res.id!==action.payload.id);
          }),
          builder.addCase(deleteUser.rejected, (state, action) => {
            state.isError = action.payload;
          })
      },
})


export default userDetailSlice.reducer;