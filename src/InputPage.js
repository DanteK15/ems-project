import React, { useState, useEffect } from "react";
import "./InputPage.css";

function InputPage() {

  const [address, setAddress] = useState('');
    // const [hospital, setHospital] = useState('');
    // const [helicopter, setHelicopter] = useState('');
    // const [time, setTime] = useState('');

  const handleChange= (e) => {
    setAddress(e.target.value);
  }

  const showInput = () => {
    if(document.getElementById('show').style.visibility === 'hidden') {
      document.getElementById('show').style.visibility = 'visible';
    } else {
      document.getElementById('show').style.visibility = 'hidden';
      }
  }

  return (
    <div className="inputpage">

      <div className = "reset"> 
        <button className = "reset-btn">Update Results</button>
      </div>

      <div className = "location-section">
        <br />
        <div className = "patient-location-section">
          <img src = "../images/map_example.png" alt = ""/>
        </div>

        <div className = "manual-address-input">
          <button className = "manual-address-btn"
            onClick = {showInput}
            >Manual Address Input</button>
          <input 
            type = "text"
            value = {address}
            id = "show" 
            placeholder = "Enter Address Here"
            style = {{visibility: 'hidden'}}
            onChange = {handleChange}
          />
        </div> 
      </div>

      <div className = "center">
        <div className = "menu-section">
          <form> 
            <select>
              <option value = "" disabled selected>Available Hospitals Nearby</option>
              <option value = "legacy">Legacy</option>
            </select>
          </form>
        </div>

        <div className = "menu-section">
          <form> 
            <select> 
              <option value = "" disabled selected>Available Helipads</option>
              <option value = "site1">Site 1</option>
              <option value = "site2">Site 2</option>
            </select>
          </form>
        </div>

        <div className = "menu-section">
          <input
            type = "text"
            value = {address}
            id = "show" 
            placeholder = "Estimated Patient Loading Time (minutes)"
            onChange = {handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default InputPage;