import { createSlice } from "@reduxjs/toolkit";
export enum Role{
    user = "user",
    admin = "admin",
    master = "master",
}
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userCurrent: null,
    role: null,
    accessToken:null,
    refreshToken:null,
  },
  reducers:{
    login: (state, action) => {
        state.userCurrent = action.payload.userCurrent;
        state.role = action.payload.role;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
        state.userCurrent = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.role = null;
    }
  }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer