import React, {useState, useEffect} from 'react'
import {useStateValue} from '../Context/StateProvider'
import {actionTypes} from '../Context/reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';
import AutoComplete from '../Maps/AutoComplete';
import isEmpty from 'lodash/isEmpty';

function Modal3() {
    const [{ gmaps, helicopters}, dispatch] = useStateValue();
    const [helicopter, setHelicopter] = useState();

    const newHelicopter= (place) => {
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
        // TODO: else throw error, no such helicopter found
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
           <form>
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
            </form>
        </div>
    )
}

export default Modal3