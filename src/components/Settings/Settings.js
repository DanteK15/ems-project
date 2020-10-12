import React from 'react'
import './Settings.css'

function Settings() {
    return (
        <div className="settings-outer">
        <button className="back">Back</button>

        <div className="settings">
            <div className="settings-inputs-top">
                <h1 className="title">add hospital:</h1>
                <label className="settings-label">Hospital Name:</label>
                <input placeholder="Enter name here" />

                <label className="settings-label">Hospital Address:</label>
                <input placeholder="Enter name here" />       
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
                <div className="settings-inputs-bottom">

                </div>
            </div>
        </div>
        </div>
    )
}

export default Settings
