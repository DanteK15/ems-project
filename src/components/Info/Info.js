import React, {useState} from 'react'
import './Info.css'
import {Link} from 'react-router-dom'
import {useStateValue} from '../../StateProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

function Info() {

    const [{term}, dispatch] = useStateValue();

    const [address, setAddress] = useState('');
    // const [hospital, setHospital] = useState('');
    // const [helicopter, setHelicopter] = useState('');
    // const [time, setTime] = useState('');

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

    const notify = () => {
        toast.error("ERROR", {
            transition: Zoom,
            position: "top-center",
            autoClose: "false"
        });
      }


    return (
        <div className = "info-page">
            <div className = "reset">
            <Link to="/settings"><button className = "settings-btn">Settings</button></Link>

                <div className="error">
                    <button className ="reset-btn" onClick={notify}>
                        Error Test
                    </button>
                    <ToastContainer limit={1} autoClose={false} />
                </div>
                
                <button className = "reset-btn">Reset</button>
            </div>

            <div className = "location-section">
                <h1 className = "title">Patient Location:</h1>
                <br />
                <div className = "patient-location-section">
                    <img src = "../images/map_example.jpg" alt = ""/>
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

            <div className="centered">
            <div className = "menu-section">
                <h1 className = "title">Hospital Selection:</h1>
                    <br />
                        <form>
                            <select>
                                <option value = "providence"
                                >
                                    {term}

                                </option>
                                <option value = "legacy"
                                >Legacy</option>
                            </select>
                        </form>
            </div>

            <br />

            <div className = "menu-section">
                <h1 className = "title">Helicopter Site:</h1>
                    <br />
                        <form>
                            <select>
                                <option value = "site1">Site 1</option>
                                <option value = "site2">Site 2</option>
                            </select>
                        </form>
            </div>

            <br />

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
                <Link to="/results"><button className = "calculate-btn">Calculate</button></Link>
            </div> 
            </div>
        </div>
    )
}

export default Info
