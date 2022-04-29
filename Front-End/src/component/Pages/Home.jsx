import React from "react";
import Button from "../Button.js"
import Hero from "../../assets/Hero.jpg"

import styles from "./CSS/Home.css"

function Home() {
    return (
        <div className={styles}>
            <div className="Content">
                <div className="Hero">
                    <img src={Hero} alt="Background" className="HomeHero" />

                    <h1 className="HeroText">Stop with boring ass counting.</h1>
                    <Button cname="HeroButton" name="Get Started"></Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
