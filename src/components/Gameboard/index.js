import React from "react";
import "./style.css";

function Gameboard(props) {
  return <div className="gameboard">{props.children}</div>;
}

export default Gameboard;