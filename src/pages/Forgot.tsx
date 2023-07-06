import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Forgot(){

    const { mail } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      if(!mail || mail === "") navigate("/login");

      // ---- logic related to sending otp or any vverification id to the user mail ----
    },[]);

    return (
        <>
          <form className="w-[250px] rounded-md flex-col justify-center items-center" style={{display: "flex"}}>
                <input type="text" name="mail" placeholder="Enter OTP" className="border-b-2 border-blue-600 px-[10px] py-[5px] focus:outline-0 w-[250px] focus:bg-blue-100 rounded-sm" required/>   
                <div className="mt-[20px] w-[250px] flex-row justify-between" style={{display: "flex"}}>
                    <Button name="Verify" />
                    <Button name="Resend OTP" />
                </div>   
            </form>
        </>
    )
}