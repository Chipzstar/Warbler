import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import MessageTimeline from "./MessageTimeline";

const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className={"home-hero"}>
                <h1>What's Happening?</h1>
                <h4>New To Warbler?</h4>
                <Link to={"/register"} className={"btn btn-primary"}>
                    Sign Up Here
                </Link>
            </div>
        );
    }
    return (
        <div>
            <h1>Welcome {currentUser.user.username}!</h1>
            <MessageTimeline
                profileImageURL={currentUser.user.profileImageURL}
                username={currentUser.user.username}
            />
        </div>
    );
};

export default Homepage;
