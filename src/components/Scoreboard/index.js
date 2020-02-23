import React from "react";
import "./style.css";

// Component for the Navbar

function Nav(props) {
    return (
        <div>
            <h2>
                Score: {props.score} | High Score: {props.highScore}
            </h2>
        </div>
    );
}

export default Nav;
