import React, {useState, useEffect} from 'react'
import {useStateValue} from '../Context/StateProvider'
import {actionTypes} from '../Context/reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';

function Modal3() {
    const [{locations},dispatch] = useStateValue();
    const [array, setArray] = useState([]);
    const [inputs, setInputs] = useState([
        {location: ''}
    ]);

    const handleChangeInput = (index, e) => {
        const values = [...inputs];
        values[index][e.target.name] = e.target.value;
        setInputs(values);
    }

    useEffect(() => {
        dispatch({
            type: actionTypes.SET_LOCATION,
            locations: array
        });
    }, [array, inputs])

    const handleSubmit = (e) => {
            e.preventDefault();
            if(e.target.value) {
            setInputs([{...e.target.value, location: ''}])
            setArray([...array, inputs]);
        } 

        dispatch({
            type: actionTypes.SET_LOCATION,
            locations: array
        });
    }

    const removeIt = (index, e) => {
        e.preventDefault();
        array.splice(index, 1);
        dispatch({
            type: actionTypes.SET_LOCATION,
            locations: array
        });
    }

    return (
        <div className="container">
           <form>
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                {inputs.map((input, index) => (
                    <div key={index} className="form">

                        <div className="inputs">
                            <label>Helicopter Location</label> <br /> <br />
                            <input
                                id = "hospital-location-entry"
                                name="location"
                                type="text"
                                value={input.location}
                                onChange={(e) => handleChangeInput(index, e)}
                            />
                            <div id="add-btn">
                                <button
                                    type="submit"
                                    value={input.location}
                                    onClick={handleSubmit}
                                    className="submit-btn"
                                >Add Location</button>
                            </div>
                            <br /><br />

                    </div>
                        </div>
                ))}
                
                <div>
                            {
                                array[0]?
                                <div className="input-list">
                                    {array.map((e, index) =>
                                    <div 
                                    key={index}
                                    className="display-btn">
                                        <button
                                        >{e[0].location}</button>
                                        <button
                                            id="remove-btn"
                                            onClick={e => removeIt(index,e)}
                                        >X</button>
                                    </div>
                                    )}    
                                </div>
                                
                                :null
                            }
                        </div>
            </form>
        </div>
    )
}

export default Modal3