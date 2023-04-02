import React from "react";
import logo from "./Images/Icon.png";

const Nav = () => {
  return (
    <div className="Nav pt-3 m-3">
      <h1 className="text-center">
        <img src={logo} alt="" style={{ maxWidth: "80px" }} />
        <span className="title">Weather App</span>
      </h1>
    </div>
  );
};

export default Nav;
