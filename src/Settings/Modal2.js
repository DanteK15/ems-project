import React, { useState, useRef, useEffect } from 'react'
import { useStateValue } from '../Context/StateProvider'
import { actionTypes } from '../Context/reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';
import AutoComplete from '../Maps/AutoComplete';
import isEmpty from 'lodash/isEmpty';

function Modal2() {
    const [{ gmaps, hospitals }, dispatch] = useStateValue();
    const [hospital, setHospital] = useState();

    const newHospital = (place) => {
        setHospital(place);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (hospital) {
            console.log(hospital.name)
            dispatch({
                type: actionTypes.SET_HOSP,
                hospital: hospital
            });
        }
        // TODO: else throw error, no such hospital found
    }

    const removeIt = (index, e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.DEL_HOSP,
            index: index
        });
    }

    return (
        <div className="container">
            <form>
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                <div className="form">
                    <div className="inputs">
                        <label>Hospital Address</label> <br /> <br />
                        {!isEmpty(gmaps) &&
                            <AutoComplete
                                map={gmaps.map}
                                mapApi={gmaps.maps}
                                newPlace={newHospital}
                                id='hospital-location-entry'
                                name='hospital-location'
                            />}
                        <br /><br />
                        <div id="add-btn">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="submit-btn"
                            >Add hospital</button>
                        </div>
                        <br /><br />
                    </div>
                </div>
                {
                    !isEmpty(hospitals) &&
                    (<div className="input-list">
                        {hospitals.map((e, index) =>
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
            </form>
        </div>
    )
}

export default Modal2