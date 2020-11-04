import React, {useState, useRef, useEffect} from 'react'
import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';

function Modal2() {
    const [{term},dispatch] = useStateValue();
    const [array, setArray] = useState([]);
    const [inputs, setInputs] = useState([
        {location: ''}
    ]);

    const btnRef = useRef(null);

    const handleChangeInput = (index, e) => {
        const values = [...inputs];
        values[index][e.target.name] = e.target.value;
        setInputs(values);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            if(e.target.value) {
            setInputs([{...e.target.value, location: ''}])
            setArray([...array, inputs]);
        } 

        dispatch({
            type: actionTypes.SET_TERM,
            term: array
        });
    }

    const handleRemove = (index) => {
        // if(inputs.length > 1) {
        //     const values = [...inputs];
        //     values.splice(index, 1);
        //     setInputs(values);
        // }

        if(array.length > 1) {
            const vals = [...array];
            vals.splice(index, 1);
            setArray(vals)
        }

        if(btnRef.current) {
            btnRef.current.style.display = 'none';
        }
    }

    return (
        <div className="container">
            {/* onSubmit={handleSubmit} */}
            <form>
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                {inputs.map((input, index) => (
                    <div key={index} className="form">

                        <div className="inputs">
                            <label>Hospital Address</label> <br />
                            <input
                                id = "hospital-location-entry"
                                name="location"
                                type="text"
                                value={input.location}
                                onChange={(e) => handleChangeInput(index, e)}
                            />
                            
                            <button
                                type="submit"
                                value={input.location}
                                onClick={handleSubmit}
                                className="submit-btn"
                            >Add hospital</button>
                    </div>
                        </div>
                ))}
                {/* <button
                value={input.location}
                onClick={e => handleSubmit(e)}
                className="submit-btn"
                >Add hospital</button> */}
                
                <div>
                            {
                                array[0]?
                                <div className="input-list">
                                    {array.map(e =>
                                    <button>{e[0].location}</button>
                                    )}
                                    
                                    
                                </div>
                                
                                :null
                            }
                        </div>
            </form>
        </div>
    )
}

export default Modal2
