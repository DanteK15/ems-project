// import React, {useState} from 'react'
// import {useStateValue} from '../Context/StateProvider'
// import {actionTypes} from '../Context/reducer'
// import './Modal2.css'
// import SettingsIcon from '@material-ui/icons/Settings';

// function Modal2() {
//     const [{term},dispatch] = useStateValue();
//     const [inputs, setInputs] = useState([
//         {name: '', location: ''}
//     ]);

//     const handleChangeInput = (index, e) => {
//         const values = [...inputs];
//         values[index][e.target.name] = e.target.value;
//         setInputs(values);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch({
//             type: actionTypes.SET_TERM,
//             term: inputs
//         });

//     }

//     const handleAdd = () => {
//         setInputs([...inputs, {name: '', location: ''}])
//     }

//     const handleRemove = (index) => {
//         if(inputs.length > 1) {
//             const values = [...inputs];
//             values.splice(index, 1);
//             setInputs(values);
//         }
//     }

//     return (
//         <div className="container">
//             <form onSubmit={handleSubmit} >
//                 <div className="sidebar-top">
//                     <SettingsIcon className="settings-icon-0" />
//                     <h2>Settings</h2>
//                 </div>
//                 {inputs.map((input, index) => (
//                     <div key={index} className="form">

//                         <div className="inputs">
//                             <label>Hospital Name</label>
//                             <input
//                                 id = "hospital-name-entry"
//                                 name="name"
//                                 label="Hospital Name: "
//                                 value={input.name}
//                                 onChange={e => handleChangeInput(index, e)}
//                             />

//                             <label>Hospital Location</label>
//                             <input
//                                 id = "hospital-location-entry"
//                                 name="location"
//                                 label="Hospital Location: "
//                                 value={input.location}
//                                 onChange={e => handleChangeInput(index, e)}
//                             />
//                                                     <br /> <br /> <br />

//                         </div>

//                         <div className="edit">
//                             <button
//                             onClick={()=> handleAdd()}
//                             >+</button>
//                             <button
//                             onClick={() => handleRemove(index)}
//                             >-</button>
//                         </div>
//                     </div>
//                 ))}
//                 <button
//                 onClick={handleSubmit}
//                 className="submit-btn"
//                 >Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Modal2
import React, {useState, useRef, useEffect} from 'react'
import {useStateValue} from '../Context/StateProvider'
import {actionTypes} from '../Context/reducer'
import './Modal2.css'
import SettingsIcon from '@material-ui/icons/Settings';

function Modal2() {
    const [{term},dispatch] = useStateValue();
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
            type: actionTypes.SET_TERM,
            term: array
        });
    }, [array, inputs])

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

    const removeIt = (index, e) => {
        e.preventDefault();
        array.splice(index, 1);
        dispatch({
            type: actionTypes.SET_TERM,
            term: array
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
                            <label>Hospital Address</label> <br /> <br/>
                            <input
                                id = "hospital-location-entry"
                                name="location"
                                type="text"
                                value={input.location}
                                onChange={(e) => handleChangeInput(index, e)}
                            />
                            <br /><br />
                            <div id="add-btn">
                            <button
                                type="submit"
                                value={input.location}
                                onClick={handleSubmit}
                                className="submit-btn"
                            >Add hospital</button>
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

export default Modal2