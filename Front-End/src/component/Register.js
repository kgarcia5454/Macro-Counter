import { useRef, useState, useEffect } from "react";

import axios from "../api/axios.js"

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.]).{8,24}$/;

const REGISTER_URL = "/REGISTER"


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        const result = true
        setValidName(result);
    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user,pwd,matchPwd])

    const handleSubmit = async(e) => {
        e.preventDefault();

        //Double Check Submission
        const PassTest = PWD_REGEX.test(pwd);
            if(!PassTest){
                setErrMsg("Invalid Entry");
                return;
            }

        try{
            const response = await axios.post(REGISTER_URL,JSON.stringify({user,pwd}),{
                headers:{"Content-Type": "application/json"},
                withCredentials:true,
            });

            console.log(response);

            setSuccess(true)
        }catch (err){
            if(!err?.response){
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409){
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            errRef.current.focus();
        }
        
    }

    return (
        <div className="RegisterPage">
        {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/Login">Sign In</a>
                    </p>
                </section>
        ):(
        <section className="Register">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>

            <h1 className="RegisterHeader"> Register </h1>

            <form className = "RegisterForm" onSubmit = {handleSubmit} >

                <label htmlFor="firstname">
                    First Name:
                </label>

                <input type="text" id="firstname" /> 

                <br/>

                <label htmlFor="lastname">
                    Last Name:
                </label>

                <input type="text" id="lastname" /> 

                <br/>

                <label htmlFor="username">
                    Email:

                </label>
                <input 
                    type="email"
                    id="username"
                    ref={userRef}
                    autoComplete = "off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby = "uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur = {() => setUserFocus(false)} 
                />

                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    
                    4 to 24 characters. <br/>
                    Must begin with a letter. <br/>
                    Letters, numbers, underscore, hyphens allowed.

                </p>

                <label htmlFor = "password">
                    Password:
                </label>

                <input
                    type = "password"
                    id ="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />

                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen" }>
                    <ul>
                    <li> 8 to 24 characters. </li>
                    <li> Must include uppercase and lowercase letters, a number and a special character. </li>
                    <li> Allowed special character: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> </li>
                    </ul>
                </p>
                
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                </label>

                <input
                    type = "password"
                    id ="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />

                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen" }>
                    Must match the first password input field.
                   
                </p>

                <button className = "RegisterButton" disabled={!validName|| !validPwd || !validMatch ? true:false}> Sign Up</button>
            </form>

            <p className="Registered">
                Already Registered?<br/>
                <span className="line">
                        <a href='/Login'>Sign in</a>
                </span>
            </p>

        </section>
        )} </div>
    )
}

export default Register

//https://www.youtube.com/watch?v=brcHK3P6ChQ
// go to 16:02 for icons 