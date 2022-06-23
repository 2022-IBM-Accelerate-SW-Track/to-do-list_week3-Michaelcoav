import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/MichaelCoca.png";

export default class About extends Component {
  render() {
    return (
      <div>
        {/* <p>Design your About me page </p> */}
        <div class="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <h1 className="name_title">Michael Coca-Vargas</h1>
            <p className="brief_description">My name is Michael Coca-Vargas, I am a rising junior at George Mason University. My hobbies include playing video games, watching anime, and coding.</p>
          </div>
        </div>
      </div>
    );
  }
}
