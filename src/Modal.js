import React, {useState, useRef} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useStateValue} from './StateProvider'
import Modal2 from './Modal2';
import Modal3 from './Modal3'


function Modal({showModal, setShowModal}) {
    const [{term},dispatch] = useStateValue();
    const divRef = useRef(null);
    const divRef2 = useRef(null);
    const divRef3 = useRef(null);
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
        if(divRef.current) {
            divRef.current.style.display =''
        }
        setShowModal(true)
        setHospital(false)
        setHeli(false)
    }

    const closeModal = e => {
        if (divRef2.current === e.target) {
            setHospital(false)
            setHeli(false)
            setShowModal(false);
        } if(divRef3.current === e.target) {
            setHospital(false)
            setHeli(false)
            setShowModal(false);
        }
    };

    return (
        <>
        <div>
        {   showModal ? 
        <div className="background" onClick={closeModal} ref={divRef2}>
            <div className="modal" >
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
                            <AddLocationIcon className=""/>
                            <h3 onClick={handleHeliClick}>Add Helicopter Locations</h3>
                        </div>
                        <ArrowForwardIosIcon className="" onClick={handleClick} />
                    </span>
                </div>
            </div>
            </div>
            :null
        }
        </div>
        <div>
            {
                hospital ? 
                <div className="background" onClick={closeModal} ref={divRef3}>
                    <div className="modal"> 
                        <ArrowBackIosIcon onClick={goBack} />
                        <Modal2 />
                    </div> 
                </div>
                : heli ? 
                <div className="background" onClick={closeModal} ref={divRef3}>
                    <div className="modal">
                        <ArrowBackIosIcon onClick={goBack} />
                        <Modal3 />
                    </div> 
                </div>
                : null
                
            }
        </div>

        </>
    )
}

export default Modal