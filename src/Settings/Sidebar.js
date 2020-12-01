// import React, {useState} from "react";
// import "./Sidebar.css";
// import SettingsIcon from '@material-ui/icons/Settings';
// import SidebarOption from "./SidebarOption";
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import AddLocationIcon from '@material-ui/icons/AddLocation';
// import CreateIcon from '@material-ui/icons/Create';
// import Modal from './Modal';

// function Sidebar() {
//   const [openSettings, setOpenSettings] = useState(false);

//   const showModal = () => {
//     setOpenSettings(prev => !prev)
//   }

//   // on click it's going to open the page 
//   return (
//     <div className="sidebar">
//       <SettingsIcon className="settings-icon" 
//       onClick={showModal}
//       />
 
//        <Modal showModal={openSettings} 
//        setShowModal={setOpenSettings}
//        />
//     </div>
//   );
// }

// export default Sidebar;

import React, {useState} from "react";
import "./Sidebar.css";
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import SidebarOption from "./SidebarOption";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CreateIcon from '@material-ui/icons/Create';
import Modal from './Modal';
import {useStateValue} from "../Context/StateProvider";

function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);
  const [{ gmaps, patientLocal, polyline, directionsRenderer, ambulanceMarker, helicopterMarker}] = useStateValue();


    const showModal = () => {
    setOpenSettings(prev => !prev)
  }

  const resetPage = () => {
    // input section
    document.getElementById("available-hospitals").innerHTML = "Available Hospitals";
    document.getElementById("available-helicopters").innerHTML = "Available Helicopters";
    
    // result section
    document.getElementById("heli-eta-patient").innerHTML = "";
    document.getElementById("heli-eta-hospital").innerHTML = "";
    document.getElementById("ambulance-eta-hospital").innerHTML = "";

    var elements = document.getElementsByClassName('results-container');
	    for(var i = 0; i < elements.length; i++){
		    elements[i].style.backgroundColor = "#f5f8fa";
    }
    
    var elements = document.getElementsByClassName('results-container-2'); 
	    for(var i = 0; i < elements.length; i++){
		    elements[i].style.backgroundColor = "#f5f8fa";
	  }
    //reset the LocationMap
    var recenter = {};
    if(patientLocal!=null) {
      recenter = {lat: patientLocal.geometry.lat, lng:patientLocal.geometry.lng};
    }
    //Default center set to Portland
    else {
      recenter = { lat: 45.523062, lng: -122.676482 };
    }
    polyline.setMap(null);
    directionsRenderer.setMap(null);
    ambulanceMarker.setPosition(null);
    helicopterMarker.setPosition(null);
    gmaps.map.setZoom(10);
    gmaps.map.setCenter(recenter);
  }

  // on click it's going to open the page 
  return (
    <div className="sidebar">
      <SettingsIcon className="settings-icon" 
      onClick={showModal}
      />
      <RefreshIcon className = "reset-icon"
      onClick = {resetPage}
      />
 
       <Modal showModal={openSettings} 
       setShowModal={setOpenSettings}
       />
    </div>
  );
}

export default Sidebar;