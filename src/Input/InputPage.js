import React, { useState } from "react";
import "./InputPage.css";
import isEmpty from 'lodash/isEmpty';
import { useStateValue } from '../Context/StateProvider';
import AutoComplete from "../Maps/AutoComplete"
import { actionTypes } from "../Context/reducer";
import * as errorMessage from './error.js';
import WheelPicker from 'react-simple-wheel-picker';
import LocationMap from "../Maps/LocationMap";

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

  const handleSubmit = (e) => {
    if(patientLocal && hospital && helicopter && estimatedtime) {
      dispatch({
        type: actionTypes.SET_CALC,
        calcParams: {patientLocal, hospital, helicopter, estimatedtime}
      })
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

        <LocationMap /> 
    
        {/*
        <div className="manual-address-input">
          <button className="manual-address-btn"
            onClick={() => setDisplayInput(!displayInput)}
          >Update Patient's Address</button>
          {displayInput &&
            (gmaps && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newPatientLoc} />
            )}
        </div>*/}
      </div>
      <div className = "manual-add-section">
        <button 
          className ="manual-add-btn"
          onClick = {() => setDisplayInput(!displayInput)}>Update Patient's Address
        </button>
        {displayInput &&
          (gmaps && <AutoComplete map={gmaps.map} mapApi={gmaps.maps} newPlace={newPatientLoc} />
        )}
      </div>
      <br />
      <br />
      
      <div className="dropdown">
        <select
          id="available-hospitals-selection"
          name='hospital-selection'
          onChange={handleHospitalSelection}
          required>
          <option value="" disabled selected
            id="available-hospitals">Available Hospitals</option>
          {!isEmpty(hospitals) &&
            hospitals.map((e, index) => <option key={index} value={index}> {e.name}</option>)
          }
        </select>

        <br />
        <select
          id="available-hospitals-selection"
          name='helicopter-selection'
          onChange={handleHelicopterSelection}
          required>
          <option value="" disabled selected
            id="available-helicopters">Available Helicopters</option>
          {!isEmpty(hospitals) &&
            helicopters.map((e, index) => <option key={index} value={index}> {e.name}</option>)
          }
        </select>
        </div>

        <br />
        <div className="picker">
          <h5>Time Until Ready for Transport</h5>
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