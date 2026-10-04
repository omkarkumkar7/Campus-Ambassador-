import "./App.css";
import logo from './sf_logo.bea788dbe4b626510928.png';
import background from './SAM02403.JPG';
//import React from "react";
 //import background from './Screenshot_20251010_182411_Instagram(3).jpg';
 //style={{ backgroundImage: `url(${background})` }}

function App() {
  return (
    <div className="frame" >
      <h1 className="title">Your Profile</h1>
      <h2 className="fest">Spring Fest</h2>
      <h3 className="college">IIT Kharagpur</h3>

      <div className="logo"></div>

      <div className="Rectangle13"></div>
      <div className="Rectangle25"></div>
      <div className="Rectangle26"></div>
      <div className="Rectangle27"></div>
      <div className="Rectangle28"></div>
      <div className="Rectangle29"></div>
      <div className="Rectangle30"></div>
      <div className="Rectangle31"></div>
      <div className="Rectangle32"></div>
      <div className="Rectangle33"></div>
      <div className="Rectangle34"></div>

      <div className="info-box">
        <p className="id">SFID:</p>
        <p className="name">Name:</p>
        <p className="coll">College:</p>
        <p className="city">City:</p>
        <p className="state">State:</p>
        <p className="dob">Date of Birth:</p>
        <p className="gender">Gender:</p>
        <p className="pn">Phone Number:</p>
        <p className="email">E-Mail:</p>
        <p className="aem">Alternate E-Mail:</p>
        <p className="yop">Year of Passing:</p>
      </div>
    </div>
  );
}


export default App;