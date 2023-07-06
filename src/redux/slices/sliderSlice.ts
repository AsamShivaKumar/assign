import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
    name: "slider",
    initialState: [0],
    reducers: {
        nextSlide: (state: any, _) => {
            if(state[0] != 3) state[0] = (state[0] + 1)%4;
        },
        prevSlide: (state: any, _) => {
            if(state[0] != 0) state[0] = (state[0] - 1)%4;
        },
    }
});

export const { nextSlide, prevSlide } = sliderSlice.actions;

export default sliderSlice.reducer;