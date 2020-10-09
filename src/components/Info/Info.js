import React, {useState, useEffect} from 'react'
import './Info.css'

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
                <h1 className = "title">Patient Location:</h1>
                <br />
                <div className = "patient-location-section">
                    <img src = "../images/map_example.jpg" alt = ""/>
                </div>

                <div className = "manual-address-input">
                    <button className = "manual-address-btn">Manual Address Input</button>
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

            <div className = "calculate-section">
                <br />
                        <button className = "calculate-btn">Calculate</button>
            </div> 

        </div>
    )
}

export default Info
