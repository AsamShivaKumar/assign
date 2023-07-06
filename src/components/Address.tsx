import {useSelector} from "react-redux";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {updateData, updateStatus} from "../redux/slices/formSlice";

import Footer from "./Footer";

export default function Address(){

    const formState = useSelector((state: any) => state.form);
    const addressData = formState['address'];

    const [add1,setAdd1] = useState(addressData.add1);
    const [add2,setAdd2] = useState(addressData.add2);
    const [city,setCity] = useState(addressData.city);
    const [state,setState] = useState(addressData.state);
    const [pincode,setPincode] = useState(addressData.pincode);
    const [country,setCountry] = useState(addressData.country);

    const dispatch = useDispatch();

    function saveData(){

        if(add1 === "" || add2 === "" || city === "" || state === "" || pincode === "" || country === "") return false;

        dispatch(updateData({
            ind: 'address',
            data: {
                add1,
                add2,
                city,
                state,
                pincode,
                country
            }
        }));

        dispatch(updateStatus({ind: 1}))

        return true;
    }



    return (
        <div className="w-[70vw] h-[400px] flex flex-col shadow-md bg-white rounded-lg sm:w-[400px] justify-center items-center relative p-[20px]">
            <h1 className="absolute top-[20px] left-[20px] text-[1.5rem]">Address</h1>
            <input type="text" name="addLine1" value={add1} onChange = {(evt) => setAdd1(evt.target.value)} className="w-[60vw] sm:w-[312px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Address Line 1"/>
            <input type="text" name="addLine2" value={add2} onChange = {(evt) => setAdd2(evt.target.value)}className="w-[60vw] sm:w-[312px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Address Line 2"/>
            <div className="flex flex-row justify-between w-[60vw] sm:w-[312px]">
                <input type="text" name="city" value={city} onChange = {(evt) => setCity(evt.target.value)} className="w-[calc(30vw - 10px)] sm:w-[150px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="City"/>
                <input type="text" name="state" value={state} onChange = {(evt) => setState(evt.target.value)} className="w-[calc(30vw - 10px)] sm:w-[150px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="State"/>
            </div>
            <div className="flex flex-row justify-between w-[60vw] sm:w-[312px]">
                <input type="text" name="pincode" value={pincode} onChange = {(evt) => setPincode(evt.target.value)} className="w-[calc(30vw - 10px)] sm:w-[150px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Pincode"/>
                <input type="text" name="country" value={country} onChange = {(evt) => setCountry(evt.target.value)} className="w-[calc(30vw - 10px)] sm:w-[150px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Country"/>
            </div>
            <Footer saveData={saveData}/>
        </div>
    )
}