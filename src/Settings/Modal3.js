import React, {useState, useEffect} from 'react'
import {useStateValue} from '../Context/StateProvider'
import {actionTypes} from '../Context/reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';
import AutoComplete from '../Maps/AutoComplete';
import isEmpty from 'lodash/isEmpty';
import * as errorMessage from '../Input/error.js';

function Modal3() {
    const [{ gmaps, helicopters}, dispatch] = useStateValue();
    const [helicopter, setHelicopter] = useState();

    const newHelicopter = (place) => {
        setHelicopter(place);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (helicopter) {
            console.log(helicopter.name)
            dispatch({
                type: actionTypes.SET_HELIS,
                helicopter: helicopter 
            });
        }
        // no such helicopter location found or bad address input, show toast error message
        else {
            errorMessage.toast.error(
                "No such helicopter location found, Verify correct location input and select location from the drop down", 
                errorMessage.errorOptions);
        }
    }

    const removeIt = (index, e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.DEL_HELI,
            index: index
        });
    }

    return (
        <div className="container">
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                 <div className="form">
                    <div className="inputs">
                        <label>Helicopter Address</label> <br /> <br />
                        {!isEmpty(gmaps) &&
                            <AutoComplete
                                map={gmaps.map}
                                mapApi={gmaps.maps}
                                newPlace={newHelicopter}
                                id='hospital-location-entry'
                                name='helicopter-location'
                            />}
                        <br /><br />
                        <div id="add-btn">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="submit-btn"
                            >Add helicopter</button>
                        </div>
                        <br /><br />
                    </div>
                </div>
                {
                    !isEmpty(helicopters) &&
                    (<div className="input-list">
                        {helicopters.map((e, index) =>
                            <div
                                key={index}
                                className="display-btn">
                                <button
                                >{e.name}</button>
                                <button
                                    id="remove-btn"
                                    onClick={e => removeIt(index, e)}
                                >X</button>
                            </div>
                        )}
                    </div>
                    )
                }               
        </div>
    )
}

export default Modal3