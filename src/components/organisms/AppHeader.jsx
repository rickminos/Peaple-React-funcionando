import React from "react";
import logo from "../../img/peaple.png";
import profile from "../../img/profile.jpeg";

export default function AppHeader(props) {
  return (
    <div className="nav">
      <div>
        <img src={logo} className="responsive" alt="" />
        <img
          className="img-profile"
          src={profile}
          onClick={() => props.setOpen(true)}
          alt=""
        />
      </div>
    </div>
  );
}
