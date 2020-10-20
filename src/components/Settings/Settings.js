import React, { useState } from 'react'
import './Settings.css'
import {Link} from 'react-router-dom'
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

function Settings() {
    const [name, setName] = useState('');
    // state & dispatch to shoot actions to data layer
    const [{term}, dispatch] = useStateValue();

    const handleChange = (e) => {
        // dispatches an action
        setName(e.target.value);

        dispatch({
            type: actionTypes.SET_TERM,
            term: name
        });
    }

    const notify = () => {
        toast.error("ERROR", {
            transition: Zoom,
            position: "top-center",
            autoClose: "false"
        });
    }

    return (
        <div className="settings-outer">
        <Link to="/"><button className="back">Back</button></Link>

        <div className="error">
            <button className ="error-btn" onClick={notify}>
                Error Test
            </button>
            <ToastContainer limit={1} autoClose={false} />
        </div>

        <div className="settings">
            <div className="settings-inputs-top">
                <h1 className="title">add hospital:</h1>
                <label className="settings-label">Hospital Name:</label>
                <input placeholder="Enter name here"
                onChange={handleChange}
                />

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
                        type="submit"
                        onClick={handleChange}
                        >Submit
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
