import React from "react";
import SignOut from "../SignOut.js"


function SignOutPage(){
    return (
        <div className={styles}>
            <SignOut/>
            console.log("What");
            <Redirect to = {Home} />

        </div>
    )
}

export default Register;