// import React, { useState } from "react";
import React, { useState, Component } from 'react';
import "./InputPage.css";
import {useStateValue} from './StateProvider';
// import {ScrollPicker} from 'react-native-value-picker';
import WheelPicker from 'react-simple-wheel-picker';

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

  const data = [
    {
        id: '1',
        value: '5 minutes'
    },
    {
        id: '2',
        value: '10 minutes'
    },
    {
        id: '3',
        value: '20 minutes'
    },
    {
        id: '4',
        value: '25 minutes'
    },
  ];

  const handleOnChange = target => {
    console.log(target);
  };

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

            {/* <select 
              id = "available-helipads-dropdown" 
              value = {helicopter}
              onChange = {handleHelicopterSelection}
              required> 
              <option value = "" disabled selected
                id = "available-helipads">Available Helipads</option> 
              <option value = "site1">Site 1</option>
              <option value = "site2">Site 2</option>
            </select>  */}
            
            <select 
              id = "available-hospitals-selection"
              value = {helicopter}
              onChange = {handleHelicopterSelection}
              required>
            <option value = "" disabled selected 
              id = "available-hospitals">Available Helipads Nearby</option>
            {locations[0] ?
            locations.map(e => <option> {e[0].location}</option>)
            // <option>{term[0].name}</option>
            : null}
            </select>






          {/* <input
            type = "text"
            pattern="[0-9]*"
            id = "estimated-load-time" 
            value = {estimatedtime}
            placeholder = "Estimated Patient Loading Time (minutes)"
            onChange = {handleEstimTimeChange}
            minlength = "1"
            required
          /> */ }

            <h5>Estimated Patient Load Time</h5>
            <WheelPicker
              data={data}
              onChange={handleOnChange}
              height={100}
              width={600}
              itemHeight={30}
              selectedID={data[0].id}
              color="#ccc"
              activeColor="#3232ff"
              backgroundColor="#fff"
            />

      </div>
    </div>
  );
}

export default InputPage;