import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";

import BasicData from "../components/BasicData";
import Address from "../components/Address";
import FileUpload from "../components/FileUpload";
import MultipleFiles from "../components/MultipleFiles";

function App() {

  const navigate = useNavigate();
  const authState = useSelector((state: any) => state.auth);
  const sliderState = useSelector((state: any) => state.slider);
  const status = useSelector((state: any) => state.form.status);

  useEffect(() => {
    if(!authState.token) navigate("/login");
    console.log("auth", authState);
  },[]);

  function getStatusBar(){
    return status.map((val: Number,ind: Number) => {
      const rounded = ind == 0? "rounded-l-lg" : ind == 3? "rounded-r-lg" : "";
      const color = val == 1? "bg-blue-500" : "bg-slate-200";
      const border = ind == 3? "" :"border-r-2 border-slate-400";
      return <div className={`w-[20vw] h-[10px] sm:w-[150px] ${color} ${rounded} ${border}`}></div>
    })
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex flex-col justify-center items-center" >
      <div className="w-[80vw] h-[10px] flex flex-row bg-slate-200 rounded-lg mb-[30px] sm:w-[600px]">
        {getStatusBar()}
      </div>
      {sliderState[0] === 0 && <BasicData />}
      {sliderState[0] === 1 && <Address />}
      {sliderState[0] === 2 && <FileUpload />}
      {sliderState[0] === 3 && <MultipleFiles />}
    </div>
  )
}

export default App
