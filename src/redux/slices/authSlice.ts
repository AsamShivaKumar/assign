import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        addAuth: (state: any, action) => {
            state['token'] = action.payload.token;
            state['mail'] = action.payload.mail;
        }
    }
});

export const { addAuth } = authSlice.actions;

export default authSlice.reducer;