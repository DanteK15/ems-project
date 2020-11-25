import React, { useEffect, useState } from "react";
import "./Results.css";
import { Icon } from '@iconify/react';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import ambulanceIcon from '@iconify/icons-fa/ambulance';
import { useStateValue } from '../Context/StateProvider';
import renderDirections from "../Maps/Directions";
import isEmpty from 'lodash/isEmpty';
import { ContactSupportOutlined } from "@material-ui/icons";

function Results() {

  const [{ gmaps, polyline, directionsRenderer, directionsService, ambulanceMarker, helicopterMarker, calcParams, helicopter_speed }] = useStateValue();
  const duration = "time";
  const [parseTime, setParseTime] = useState("");

  //Parses Maps time estimate and combines it with patient load time.
  //Reformats the answer for return.
  function timeStringParser(estimatedtime, parseString){
    var totalTime;
    var hourCount;
    var minuteCount;

    //Parses input string in cases where it's multiple hours
    if(parseString.includes("hours")){
      parseString = parseString.split(" hours ");

      //Removes mins or min from input string.
      if(parseString[1].includes("mins")){
        parseString[1] = parseString[1].replace(" mins", "");
      }
      else if(parseString[1].includes("min")){
        parseString[1] = parseString[1].replace(" min", "");
      }
  
      //Convert parsed strings into ints 
      parseString[1] = parseInt(parseString[1]);
      parseString[0] = parseInt(parseString[0]);

      //Hour values are converted to minutes
      parseString[0] = (parseString[0] * 60); 
  
      //Total time in minutes is totalled
      totalTime = parseString[0] + parseString[1];
    }

    //Parses input string in cases where it's one hour
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
    }

    //Parses input string based on cases where it's just minutes
    if(parseString.includes("mins")){
      parseString = parseString.replace(" mins", "");
      parseString = parseInt(parseString);
      totalTime = parseString;
    }

    //Parses input string in case where there is just 1 min
    else if(parseString.includes("min")){
      parseString = parseString.replace(" min", "");
      parseString = parseInt(parseString);
      totalTime = parseString;
    }

    //Adds in patient load time
    totalTime = totalTime + estimatedtime;

    //Reformats minute value back into hours and minutes
    if(totalTime > 59){
      hourCount = (totalTime / 60);
      hourCount = Math.floor(hourCount);

      if(hourCount > 1){
        hourCount = hourCount + " hours ";
      }
      else{
        hourCount = hourCount + " hour ";
      }

      minuteCount = totalTime % 60;
      minuteCount = minuteCount + " min";

      totalTime = hourCount + minuteCount;

      return totalTime;
    }

    //Reformats minute value
    else{
      minuteCount = totalTime % 60;
      minuteCount = minuteCount + " min";

      totalTime = minuteCount;
      
      return totalTime;
    }
  }

  //Calculates helicopter-to-patient time.
  function heliTimeStringParser(heliDistance, heliSpeed){
    var heliTime;
    heliSpeed = parseInt(heliSpeed);
    var minuteParse = heliDistance.toFixed(4);

    //Calculates hours
    var hourCount = heliDistance / heliSpeed;
    hourCount = Math.floor(hourCount);

    //Calculates minutes
    var minuteCount = minuteParse;
    minuteCount = parseInt(minuteCount);
    minuteCount = minuteCount / heliSpeed;
    minuteCount = minuteCount.toString();
    minuteCount = minuteCount.split(".");
    minuteCount = minuteCount[1];
    minuteCount = "." + minuteCount;
    minuteCount = minuteCount * 60;
    minuteCount = Math.round(minuteCount);

    //Reformats hour and minute values back into hours and minutes string format
    if(hourCount >= 1){
      if(hourCount > 1){
        heliTime = hourCount + " hours ";
      }
      else{
        heliTime = hourCount + " hour ";
      }

      heliTime = heliTime + minuteCount + " min";

      return heliTime;
    }

    //Reformats back to string format for cases with only minute values
    else{
      heliTime = minuteCount + " min";

      return heliTime;
    }
  }

  //Calculates patient-to-hospital time for the helicopter estimate.
  function heliTimeStringParser2(estimatedTime, heliDistance, heliSpeed, heliDistance2, firstRouteTime){
    var heliTime;
    heliSpeed = parseFloat(heliSpeed);
    var minuteParse = heliDistance.toFixed(4);
    var minuteParse2;
    console.log('First Route Time', firstRouteTime);
    //Turns first route time and patient load time into an int.
    firstRouteTime = firstRouteTime.split(' ');
    if(firstRouteTime[2]){
      minuteParse2 = parseFloat(firstRouteTime[2]);
      firstRouteTime = (parseFloat(firstRouteTime[0]) * 60) + parseFloat(firstRouteTime[2]);
      firstRouteTime = parseFloat(firstRouteTime);
    }
    else{
      minuteParse2 = parseFloat(firstRouteTime[0]);
      firstRouteTime = parseFloat(firstRouteTime[0]);
      firstRouteTime = parseFloat(firstRouteTime);
    }
    estimatedTime = parseFloat(estimatedTime);
    console.log('patient load time:', estimatedTime);
    console.log('First Route Time', firstRouteTime);

    //Calculates a time estimate for cases when the patient load time
    //is greater than the first route time. In that case the patient
    //load time - the first route time is used.
    if(estimatedTime > firstRouteTime){
      console.log('Patient Load > First Route');
      //Determines hour value. 
      var hourCount = heliDistance / heliSpeed;
      hourCount = Math.floor(hourCount);
  
      //Determines minute value.
      var minuteCount = minuteParse;
      minuteCount = parseFloat(minuteCount);
      minuteCount = minuteCount / heliSpeed;
      minuteCount = minuteCount.toString();
      minuteCount = minuteCount.split(".");
      minuteCount = minuteCount[1];
      minuteCount = "." + minuteCount;
      minuteCount = minuteCount * 60;
      minuteCount = Math.round(minuteCount);
  
      //Subtracts first route time from patient load time
      //Calculates minute value.
      estimatedTime = (estimatedTime - firstRouteTime);
      minuteCount = minuteCount + estimatedTime;
      minuteCount = minuteCount + firstRouteTime;
  
      //This will carry over the minutes value into the hours value
      //if the minutes value went over 60 minutes.
      if(minuteCount >= 60){
        minuteCount = minuteCount - 60;
        hourCount = hourCount + 1;
      }
    }

    //Calculates the helicopter route time for cases when the
    //patient load time is less than the first helicopter route 
    //time. The first route time is added together with the second
    //helicopter route time.
    else{
      console.log('Patient Load < First Route');
      //Hour value calculated.
      var hourCount = (heliDistance / heliSpeed);
      var hourCount2 = (heliDistance2 / heliSpeed);
      hourCount = Math.floor(hourCount);
      hourCount2 = Math.floor(hourCount2);
      hourCount = hourCount + hourCount2;
      console.log('hourCount', hourCount);
  
      //Minute value calculated.
      var minuteCount = minuteParse;
      minuteCount = parseFloat(minuteCount);
      minuteCount = minuteCount / heliSpeed;
      minuteCount = minuteCount.toString();
      minuteCount = minuteCount.split(".");
      minuteCount = minuteCount[1];
      minuteCount = "." + minuteCount;
      minuteCount = minuteCount * 60;
      minuteCount = Math.round(minuteCount);
      minuteCount = parseInt(minuteCount);
      console.log('Minute Count 2nd Route', minuteCount);
      console.log('Minute Count 1st Route', minuteParse2);
      minuteCount = minuteCount + minuteParse2;
  
      //Carries over the minutes value into the hours if minutes
      //goes over 60.
      if(minuteCount >= 60){
        minuteCount = minuteCount - 60;
        hourCount = hourCount + 1;
      }
    }


    //Reformats minute value back into hours and minutes
    if(hourCount >= 1){
      if(hourCount > 1){
        heliTime = hourCount + " hours ";
      }
      else{
        heliTime = hourCount + " hour ";
      }

      heliTime = heliTime + minuteCount + " min";

      return heliTime;
    }

    //Reformats minute value if hours < 1.
    else{
      heliTime = minuteCount + " min";

      return heliTime;
    }
  }

  // from the above code for determining the time estimate, but used to reformat
  // the parsed string
  function reformatvalue(parseString) {
    var totalTime; 
    //Parses input string in cases where it's multiple hours
    if(parseString.includes("hours")){
      parseString = parseString.split(" hours ");

      //Removes mins or min from input string.
      if(parseString[1].includes("mins")){
        parseString[1] = parseString[1].replace(" mins", "");
      }
      else if(parseString[1].includes("min")){
        parseString[1] = parseString[1].replace(" min", "");
      }
  
      //Convert parsed strings into ints 
      parseString[1] = parseInt(parseString[1]);
      parseString[0] = parseInt(parseString[0]);

      //Hour values are converted to minutes
      parseString[0] = (parseString[0] * 60); 
  
      //Total time in minutes is totalled
      totalTime = parseString[0] + parseString[1];
    }

    //Parses input string in cases where it's one hour
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
    }

    //Parses input string based on cases where it's just minutes
    if(parseString.includes("mins")){
      parseString = parseString.replace(" mins", "");
      parseString = parseInt(parseString);
      totalTime = parseString;
    }

    //Parses input string in case where there is just 1 min
    else if(parseString.includes("min")){
      parseString = parseString.replace(" min", "");
      parseString = parseInt(parseString);
      totalTime = parseString;
    }

    return totalTime; 
  }

  useEffect(() => {
    const { patientLocal, hospital, helicopter, estimatedtime } = calcParams;
    if (!isEmpty(gmaps)) {
      renderDirections(gmaps, patientLocal, hospital, helicopter, ambulanceMarker, helicopterMarker, polyline, directionsRenderer, directionsService, function(duration) {
        var parsedTime;
        var parsedTime2;

        // used for reformatting the value to get the raw minute format
        var ambulanceToHosp;
        var heliToPatient; 
        var heliToHosp; 

        // var helicopter_speed2;
        // helicopter_speed2 = parseInt(helicopter_speed);
        // //Calls the route times with a default value of 100mph for helicopter speed.
        // if(!helicopter_speed2){
        //   parsedTime = timeStringParser(parseInt(estimatedtime), duration[0].text);
        //   document.getElementById("ambulance-eta-hospital").innerHTML = parsedTime; 
        //   parsedTime2 = heliTimeStringParser(duration[1], "100");
        //   document.getElementById("heli-eta-patient").innerHTML = parsedTime2;
        //   parsedTime = heliTimeStringParser2(estimatedtime, duration[2], "100", duration[1], parsedTime2);
        //   document.getElementById("heli-eta-hospital").innerHTML = parsedTime;
        // }

        // else{
        //Calls function to take in time estimate string from maps route function output
        //and patient load time input and combines them and reformats back into x hours y min format.

          // ambulance to hospital 
          parsedTime = timeStringParser(parseInt(estimatedtime), duration[0].text);
          document.getElementById("ambulance-eta-hospital").innerHTML = parsedTime; 
          console.log(parsedTime);

          // the minutes for the time estimate
          ambulanceToHosp = reformatvalue(parsedTime);
          console.log(ambulanceToHosp);

          // helicopter to patient 
          parsedTime2 = heliTimeStringParser(duration[1], helicopter_speed);
          document.getElementById("heli-eta-patient").innerHTML = parsedTime2;
          console.log(parsedTime2);

          // the minutes for the time estimate
          heliToPatient = reformatvalue(parsedTime2);
          console.log(heliToPatient);

          // helicopter to hospital 
          parsedTime = heliTimeStringParser2(estimatedtime, duration[2], helicopter_speed, duration[1], parsedTime2);
          document.getElementById("heli-eta-hospital").innerHTML = parsedTime;
          console.log(parsedTime);

          // the minutes for the time estimate
          heliToHosp = reformatvalue(parsedTime); 
          console.log(heliToHosp); 
        // }

        var helicopterTime = heliToPatient + heliToHosp; 
        console.log(helicopterTime); 

        var ambulanceTime = ambulanceToHosp; 
        console.log(ambulanceTime); 

        // visual cue for the fastest mode of transportation
        if(helicopterTime < ambulanceTime) {
          var elements = document.getElementsByClassName('results-container'); 
	        for(var i = 0; i < elements.length; i++){
            elements[i].style.backgroundColor = "#76ac6d";
          }
          console.log("Helicopter is faster.");
	      }
    
        else if(ambulanceTime < helicopterTime) {
          var elements = document.getElementsByClassName('results-container-2'); 
	        for(var i = 0; i < elements.length; i++){
		        elements[i].style.backgroundColor = "#76ac6d";
          }
          console.log("Ambulance is faster."); 
        }

      });
    }
  }, [calcParams])

  return (
    <div className="results">
      <h2
        style={{
          color: 'gray', textTransform: 'uppercase', letterSpacing: '2px',
          marginBottom: '15px'
        }}
      >Results</h2>

      <div className="results-container">
        <div className="icon-container">
          <Icon icon={helicopterIcon} width="40" height="40"
            className="heli"
          />
          <h2>Helicopter</h2>
        </div>

        <h3>ETA to Patient</h3>
        <div className="results__input">
          {/* <h5 id="heli-eta-patient">{calcParams.estimatedtime}</h5> */}
          <h5 id="heli-eta-patient"></h5>
        </div>
        <br />
        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <h5 id="heli-eta-hospital"></h5>
        </div>
      </div>

      {/* <div className="results__ambulanceResultsContainer"> */}
      <div className="results-container-2">
        <div className="icon-container">
          <Icon icon={ambulanceIcon} width="40" height="40"
            className="ambulance"
          />
          <h2>Ambulance</h2>
        </div>

        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <h5 id="ambulance-eta-hospital"></h5>
        </div>

      </div>

      <br />


    </div>
  );
}

export default Results;