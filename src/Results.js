import React from "react";
import "./Results.css";
import { Icon } from '@iconify/react';
import helicopterIcon from '@iconify/icons-mdi/helicopter';
import ambulanceIcon from '@iconify/icons-fa/ambulance';

function Results() {
  return (
    <div className="results">

      <div className="results__resultsContainer">
        <h2>Results</h2>
      </div>

      <div className="results__helicopterResultsContainer">
        <Icon icon={helicopterIcon} width = "40" height = "40" />
        <h2>Helicopter</h2>
        <br />
        <br />
        <h3>ETA to Patient</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
        <br />
        <br />
        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
      </div>

      <div className="results__ambulanceResultsContainer">
        <Icon icon={ambulanceIcon} width = "40" height = "40"/>
        <h2>Ambulance</h2>
        <br />
        <br />
        <h3>ETA to Patient</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
        <br />
        <br />
        <h3>ETA to Hospital</h3>
        <div className="results__input">
          <input placeholder="Estimated Time" type="text" />
        </div>
      </div>

    </div>
  );
}

export default Results;