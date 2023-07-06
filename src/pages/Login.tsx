import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import Button from "../components/Button";
import Notification from "../components/Notification";
import { addAuth } from "../redux/slices/authSlice";

function Login(){

    const [msg, setMsg] = useState("");
    const [err,setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state: any) => state.auth);
    const [mail,setMail] = useState("");

    useEffect(() => {
        if(authState.token) navigate("/");
    },[]);
    
    function verifyMail(mail: string){
        const regex = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-.]+[.][a-z]{2,3}$");
        return regex.test(mail);
    }

    function handleLogin(evt: any){
        evt.preventDefault();
        const email = evt.target.mail.value.trim();
        const password = evt.target.password.value.trim();

        if(!verifyMail(email)){
            setMsg("Enter a valid email address!");
            setTimeout(() => setMsg(""), 3000);
            evt.target.mail.focus();
            return;
        }

        const url = "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login";
        console.log("json", JSON.stringify({
            "email": email,
            "password": password
        }))
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(!data.authToken){
                setErr(data.message + "\nTry Again!");
                setTimeout(() => setErr(""), 5000);
            }else{
                dispatch(addAuth({token: data.authToken, mail: email}));
                navigate("/");
            } 
        });
      
    }

    function handleForgotPassword(evt: any){
        evt.preventDefault();
        if(mail === ""){
            setMsg("Enter a valid mail address for verification!");
            setInterval(() => setMsg(""), 3000);
            return;
        }
        navigate("/frgt-pwd/" + mail);
    }


    return (
        <>
            <form onSubmit={evt => handleLogin(evt)} className="w-[250px] rounded-md flex-col justify-center items-center" style={{display: "flex"}}>
                <input type="text" name="mail" value={mail} onChange = {(evt) => setMail(evt.target.value)} placeholder="Enter email" className="border-b-2 border-blue-600 px-[10px] py-[5px] focus:outline-0 w-[250px] focus:bg-blue-100 rounded-sm" required/>
                {<span className="text-red-400 text-[0.8rem] self-start">{msg}</span>}
                <input type="password" name="password" placeholder="Enter password" className="border-b-2 border-blue-600 px-[10px] py-[5px] focus:outline-0 w-[250px] focus:bg-blue-100 mt-[10px] rounded-sm" required/>   
                <div className="mt-[20px] w-[250px] flex-row justify-between" style={{display: "flex"}}>
                    <Button name="Login" />
                    <Button name="Forgot password" onClick={handleForgotPassword}/>
                </div>   
            </form>
            {err !== "" && <Notification msg={err} />}
        </>
    )
}

export default Login;