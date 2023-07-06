import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.ts";
import formReducer from "./slices/formSlice.ts";
import sliderReducer from "./slices/sliderSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        form: formReducer,
        slider: sliderReducer
    }
});

export default store;