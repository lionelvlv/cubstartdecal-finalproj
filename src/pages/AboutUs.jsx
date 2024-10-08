import React from "react";
import Navbar from "../components/Navbar";

function AboutUs() {
  return (
    <div>
      <Navbar />
      {/* Add stuff about our project here. This is the about us page. */}
      <div className="info-box">
        <h1>Welcome to Office Hours!</h1>
        <p>Cubstart Final Project Spring 2024</p>
        <p>Made by Lionel, Jerry, Jose and Jordan</p>
        <p>Frontend: Jose and Jordan</p>
        <p>Backend: Lionel and Jerry</p>
        <p></p>
        </div>
        <div className="info-box">
          <h1>Problem Statement</h1>
          <p>Need additional help on homework assignments?</p>
          <p>Look no further than our website Office Hours.</p>
          </div>  
    </div>
  );
}

export default AboutUs;