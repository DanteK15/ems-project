import React, {useState, useEffect} from 'react'
import './Info.css'
import RoomIcon from '@material-ui/icons/Room';

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

        </div>
    )
}

export default Info
