import React, {useState, useEffect} from 'react'
import './Info.css'
import RoomIcon from '@material-ui/icons/Room';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CommuteIcon from '@material-ui/icons/Commute';

function Info() {
    const [address, setAddress] = useState();
// setter
    useEffect(() => {
        localStorage.setItem('address',address);
    }, [address]);
//getter
    useEffect(() => {
        localStorage.getItem(address);
    }, []);

    const handleChange= (e) => {
        setAddress(e.target.value);
    }

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
                        <input placeholder = "Enter address here" value={address}
                        onChange={handleChange} type="text"
                        />
                        {/* <input type="submit" value={address}
                        onChange={handleChange} /> */}
                        <hr />
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <div className = "hospital-section">
                <h1 className = "title">Hospital Selection:</h1>
                <br />
                <div className = "hospital-selection-section">
                    <LocalHospitalIcon 
                        className = "hospital-icon"
                        style = {{color:'blue'}}
                    />
                    <div className = "drop-down-section">
                        <form>
                            <select>
                                <option value = "ex1">Providence</option>
                                <option value = "ex2">Legacy</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
            <div className = "helicopter-section">
                <h1 className = "title">Helicopter Landing Selection:</h1>
                <br />
                <div className = "helicopter-selection-section">
                    <CommuteIcon 
                        className = "helicopter-icon"
                        style = {{color:'green'}}
                    />
                    <div className = "drop-down-section">
                        <form>
                            <select>
                                <option value = "ex3">Landing Site 1</option>
                                <option value = "ex4">Landing Site 2</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Info
