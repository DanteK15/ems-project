import React, { useState } from "react";
import "./InputPage.css";
import {useStateValue} from './StateProvider';
import * as errorMessage from './error.js';


function InputPage() {
  const [{term}] = useStateValue();
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

  errorMessage.getLocation();

  setTimeout(() => {errorMessage.toast.error("TEST", errorMessage.errorOptions); }, 5000);
  

  errorMessage.toast.error("Duplicate Test", errorMessage.errorOptions);



  //  what does update results do ??
  return (
    <div className="input-page">
      <div className = "location-section">

      {/*ToastContainer is placed anywhere to initialize error popups*/}
      <errorMessage.ToastContainer limit={7} autoClose={false}/>

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
            <select id = "available-hospitals-selection">
            <option value = "" disabled selected 
              id = "available-hospitals">Available Hospitals Nearby</option>
            {term[0] ?
            term.map(e => <option> {e.name}</option>)
            // <option>{term[0].name}</option>
            : null}
            </select>
             {/* {term[0] ? 
             term.map(e => console.log(e.name))
              :null} } */}

            <select id = "available-helipads-dropdown"> 
              <option value = "" disabled selected
                id = "available-helipads">Available Helipads</option>
              <option value = "site1">Site 1</option>
              <option value = "site2">Site 2</option>
            </select>

          <input
            type = "text"
            value = {address}
            id = "estimated-load-time" 
            placeholder = "Estimated Patient Loading Time (minutes)"
            onChange = {handleChange}
          />
      </div>
    </div>
  );
}

export default InputPage;