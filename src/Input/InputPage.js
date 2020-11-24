import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Loader } from "@googlemaps/js-api-loader"
import "./InputPage.css";
import isEmpty from 'lodash/isEmpty';
import { useStateValue } from '../Context/StateProvider';
import AutoComplete from "../Maps/AutoComplete"
import { actionTypes } from "../Context/reducer";
import * as errorMessage from './error.js';
import WheelPicker from 'react-simple-wheel-picker';
import renderDirections from "../Maps/Directions";

function InputPage() {
  const [{ patientLocal, hospitals, helicopters, gmaps, polyline, directionsRenderer, directionsService}, dispatch] = useStateValue();
  const [displayInput, setDisplayInput] = useState(false)
  const [hospital, setHospital] = useState();
  const [helicopter, setHelicopter] = useState();
  const [estimatedtime, setEstimatedTime] = useState("");
  const [timeID, setTimeID] = useState(0);
  const timeData = timeIncrements();

  // Generates granular time data for patient loading wheel scroll
  function timeIncrements() {
    const quantity = 10;
    const granularity = 5;
    let data = [];
    var i = 0;
    for (i; i <= quantity; i++) {
      let minutes = i * granularity;
      data.push({ id: `${i}`, value: minutes + ' minutes' })
    }
    return data;
  }

  function helicopterToHospital(time) {
    var total = parseInt(time);
    total = total;

    return total;
  }

  // Set new patient location from geolocation or manual input
  const newPatientLoc = (place) => {
    dispatch({
      type: actionTypes.SET_LOC,
      patientLocal: place
    })
  }

  const onSubmit = () => {
    if(patientLocal && hospital && helicopter && estimatedtime) {
      dispatch({
        type: actionTypes.SET_CALC,
        calcParams: {patientLocal, hospital, helicopter, estimatedtime}
      })
    }
  }

  const handleSubmit = (e) => {
    if(patientLocal && hospital && helicopter && estimatedtime) {
      dispatch({
        type: actionTypes.SET_CALC,
        calcParams: {patientLocal, hospital, helicopter, estimatedtime}
      })
    }

    // Helicopter ETA to patient
    document.getElementById("heli-eta-patient").innerHTML = estimatedtime;
    document.getElementById("heli-eta-patient").value = estimatedtime;
    console.log(document.getElementById("heli-eta-patient").innerHTML);

    // Helicopter ETA to hospital
    document.getElementById("heli-eta-hospital").innerHTML = estimatedtime; 
    document.getElementById("heli-eta-hospital").value = estimatedtime;
    console.log(document.getElementById("heli-eta-hospital").innerHTML);

    // Ambulance to hospital 
    document.getElementById("ambulance-eta-hospital").innerHTML = estimatedtime; 
    document.getElementById("ambulance-eta-hospital").value = estimatedtime;
    console.log(document.getElementById("ambulance-eta-hospital").innerHTML);

    var helicopterTime = document.getElementById("heli-eta-patient").value
      + document.getElementById("heli-eta-hospital").value; 
    var ambulanceTime = document.getElementById("ambulance-eta-hospital").value; 

    if(helicopterTime < ambulanceTime) {
      var elements = document.getElementsByClassName('results-container'); 
	    for(var i = 0; i < elements.length; i++){
		    elements[i].style.backgroundColor = "#76ac6d";
	    }
    }
    else if(ambulanceTime < helicopterTime) {
      var elements = document.getElementsByClassName('results-container-2'); 
	    for(var i = 0; i < elements.length; i++){
		    elements[i].style.backgroundColor = "#76ac6d";
	    }
    }
  }

  //Function to check location services access and alert user to enable it.
  errorMessage.getLocation();

  /* EXAMPLE & GUIDE FOR ERROR POPUPS - Replace example text with your message.
  // Only one error popup can exist at a time. The last error must be dismissed
  // before a new one can be called for display. 

  errorMessage.toast.error("Example Text", errorMessage.errorOptions);
  
  //To queue up different error popups at the same time. The error's must have
  //different Id's. The above function creates errors of the same Id, which prevents
  //duplicates. Use the following code to create an error with a unique id to display
  //at the same time.

  errorMessage.toast.error("Example text", {
    toastId: "uniqueID"
    });

  */

  const handleEstimTimeChange = (e) => {
    let minutes = e.value.split(' ');
    setTimeID(parseInt(e.id));
    setEstimatedTime(minutes[0])
  }

  const handleHospitalSelection = (e) => {
    setHospital(hospitals[e.target.value]);
  }

  const handleHelicopterSelection = (e) => {
    setHelicopter(helicopters[e.target.value]);
  }

  return (
    <div className="input-container">
      <div className="location-section">
        {/*ToastContainer is placed anywhere to initialize error popups*/}
        <errorMessage.ToastContainer limit={7} autoClose={false}
          transition={errorMessage.Zoom} position={"top-center"} />
        <div className="manual-address-input">
          <button className="manual-address-btn"
            onClick={() => setDisplayInput(!displayInput)}
          >Edit Current Address</button>
          {displayInput &&
            (gmaps && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newPatientLoc} />
            )}
        </div>
      </div>
      <br />
      <div className="dropdown">
        <select
          id="available-hospitals-selection"
          name='hospital-selection'
          onChange={handleHospitalSelection}
          required>
          <option value="" disabled selected
            id="available-hospitals">Available Hospitals Nearby</option>
          {!isEmpty(hospitals) &&
            hospitals.map((e, index) => <option key={index} value={index}> {e.name}</option>)
          }
        </select>

        <select
          id="available-hospitals-selection"
          name='helicopter-selection'
          onChange={handleHelicopterSelection}
          required>
          <option value="" disabled selected
            id="available-helicopters">Available Helicopters Nearby</option>
          {!isEmpty(hospitals) &&
            helicopters.map((e, index) => <option key={index} value={index}> {e.name}</option>)
          }
        </select>
        </div>

        <div className="picker">
          <h5>Estimated Patient Load Time</h5>
          <WheelPicker
            id="wheelpicker"
            data={timeData}
            onChange={handleEstimTimeChange}
            height={75}
            width={300}
            itemHeight={30}
            selectedID={timeData[timeID].id}
            // color="#ccc"
            color="black"
            activeColor="white"
            // backgroundColor="#fff"
            backgroundColor="#32424d77"
            shadowColor="none"
          />
        <div className="submit-section">
        {/*<btn onClick={onSubmit} type = "submit" className="picker-btn">submit</btn>*/}
          <button 
            className="submit-button"
            type = "submit"
            onClick = {handleSubmit}
            >Calculate</button>
      </div>
      </div>
       
    </div>
  );
}

export default InputPage;