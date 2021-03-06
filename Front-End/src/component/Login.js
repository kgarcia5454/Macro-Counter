import { useRef, useState, useEffect,useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";

const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const auth = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}), {
                headers: {'Content-Type': 'application/json'},
                withCredentials:true
            });

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth(user);

            localStorage.setItem('user',user)

            setUser('');
            setPwd('');
            setSuccess(true);
        }catch(err){

            console.log(err);
            if(!err?.response){
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400){
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401){
                setErrMsg('Unauthorized')
            }else {
                setErrMsg("Login Failed");
            }

            errRef.current.focus();

        }
    };

    return (
        <div className="Page">
            {success ? (
                <section className = "Success">
                    <h1> You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section className = "SignIn" >
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>

                    <h1 className="LoginHeader">Sign In</h1>

                    <form className = "LoginForm" onSubmit={handleSubmit}>
                        <label htmlFor="username">Email:</label>

                        <input
                            type="email"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <br/>

                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />

                        <br/>

                        <button className = "SignInButton">Sign In</button>
                    </form>

                    <p className="Unregistered">
                        Need an Account? <br />
                        <span className="line">
                            <a href="/Register"> Sign Up </a>
                        </span>
                    </p>
                </section>
            )}
        </div>
    );
};

export default Login;
