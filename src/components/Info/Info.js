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
                <br />
                <br />

                <div className = "manual-address-input">
                    <button className = "manual-address-btn">Manual Address Input</button>
                </div>

            </div>

            <br />
            <br />
            <br />

            <div className = "hospital-section">
                <h1 className = "title">Hospital Selection:</h1>
                <br />
                <div className = "hospital-selection-section">
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

            <div className = "helicopter-section">
                <h1 className = "title">Helicopter Site:</h1>
                <br />
                <div className = "helicopter-section">
                    <div className = "drop-down-section">
                        <form>
                            <select>
                                <option value = "ex1">Site 1</option>
                                <option value = "ex2">Site 2</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>

            <br />
            <br />

            <div className = "loading-time-section">
                <h1 className = "title">Estimated Patient Loading Time</h1>
                <br />
                <div className = "drop-down-section">
                        <form>
                            <select>
                                <option value = "ex1">5 minutes</option>
                                <option value = "ex2">10 minutes</option>
                                <option value = "ex2">15 minutes</option>
                            </select>
                        </form>
                </div>
            </div>

            <br />
            <br />

            <div className = "estimated-heli-time-section">
                <h1 className = "title">Estimated Time to Helicopter</h1>
                <br />
                <div className = "helicopter-section">
                    <div className = "input-section">
                        <input placeholder = "(leave blank if none)" value={address}
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

            <div className = "calculate-section">
                <br />
                <br />
                <div className = "calculate-section">
                        <button className = "calculate-btn">Calculate</button>
                </div>
            </div>

        </div>
    )
}

export default Info
