import React, { useState } from "react";
import { FlashMessage } from "./FlashMessage";
import { LoginFun, setStorage } from "../../utils";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Login(props) {
    const location = useLocation();
    let navigate=useNavigate();
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [error, setError] = useState("");
    let [isError, setIsError] = useState(0);
    let [successMessage, setSuccessMessage] = useState(location?.state?.message || "");
    function setIserrorFalse() {
        setIsError(0);
        setSuccessMessage("");
    }
    function onPasswordChange(e) {
        setPassword(e.target.value);
    }
    function onEmailChange(e) {
        setEmail(e.target.value);
    }
    function thereIsErorr(message){
        setError(message);
        setIsError(true)
    }
    function noErorr(message){
        setError(message);
        setIsError(true)
    }
    function onFormSubmited(e) {
        e.preventDefault();
        if(!email){
            thereIsErorr("The Email Field is Required !")
            return;
        }
        if(!password){
            thereIsErorr("The Password is Required !")
            return;
        }
        
        LoginFun(email, password).then(response => {
            let {body,status}=response
            if (status === 200) {
                let token=body.token;
                props.setToken(token,email);
                noErorr();
                
                setStorage(token,email)
                navigate("/")


            } else {
                thereIsErorr("Wrong Email/Password")
            }
        });
    }

    return (
        <div className="authCardAndMessage">
            {isError || successMessage ? <FlashMessage class={isError?"danger":"success"} message={error || successMessage} delete={setIserrorFalse} /> : ""}
            <div className="authCard">
                <div className="title">Login</div>
                <form onSubmit={onFormSubmited}>
                    <label htmlFor="email">Your email</label>
                    <input onChange={onEmailChange} value={email} id="email" />
                    <label htmlFor="password">Your Password</label>
                    <input onChange={onPasswordChange} type="password" value={password} id="password" />
                    <button className="btn">Login</button>
                    <Link to={"/signup"}>
                        <div >Create new account</div>
                    </Link>
                </form>
            </div>
        </div>

    )
}

export default Login;