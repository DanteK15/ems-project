import React, {useState, useRef} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useStateValue} from './StateProvider'
import Modal2 from './Modal2';
import Modal3 from './Modal3'


function Modal({showModal, setShowModal}) {
    const [{term},dispatch] = useStateValue();
    const divRef = useRef(null);
    const [hospital, setHospital] = useState(false);
    const [heli, setHeli] = useState(false);
    // trying something new 
    const [inputFields, setInputFields] = useState([{name: ''}]);

    const animate = useSpring({
        config: {duration:250},
        opacity: showModal? 1: 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
        position: 'fixed',
        top: 0,
        transition: '1s all ease'
    });

    const handleClick = () => {
        divRef.current.style.display = 'none'
        setHospital(true);
    }

    const handleHeliClick = () => {
        divRef.current.style.display = 'none'
        setHeli(true);
    }

    const goBack = () => {
        divRef.current.style.display = ''
        setHospital(false)
        setHeli(false)
    }

    return (
        <>
        <div>
        {   showModal ? 
            <animated.div style={animate}>
            <div className="modal">
                <CloseIcon onClick={() => setShowModal(prev => !prev)} />
                <div className="sidebar-top">
                    <SettingsIcon className="settings-icon-0" />
                    <h2>Settings</h2>
                </div>
                {/* hospitals */}
                <div ref={divRef} className={`modal-icons ${"modal-icons--active"}`} id="inputs">
                    <span>
                        <div className="icon-title">
                            <LocalHospitalIcon className="icon-1"/>
                            <h3 onClick={handleClick}>Add Hospitals</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0" onClick={handleClick} />
                    </span>
                {/* helicopters */}
                    <span>
                        <div className="icon-title">
                            <LocalHospitalIcon className="icon-1"/>
                            <h3 onClick={handleHeliClick}>Add Heli</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0" onClick={handleClick} />
                    </span>
                </div>
            </div>
            </animated.div>            
            :null
        }
        </div>

{/* add current.focus on the input fields + ability to add more */}
        <div>
            {
                hospital ? 
                <div className="modal"> 
                <ArrowBackIosIcon onClick={goBack} />
                <Modal2 />
                {/* <div className="modal-2">
                    <h1>Add Hospital</h1> <br /> <br /> <br />
                    <label>Hospital Name</label>
                    <input 
                    type="text" 
                    id="name" 
                    value={name}
                    placeholder="Add hospital name here"
                    onChange={handleChange}
                    />
                    <button 
                        className="submit-btn"
                    onClick={pushData}>Submit</button>
                </div> */}

                </div> 
                : heli ? 
                <div className="modal">
                    <ArrowBackIosIcon onClick={goBack} />
                    <Modal3 />
                </div> : null
                
            }
        </div>

        </>
    )
}

export default Modal
