import React from 'react'
import './Info.css'
import RoomIcon from '@material-ui/icons/Room';

function Info() {
    return (
        <div className = "info-page">
            <div className = "reset">
                <button className = "settings-btn">Settings</button>
                <button className = "reset-btn">Reset</button>
            </div>

            <div className = "location-section">
                <h1 className = "title">patient location:</h1>
                <br />
                <div className = "patient-location-section">
                    <RoomIcon 
                        className = "map-icon"
                        style = {{color:'red'}}
                    />
                    <div className = "input-section">
                        <label>Coordinates: </label>
                        <br />
                        <input placeholder = "Coordinates" />
                        <hr />

                        <br />

                        <label>Address: </label> <br />
                        <input placeholder = "Enter address here"/>
                        <hr />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Info
