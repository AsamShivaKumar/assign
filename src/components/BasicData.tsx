import {useState} from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";

import { updateData, updateStatus} from "../redux/slices/formSlice";

import CountryList from 'country-list-with-dial-code-and-flag';
import Footer from './Footer';

export default function BasicData(){

    const formState = useSelector((state: any) => state.form);
    const basicData = formState['data'];
    const [username, setUsername] = useState(basicData.username);
    const [email, setEmail] = useState(basicData.email);
    const [mobile, setMobile] = useState(basicData.mobile);
    const [code,setCode] = useState(basicData.code);

    const dispatch = useDispatch();

    const saveData = () => {

        if(username === "" || email === "" || mobile === "") return false;

        // can do validation here if required!

        dispatch(updateData({
            ind: 'data',
            data: {
                username,
                email,
                mobile,
                code
            }
        }));

        dispatch(updateStatus({ind: 0}))

        return true;        
    }


    return (
        <div className="w-[70vw] h-[400px] flex-col shadow-md bg-white rounded-lg sm:w-[400px] justify-center items-center relative p-[20px]" style={{display: "flex"}}>
            <h1 className="absolute top-[20px] left-[20px] text-[1.5rem]">Basic Data</h1>
            <input type="text" name="username" value={username} onChange={(evt) => setUsername(evt.target.value)} className="w-[60vw] sm:w-[312px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Username"/>
            <input type="email" name="email" value={email} onChange={(evt) => setEmail(evt.target.value)} className="w-[60vw] sm:w-[312px] px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]" placeholder="Email"/>
            <div>
                <select name="cntryCode" onChange={(evt) => setCode(evt.target.value)}>
                    {CountryList.getAll().map((cntr) => <option value={cntr.dialCode} selected={cntr.dialCode === code? true:undefined}>{cntr.flag + " " + cntr.dialCode}</option>)}
                </select>
                <input type="text" value={mobile} onChange={(evt) => setMobile(evt.target.value)} placeholder="Enter mobile" className='px-[20px] py-[5px] focus:outline-0 border-b-2 border-blue-700 focus:bg-blue-100 mb-[20px]' />
            </div>
            <Footer saveData={saveData}/>
        </div>
    )
}