import React, { useEffect } from "react";
import "./Results.css";
import { Icon } from '@iconify/react';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import ambulanceIcon from '@iconify/icons-fa/ambulance';
import { useStateValue } from '../Context/StateProvider';
import renderDirections from "../Maps/Directions";
import isEmpty from 'lodash/isEmpty';

function Results() {

  const [{ gmaps, polyline, directionsRenderer, directionsService, calcParams }] = useStateValue();
  const duration = "time";

  function timeStringParser(parseString){
    var totalTime;

    if(parseString.includes("hours")){
      parseString = parseString.split(" hours ");

      if(parseString[1].includes("mins")){
        parseString[1] = parseString[1].replace(" mins", "");
      }
      else if(parseString[1].includes("min")){
        parseString[1] = parseString[1].replace(" min", "");
      }
  
      parseString[1] = parseInt(parseString[1]);
  
      parseString[0] = parseInt(parseString[0]);
  
      parseString[0] = (parseString[0] * 60); 
  
      totalTime = parseString[0] + parseString[1];
  
      return totalTime;
    }
    else if(parseString.includes("hour")){
      parseString = parseString.split(" hour ");

      if(parseString[1].includes("mins")){
        parseString[1] = parseString[1].replace(" mins", "");
      }
      else if(parseString[1].includes("min")){
        parseString[1] = parseString[1].replace(" min", "");
      }
  
      parseString[1] = parseInt(parseString[1]);
  
      parseString[0] = parseInt(parseString[0]);
  
      parseString[0] = (parseString[0] * 60); 
  
      totalTime = parseString[0] + parseString[1];
  
      return totalTime;
    }

    if(parseString.includes("mins")){
      parseString = parseString.replace(" mins", "");

      parseString = parseInt(parseString);

      totalTime = parseString;
  
      return totalTime;
    }
    else if(parseString.includes("min")){
      parseString = parseString.replace(" min", "");

      parseString = parseInt(parseString);

      totalTime = parseString;
  
      return totalTime;
    }

    return -1;
  }

  useEffect(() => {
    console.log(calcParams);
    const { patientLocal, hospital, helicopter, estimatedtime } = calcParams;
    if (!isEmpty(gmaps)) {
      renderDirections(gmaps, patientLocal, hospital, helicopter, polyline, directionsRenderer, directionsService, function(duration) {
        var parsedTime;
        parsedTime = timeStringParser(duration.text);
        document.getElementById("ambulance-eta-hospital").innerHTML = parsedTime + parseInt(estimatedtime); 
      });
    }
    // TODO: PERFORM CALCULATION 
  }, [calcParams])

  return (
    <div className="results">
      <h2
        style={{
          color: 'gray', textTransform: 'uppercase', letterSpacing: '2px',
          marginBottom: '15px'
        }}
      >Results</h2>

      <div className="results__helicopterResultsContainer">
        <div className="icon-container">
          <Icon icon={helicopterIcon} width="40" height="40"
            className="heli"
          />
          <h2>Helicopter</h2>
        </div>

        <h3>ETA to Patient</h3>
        <div className="results__input">
          {/* <input placeholder="Estimated Time" type="text" /> */}
          <h5 id="heli-eta-patient">time</h5>
        </div>

        <h3>ETA to Hospital</h3>
        <div className="results__input">
          {/* <input placeholder="Estimated Time" type="text" /> */}
          <h5 id="heli-eta-hospital">time</h5>
        </div>
      </div>

      <div className="results__ambulanceResultsContainer">
        <div className="icon-container">
          <Icon icon={ambulanceIcon} width="40" height="40"
            className="ambulance"
          />
          <h2>Ambulance</h2>
        </div>

        <h3>ETA to Hospital</h3>
        <div className="results__input">
          {/* <input placeholder="Estimated Time" type="text" /> */}
          <h5 id="ambulance-eta-hospital">time</h5>
        </div>

      </div>

      <br />


    </div>
  );
}

export default Results;