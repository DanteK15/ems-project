import React from "react";
import "./Sidebar.css";
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarOption from "./SidebarOption";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CreateIcon from '@material-ui/icons/Create';

function Sidebar() {
  return (
    <div className="sidebar">
      <SettingsIcon className="sidebar__settingsIcon" />
      <SidebarOption Icon={LocalHospitalIcon} text="Add Hospitals" />
      <SidebarOption Icon={AddLocationIcon} text="Add Heli Dispatch Locations" />
      <SidebarOption Icon={CreateIcon} text="Add Estimations" />
    </div>
  );
}

export default Sidebar;