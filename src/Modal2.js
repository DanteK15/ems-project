import React, {useState} from 'react'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'
import './Modal2.css'

function Modal2() {
    const [{term},dispatch] = useStateValue();
    const [inputs, setInputs] = useState([
        {name: '', location: ''}
    ]);

    const handleChangeInput = (index, e) => {
        const values = [...inputs];
        values[index][e.target.name] = e.target.value;
        setInputs(values);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: actionTypes.SET_TERM,
            term: inputs
        });

    }

    const handleAdd = () => {
        setInputs([...inputs, {name: '', location: ''}])
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
                {inputs.map((input, index) => (
                    <div key={index} className="form">
                        <div className="inputs">
                            <label>Hospital Name</label>
                            <input
                                name="name"
                                label="Hospital Name: "
                                value={input.name}
                                onChange={e => handleChangeInput(index, e)}
                            />

                            <label>Hospital Location</label>
                            <input
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

export default Modal2
