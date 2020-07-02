import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Homepage = () => {
    return (
        <div className={"home-hero"}>
            <h1>What's Happening?</h1>
            <h4>New To Warbler?</h4>
            <Link to={"/register"} className={"btn btn-primary"}>
                Sign Up Here
            </Link>
        </div>
    );
};

export default Homepage;
