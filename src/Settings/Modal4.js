import React, {useState} from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import {useStateValue} from '../Context/StateProvider'
import {actionTypes} from '../Context/reducer'

function Modal4() {
    const [, dispatch] = useStateValue();
    const [helicopter_speed, setHelicopter_speed] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (helicopter_speed) {
            dispatch({
                type: actionTypes.SET_PARAMS,
                helicopter_speed: helicopter_speed 
            });
            document.getElementById("submitSpeedNotif").innerHTML = "Helicopter speed successfully updated.";
        }
    }

    return (
        <div className="container">
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                <label>Helicopter speed (miles/hr) </label>
                <br />
                <br />
                <input type="number" placeholder = "120" onChange={e => setHelicopter_speed(e.target.value)} required/>
                <button type="submit"
                onClick={handleSubmit}
                >Submit</button>
                <br />
                <br />
                <br />
                <label id = "submitSpeedNotif"></label>
        </div>
    )
}

export default Modal4
