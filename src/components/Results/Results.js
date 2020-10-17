import React from 'react'
import './Results.css'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

function Results() {

    const notify = () => {
        toast.error("ERROR", {
            transition: Zoom,
            position: "top-center",
            autoClose: "false"
        });
      }

    return (
        <div className="results-section">
        <button className="restart">Restart</button>

        <div className="error">
            <button className ="error-button" onClick={notify}>
                Error Test
            </button>
            <ToastContainer limit={1} autoClose={false} />
        </div>

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
