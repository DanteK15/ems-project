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
                <div className="settings-inputs-bottom">
                    <h1 className="title">add Helicopter dispatch locations:</h1>
                    <label className="settings-label-bottom">Helipad name:</label>
                    <input placeholder="Enter name here" />

                    <label className="settings-label-bottom">Helipad Address:</label>
                    <input placeholder="Enter name here" />

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

                <h1 className="title">time estimations:</h1>

            </div>
        </div>
        </div>
    )
}

export default Settings
