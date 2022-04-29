import React from "react";
import ButtonCSS from "./Button.module.css";

function Button(props){
    return <button className={ButtonCSS.btn} onClick={props.click}>{props.name}</button>
}

export default Button