import { createSlice, current } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: "form",
    initialState: {
        data: {
            username: "",
            email: "",
            mobile: "",
            code: "+91"
        },
        address: {
            add1: "",
            add2: "",
            city: "",
            state: "",
            pincode: "",
            country: ""
        },
        singleFile: {
            data: "",
            name: ""
        },
        multipleFiles: {
            data: "",
            coords: {lat: -1, lng: -1}
        },
        status: [0,0,0,0]
    },
    reducers: {
        updateData: (state: any, action) => {
            const ind = action.payload.ind;
            const data = action.payload.data;
            state[ind] = data;
        },
        updateStatus: (state: any, action) => {
            state['status'][action.payload.ind] = 1;
        }
    }
});

export const { updateData, updateStatus} = formSlice.actions;

export default formSlice.reducer;