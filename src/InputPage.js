import React, { useState } from "react";
import "./InputPage.css";
import {useStateValue} from './StateProvider';


function InputPage() {
  const [{term}] = useStateValue();
  const [{locations}] = useStateValue();
  const [address, setAddress] = useState('');
  const [hospital, setHospital] = useState('');
  const [helicopter, setHelicopter] = useState('');
  const [estimatedtime, setEstimatedTime] = useState('');
    // const [time, setTime] = useState('');

  const handleChange= (e) => {
    setAddress(e.target.value);
  }

  const handleEstimTimeChange = (e) => { 
    setEstimatedTime(e.target.value); 
  }

  const handleHospitalSelection = (e) => {
    setHospital(e.target.value); 
  }

  const handleHelicopterSelection = (e) => {
    setHelicopter(e.target.value); 
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
      <br />
      <div className = "dropdown">
            <select 
              id = "available-hospitals-selection"
              value = {hospital}
              onChange = {handleHospitalSelection}
              required>
            <option value = "" disabled selected 
              id = "available-hospitals">Available Hospitals Nearby</option>
            {/* <option value = "site1">Site 1</option> */}
            {term[0] ?
            term.map(e => <option> {e[0].location}</option>)
            // <option>{term[0].name}</option>
            : null}
            </select>
             {/* {term[0] ? 
             term.map(e => console.log(e.name))
              :null} } */}

            <select 
              id = "available-helipads-dropdown" 
              value = {helicopter}
              onChange = {handleHelicopterSelection}
              required> 
              <option value = "" disabled selected
                id = "available-helipads">Available Helipads</option> 
              <option value = "site1">Site 1</option>
              <option value = "site2">Site 2</option>
            </select> 

          <input
            type = "text"
            pattern="[0-9]*"
            id = "estimated-load-time" 
            value = {estimatedtime}
            placeholder = "Estimated Patient Loading Time (minutes)"
            onChange = {handleEstimTimeChange}
            minlength = "1"
            required
          />
          <ul class = "input-requirements">
              <li>Must only contain numbers.</li>
          </ul>
      </div>
    </div>
  );
}

export default InputPage;