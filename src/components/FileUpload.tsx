import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";

import {updateData,updateStatus} from "../redux/slices/formSlice";

import Footer from "./Footer"

export default function FileUpload(){

    const formState = useSelector((state: any) => state.form);
    const singleFileData = formState['singleFile'];

    const [file, setFile] = useState(singleFileData.name);
    const [fileData,setFileData] = useState(singleFileData.data);

    const dispatch = useDispatch();

    function upload(evt: any){
        const file = evt.target.files[0];
        const reader = new FileReader();

        setFile("Uploading file....")

        reader.onloadend = function() {
            if(reader){
                var data = {};
                if(reader.result) data = (reader.result).split(',')[1];
                var binaryBlob = atob(data);
                setFileData(binaryBlob);
                setFile(file.name);
            }
        }
        
        reader.readAsDataURL(file);

    }

    function saveData(){

        if(fileData === "") return false;

        dispatch(updateData({
            ind: "singleFile",
            data: {
                data: fileData,
                name: file
            }
        }));

        dispatch(updateStatus({ind: 2}))

        return true;
    }

    return (
        <div className="w-[70vw] h-[400px] flex flex-col shadow-md bg-white rounded-lg sm:w-[400px] justify-center items-center relative p-[20px]">
            <h1 className="absolute top-[20px] left-[20px] text-[1.5rem]">File Upload</h1>
            <input type="file" id="file" onChange={evt => upload(evt)} accept=".pdf, .png" hidden/>
            <label htmlFor="file">
                <i className="fi fi-sr-folder-upload text-[6rem] cursor-pointer text-blue-600 opacity-[0.9]"></i>
            </label>
            {file !== "" && <span>Uploaded file: {file}</span>}
            <span>Allowed types: png & pdf</span>
            <Footer saveData={saveData}/>
        </div>
    )
}