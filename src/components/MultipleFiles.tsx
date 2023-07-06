import {useState,useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import { updateData, updateStatus } from "../redux/slices/formSlice";

import Footer from "./Footer";

export default function MultipleFiles(){

    const dispatch = useDispatch();
    const authState = useSelector((state: any) => state.auth);
    const formState = useSelector((state: any) => state.form);
    const multipleFilesData = formState['multipleFiles'];

    const [coords, setCoords] = useState(multipleFilesData.coords);
    const [locAccess, setLocAccess] = useState(true);
    const [fileData,setFileData] = useState(multipleFilesData.data);
    const [file, setFile] = useState(fileData === "" ? "" : "Files uploaded!");
    const [status,setStatus] = useState(0);
    const [res,setRes] = useState("");

    function upload(evt: any){
        let binString = "";

        setFile("Uploading files....");
        const len = evt.target.files.length;
        for(let i = 0; i < Math.min(5,len); i++){
            const reader = new FileReader();
            const file = evt.target.files[i];
            reader.onloadend = function() {
                if(reader){
                    var data = {};
                    if(reader.result) data = (reader.result).split(',')[1];
                    var binaryBlob = atob(data);
                    binString += binaryBlob;
                    if(i == (Math.min(len,5) - 1)){
                        setFile("Files uploaded!");
                        console.log("string", binString);
                        setFileData(binString);
                    }
                }
            }
        
            reader.readAsDataURL(file);
        }

    }

    function saveData(){

        if(fileData === "") return false;

        dispatch(updateData({
            ind: 'multipleFiles',
            data: {
                data: fileData,
                coords: coords
            }
        }));

        dispatch(updateStatus({ind: 3}));

        return true;
    }

    useEffect(() => {
        if(navigator.geolocation){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((pos) => {
                    setCoords({lat: pos.coords.latitude, lng: pos.coords.longitude})
                })
            }else setLocAccess(false);
        }
    },[]);

    function submit(){
        setStatus(1);
        const url = "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form";
        console.log("In submit");

        fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "mutlipart/form-data",
                "Authentication": `Bearer ${authState.token}`,
            },
            body: JSON.stringify({
                name: formState.data.name,
                email: formState.data.email,
                phone_number: formState.data.code + formState.data.mobile,
                address_1: formState.address.add1,
                address_2: formState.address.add2,
                city: formState.address.city,
                state: formState.address.state,
                country: formState.address.country,
                pincode: formState.address.pincode,
                geolocation: formState.multipleFiles.coords.lat + "," + formState.multipleFiles.coords.lng,
                single_file: formState.singleFile.data,
                multi_ups1: formState.multipleFiles.data
            })
        })
        .then(res => res.json())
        .then(data => {
            setStatus(2);
            setRes(data.message? data.message: "Sucessfully submitted!")
        });
    }


    return (
        <div className="w-[70vw] h-[400px] flex flex-col shadow-md bg-white rounded-lg sm:w-[400px] justify-center items-center relative p-[20px]">
            {status == 0 && <>
                <h1 className="absolute top-[20px] left-[20px] text-[1.5rem]">File Upload & Location</h1>
                <input type="file" id="file" accept=".pdf, .png" onChange={(evt) => upload(evt)}multiple hidden/>
                <label htmlFor="file">
                    <i className="fi fi-sr-folder-upload text-[6rem] cursor-pointer text-blue-600 opacity-[0.9]"></i>
                </label>
                {file !== "" && <span>{file}</span>}
                <span>Allowed types: png & pdf</span>
                {!locAccess && <span>Please allow location!</span>}
                {locAccess && (coords.lat === -1) && <span>Fetching location...</span>}
                {locAccess && (coords.lat !== -1) && <span>Fetched Location: ({coords.lat},{coords.lng})</span>}
                <Footer saveData={saveData} submit={submit}/>
            </>}
            {status === 1 && <span>Submitting the form</span>}
            {status === 2 && <span>{res}</span>}
        </div>
    )
}