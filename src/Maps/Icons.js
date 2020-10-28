import React from "react";
import { Icon } from '@iconify/react';
import mapMarkerAlt from '@iconify/icons-fa-solid/map-marker-alt';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import hospitalMarker from '@iconify/icons-mdi/hospital-marker';


export const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={mapMarkerAlt} height='2em' color='#32424d' className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

export const HospitalPin = ({ text }) => (
  <div className="pin">
    <Icon icon={hospitalMarker} height='2em' color='#ed1b2e' className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

export const HelicopterPin = ({ text }) => (
  <div className="pin">
    <Icon icon={helicopterIcon} height='2em' className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)