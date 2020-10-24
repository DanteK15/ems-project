import React, { useState, useEffect } from "react";
import "./InputPage.css";
import {useStateValue} from './StateProvider';


function InputPage() {
  const [{term}, dispatch] = useStateValue();

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

  //  what does update results do ??
  return (
    <div className="input-page">
      <div className = "location-section">
        <img src = "../images/map_example.png" alt = ""/>
        <div className = "manual-address-input">
          <button className = "manual-address-btn"
            onClick = {showInput}
            >Add address manually</button>
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

      <div className = "dropdown">
            <select>
              <option value = "" disabled selected>Available Hospitals Nearby</option>
              <option value = "legacy">{term}</option>
            </select>

            <select> 
              <option value = "" disabled selected>Available Helipads</option>
              <option value = "site1">Site 1</option>
              <option value = "site2">Site 2</option>
            </select>

          <input
            type = "text"
            value = {address}
            id = "show" 
            placeholder = "Estimated Patient Loading Time (minutes)"
            onChange = {handleChange}
          />
      </div>
    </div>
  );
}

export default InputPage;