import React, {useState} from 'react'
import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';

function Modal3() {
    const [{location},dispatch] = useStateValue();
    const [inputs, setInputs] = useState([
        {location: ''}
    ]);

    const handleChangeInput = (index, e) => {
        const values = [...inputs];
        values[index][e.target.name] = e.target.value;
        setInputs(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_LOCATION,
            locations: inputs
        });

    }

    const handleAdd = () => {
        setInputs([...inputs, {location: ''}])
    }

    const handleRemove = (index) => {
        if(inputs.length > 1) {
            const values = [...inputs];
            values.splice(index, 1);
            setInputs(values);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} >
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                {inputs.map((input, index) => (
                    <div key={index} className="form">

                        <div className="inputs">
                            <label>Location</label>
                            <input
                                id = "hospital-location-entry"
                                name="location"
                                label="Hospital Location: "
                                value={input.location}
                                onChange={e => handleChangeInput(index, e)}
                            />
                            <br /> <br /> <br />

                        </div>

                        <div className="edit">
                            <button
                            onClick={()=> handleAdd()}
                            >+</button>
                            <button
                            onClick={() => handleRemove(index)}
                            >-</button>
                        </div>
                    </div>
                ))}
                <button
                onClick={handleSubmit}
                className="submit-btn"
                >Submit</button>
            </form>
        </div>
    )
}

export default Modal3
