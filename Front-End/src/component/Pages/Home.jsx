import React from "react";
import Button from "../Button.js"
import Hero from "../../assets/Hero.jpg"

import styles from "./CSS/Home.css";

import { Link } from "react-router-dom";

function Home() {
    return (
        <div className={styles}>
            <div className="Content">
                <div className="Hero">
                    <img src={Hero} alt="Background" className="HomeHero" />

                    <h1 className="HeroText">Track recipes with ease!</h1>
                    <Link to="/Register">
                        <Button cname="HeroButton" name="Get Started" ></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
