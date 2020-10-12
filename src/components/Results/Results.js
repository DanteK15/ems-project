import React from 'react'
import './Results.css'
import {Link} from 'react-router-dom'

function Results() {
    return (
        <div className="results-section">
        <button className="restart">Restart</button>

        <div className="results">
            <div className="results-output-section">
                <h1 className="title">Helicopter:</h1>
                <label className="ETA-to-patient-label">ETA to Patient:</label>
                <input placehodler=""/>
                <br />
                <label className="ETA-to-hospital-label">ETA to Hospital:</label>     
                <input placehodler=""/>
                <br />

                <h1 className="title">Ambulance:</h1>
                <label className="ETA-to-patient-label">ETA to Patient:</label>
                <input placehodler=""/>
                <br />
                <label className="ETA-to-hospital-label">ETA to Hospital:</label>
                <input placehodler=""/>
                <br />

                <div className = "navigate-section">
                    <img src = "../images/map_example.jpg" alt = ""/>
                </div>

                <div className = "back-section">
                <br />
                    <Link to="/"><button className = "back-btn">Back</button></Link>
                </div>

            </div>
        </div>
        </div>
    )
}

export default Results
