import React, {useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';
import SidebarOption from "./SidebarOption";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';

function Modal({showModal, setShowModal}) {
    const animate = useSpring({
        config: {duration:250},
        opacity: showModal? 1: 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
        position: 'fixed',
        top: 0,
        transition: '1s all ease'
    });

    return (
        <div>
        {
            showModal ? 
            <animated.div style={animate}>
            <div className="modal">
                <CloseIcon 
                    onClick={() => setShowModal(prev => !prev)}
                />

                <div className="sidebar-top">
                    <SettingsIcon />
                    <h2>Settings</h2>
                </div>



                {/* inputs here */}
                <div className={`modal-icons ${"modal-icons--active"}`}>
                    <span>
                        <div className="icon-title">
                            <LocalHospitalIcon className="icon-1"/>
                            <h3>Add Hospitals</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0"/>
                    </span>
                    <span>
                        <div className="icon-title-1">
                            <AddLocationIcon className="icon-2" />
                            <h3>Add Heli Dispatch Locations</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0"/>
                    </span>
                    <span>
                        <div className="icon-title-2">
                            <CreateIcon  className="icon-3" />
                            <h3>Add Estimations</h3>
                        </div>
                        <ArrowForwardIosIcon className="icon-0"/>
                    </span>
                </div>
                
            </div>
            </animated.div>            
            : null
        }
        </div>
    )
}

export default Modal
