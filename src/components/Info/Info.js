import React, {useState, useEffect} from 'react'
import './Info.css'
import {Link} from 'react-router-dom'
import LocationMap from '../Maps/LocationMap'

function Info() {
    const [address, setAddress] = useState();

    useEffect(() => {
        localStorage.setItem('address',address);
    }, [address]);

    useEffect(() => {
        localStorage.getItem(address);
    }, []);

    const handleChange= (e) => {
        setAddress(e.target.value);
    }

    const showInput = () => {
        if(document.getElementById('show').style.visibility === 'hidden') {
            document.getElementById('show').style.visibility = 'visible';
        } else {
            document.getElementById('show').style.visibility = 'hidden';
        }
    }

    return (
        <div className = "info-page">
            <div className = "reset">
                <button className = "settings-btn"><Link to="/settings">Settings</Link></button>
                <button className = "reset-btn">Reset</button>
            </div>

            <div className = "location-section">
                <h1 className = "title">Patient Location:</h1>
                <br />
                <div className = "patient-location-section">
                    {/* <img src = "../images/map_example.jpg" alt = ""/> */}
                    <LocationMap />
                </div>

                <div className = "manual-address-input">
                    <button className = "manual-address-btn"
                    onClick={showInput}
                    >Manual Address Input</button>
                    <input 
                    type="text"
                    value={address}
                    id="show" 
                    placeholder="Enter Address Here ..." 
                    style={{visibility:'hidden'}}
                    onChange={handleChange}
                    />
                </div>
            </div>

            <div className = "menu-section">
                <h1 className = "title">Hospital Selection:</h1>
                <div className = "hospital-selection-section">
                    <br />
                        <form>
                            <select>
                                <option value = "ex1">Providence</option>
                                <option value = "ex2">Legacy</option>
                            </select>
                        </form>
                </div>
            </div>

            <div className = "menu-section">
                <h1 className = "title">Helicopter Site:</h1>
                <div className = "hospital-selection-section">
                    <br />
                        <form>
                            <select>
                                <option value = "ex1">Site 1</option>
                                <option value = "ex2">Site 2</option>
                            </select>
                        </form>
                </div>
            </div>

            <div className = "menu-section">
                <h1 className = "title">Estimated Patient Loading Time</h1>
                <br />
                        <form>
                            <select>
                                <option value = "ex1">5 minutes</option>
                                <option value = "ex2">10 minutes</option>
                                <option value = "ex2">15 minutes</option>
                            </select>
                        </form>
            </div> 
            <br />
            <div className = "calculate-section">
                <br />
                        <button className = "calculate-btn"><Link to="/results">Calculate</Link></button>
            </div> 

        </div>
    )
}

export default Info
