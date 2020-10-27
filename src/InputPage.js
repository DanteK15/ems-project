import React, { useState } from "react";
import "./InputPage.css";
import {useStateValue} from './StateProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';


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

  var errorCount = -1;

  const notify = () => {
    errorCount++;

    if(errorCount == 3){
      errorCount = 0;
      toast.dismiss();
    }

    toast.error("ERROR", {
      transition: Zoom,
      position: "top-center",
      autoClose: "false"
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      toast.dismiss();

      navigator.geolocation.getCurrentPosition(showPosition, showError);

      toast.clearWaitingQueue();
    } 
    else { 
      toast.dismiss();

      toast.error("Location Services Not Supported By This Device", {
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });

      toast.clearWaitingQueue();
    }
  }

  function showPosition(position) {
    toast.dismiss();

    toast.clearWaitingQueue();
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        navigator.permissions.query({name: 'geolocation'}).then(function(permissionStatus){
          console.log(permissionStatus);

          if(permissionStatus.state == 'prompt'){
            toast.dismiss();
            toast.error("Please Allow Location.", {
              toastId: "ToastPromptPermissionID",
              transition: Zoom,
              position: "top-right",
              autoClose: "false"
            });
            toast.clearWaitingQueue();
            getLocation();
          }

          else{
            toast.dismiss();
            toast.error("Location Access Blocked. Please allow by clicking location icon in search bar and selecting 'Always Allow.'", {
              toastId: "ToastPermissionDeniedID",
              transition: Zoom,
              position: "top-center",
              autoClose: "false"
            });
            errorCount = 0;
            
            toast.clearWaitingQueue();
          }
          
        });
        break;

      case error.POSITION_UNAVAILABLE:
        toast.dismiss();

        toast.error("Location information is unavailable. Refresh page.", {
          toastId: "ToastPositionUnavailableID",
          transition: Zoom,
          position: "top-center",
          autoClose: "false"
        });

        toast.clearWaitingQueue();
        break;

      case error.TIMEOUT:
        toast.dismiss();

        toast.error("The request to get user location timed out. Refresh page.", {
          toastId: "ToastTimeoutID",
          transition: Zoom,
          position: "top-center",
          autoClose: "false"
        });

        toast.clearWaitingQueue();
        break;

      case error.UNKNOWN_ERROR:
        toast.dismiss();

        toast.error("An unknown error occurred. Refresh page.", {
          toastId: "ToastUnknownErrorID",
          transition: Zoom,
          position: "top-center",
          autoClose: "false"
        });
        
        toast.clearWaitingQueue();
        break;
    }
  }

  getLocation();

  //  what does update results do ??
  return (
    <div className="input-page">
      <div className = "location-section">

        <div className="error">
          <button className = "error-btn" onClick={notify}>
            Error Test
          </button>
          <ToastContainer limit={3} autoClose={false} />
        </div>

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