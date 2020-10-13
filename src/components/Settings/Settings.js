import React from 'react'
import './Settings.css'
import {Link} from 'react-router-dom'

function Settings() {
    return (
        <div className="settings-outer">
        <Link to="/"><button className="back">Back</button></Link>

        <div className="settings">
            <div className="settings-inputs-top">
                <h1 className="title">add hospital:</h1>
                <label className="settings-label">Hospital Name:</label>
                <input placeholder="Enter name here" />

                <label className="settings-label">Hospital Address:</label>
                <input placeholder="Enter address here" />       
                <div className="settings-checkbox">
                    <input type="checkbox"/>
                    <label className="settings-label">Helicopter Access?</label>
                </div>
                <div className="btn-div">
                    <div></div>
                    <button
                        className="submit-btn"
                        type="submit">Submit
                    </button>
                </div>
                <br />
                <div className="horizontal"></div>
                <br />
                <div className="settings-inputs-middle">
                    <h1 className="title">add Helicopter dispatch locations:</h1>
                    <label className="settings-label-middle">Helipad name:</label>
                    <input placeholder="Enter name here" />

                    <label className="settings-label-middle">Helipad Address:</label>
                    <input placeholder="Enter address here" />

                    <div className="btn-div">
                    <div></div>
                    <button
                        className="submit-btn"
                        type="submit">Submit
                    </button>
                    </div>
                    <br />
                    <div className="horizontal"></div>
                    <br />
                </div>

                <div className="settings-inputs-bottom">
                    <h1 className="title">Time Estimations:</h1>
                    <label className="settings-label-bottom">Ambulance arrives at hospital 
                        to patient reaches ER:</label>
                    <input placeholder="Enter estimation here" />

                    <label className="settings-label-bottom">Helicopter arrives at hospital
                        to patient reaches ER:</label>
                    <input placeholder="Enter estimation here" />

                    <label className="settings-label-bottom">Time it takes helicopter to get 
                        ready and takeoff from helipad:</label>
                    <input placeholder="Enter estimation here" />

                    <label className="settings-label-bottom">Time to meet helicopter where
                        it lands:</label>
                    <input placeholder="Enter estimation here" />

                    <label className="settings-label-bottom">Time to get patient ready 
                        for departure:</label>
                    <input placeholder="Enter estimation here" />

                    <div className="btn-div">
                    <div></div>
                    <button
                        className="submit-btn"
                        type="submit">Submit
                    </button>
                    </div>
                    <br />
                    <div className="horizontal"></div>
                    <br />
                </div>

            </div>
        </div>
        </div>
    )
}

export default Settings
