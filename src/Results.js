import React from "react";
import "./Results.css";
import { Icon } from '@iconify/react';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import ambulanceIcon from '@iconify/icons-fa/ambulance';

function Results() {
  return (
    <div className="results">
        <h2
        style={{color: 'gray', textTransform:'uppercase', letterSpacing: '2px',
      marginBottom:'15px'
      }}
        >Results</h2>

      <div className="results__helicopterResultsContainer">
        <div className="icon-container">
          <Icon icon={helicopterIcon} width = "40" height = "40"
          className="heli"
          />
          <h2>Helicopter</h2>
        </div>

        <h3>ETA to Patient</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>

        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
      </div>

      <div className="results__ambulanceResultsContainer">
        <div className="icon-container">
          <Icon icon={ambulanceIcon} width = "40" height = "40"
          className="ambulance"
          />
          <h2>Ambulance</h2>
        </div>

        <h3>ETA to Patient</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
      </div>

    </div>
  );
}

export default Results;