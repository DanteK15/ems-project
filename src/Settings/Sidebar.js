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

function Sidebar() {
  const [openSettings, setOpenSettings] = useState(false);

  const showModal = () => {
    setOpenSettings(prev => !prev)
  }

  const resetPage = () => {
    // input section
    document.getElementById("available-hospitals").innerHTML = "Available Hospitals Nearby";
    document.getElementById("available-helicopters").innerHTML = "Available Helicopters Nearby";
    
    // result section
    document.getElementById("heli-eta-patient").innerHTML = "";
    document.getElementById("heli-eta-hospital").innerHTML = "";
    document.getElementById("ambulance-eta-hospital").innerHTML = "";
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