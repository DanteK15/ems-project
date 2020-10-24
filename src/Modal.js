import React, {useState, useRef, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';
import SidebarOption from "./SidebarOption";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import Results from './Results.js'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Modal({showModal, setShowModal}) {
    const divRef = useRef(null);
    const [hospital, setHospital] = useState(false)
    const [heli, setHeli] = useState(false);
    const [estimates, setEstimates] = useState(false);

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

    const goBack = () => {
        divRef.current.style.display = ''
        setHospital(false)
        setHeli(false);
        setEstimates(false);
    }

    const handleHeli = () => {
        divRef.current.style.display = ''
        setHeli(true);
    }

    const handleEstimates = () => {
        divRef.current.style.display = ''
        setEstimates(true);
    }

    return (
        <>
        <div>
        {
            showModal ? 
            <animated.div style={animate}>
            <div className="modal">
                <CloseIcon 
                    onClick={() => setShowModal(prev => !prev)}
                />

                <div className="sidebar-top">
                    <SettingsIcon
                    className="settings-icon-0"
                    />
                    <h2>Settings</h2>
                </div>

                {/* inputs here */}
                <div 
                ref={divRef}
                className={`modal-icons ${"modal-icons--active"}`} id="inputs">
                    <span
                    >
                        <div className="icon-title">
                            <LocalHospitalIcon className="icon-1"/>
                            <h3
                                onClick={handleClick}
                            >Add Hospitals</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0"
                            onClick={handleClick}
                        />
                    </span>
                    <span>
                        <div className="icon-title-1">
                            <AddLocationIcon className="icon-2" />
                            <h3
                                onClick={handleHeli}
                            >Add Heli Dispatch Locations</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0"
                            onClick={handleHeli}
                        />
                    </span>
                    <span>
                        <div className="icon-title-2">
                            <CreateIcon  className="icon-3" />
                            <h3
                                onClick={handleEstimates}
                            >Add Estimations</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0" 
                        onClick={handleEstimates}/>
                    </span>
                </div>
            </div>
            </animated.div>            
            : null
        }
        </div>

{/* add current.focus on the input fields + ability to add more */}
        <div>
            {
                hospital ? 
                <div className="modal"> 
                <ArrowBackIosIcon onClick={goBack} />
                <div className="modal-2">
                    <h1>Add Hospital</h1> <br /> <br /> <br />
                    <label>Hospital Name</label>
                    <input type="text" id="name" placeholder="Add hospital name here"/>
                    <br /> <br /> < br/>
                    <label>Hospital Address</label>
                    <input type="text" id="address" placeholder="Add hospital address here" />

                </div>
                </div>:
                heli?
                <div className="modal">
                    <ArrowBackIosIcon onClick={goBack} />
                    <div className="modal-2">
                    <h1>HELI</h1>
                    </div>
                </div>
                :
                estimates ? 
                <div className="modal">
                    <ArrowBackIosIcon onClick={goBack} />
                    <div className="modal-2">
                    <h1>estimates</h1>
                    </div>
                </div>

                : null
                
            }
        </div>

        </>
    )
}

export default Modal
