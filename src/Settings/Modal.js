// import React, {useState, useRef} from 'react'
// import {useSpring, animated} from 'react-spring'
// import './modal.css'
// import CloseIcon from '@material-ui/icons/Close';
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import SettingsIcon from '@material-ui/icons/Settings';
// import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
// import {useStateValue} from '../Context/StateProvider'
// import AutoComplete from '../Maps/AutoComplete'
// import Modal2 from './Modal2';


// function Modal({showModal, setShowModal}) {
//     const [{term},dispatch] = useStateValue();
//     const [name, setName] = useState([])
//     const divRef = useRef(null);
//     const [hospital, setHospital] = useState(false);
//     // trying something new 
//     const [inputFields, setInputFields] = useState([{name: ''}]);

//     const animate = useSpring({
//         config: {duration:250},
//         opacity: showModal? 1: 0,
//         transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
//         position: 'fixed',
//         top: 0,
//         transition: '1s all ease'
//     });

//     const handleClick = () => {
//         divRef.current.style.display = 'none'
//         setHospital(true);
//     }

//     const goBack = () => {
//         divRef.current.style.display = ''
//         setHospital(false)
//     }

//     const handleChange =(e) =>{}
//     const pushData = (e) => {}

//     const newHospital = (place) => {
//         console.log(place);
//     }

//     return (
//         <>
//         <div>
//         {   showModal ? 
//             <animated.div style={animate}>
//             <div className="modal">
//                 <CloseIcon onClick={() => setShowModal(prev => !prev)} />
//                 <div className="sidebar-top">
//                     <SettingsIcon className="settings-icon-0" />
//                     <h2>Settings</h2>
//                 </div>
//                 <div ref={divRef} className={`modal-icons ${"modal-icons--active"}`} id="inputs">
//                     <span>
//                         <div className="icon-title">
//                             <LocalHospitalIcon className="icon-1"/>
//                             <h3 onClick={handleClick}>Add Hospitals</h3>
//                         </div>
//                         <ArrowForwardIosIcon className="icon-0" onClick={handleClick} />
//                     </span>
//                 </div>
//             </div>
//             </animated.div>            
//             : null
//         }
//         </div>

//         <div>
//             {
//                 hospital ? 
//                 <div className="modal"> 
//                 <ArrowBackIosIcon onClick={goBack} />
//                 <Modal2 />
                

//                 </div> 
//                 : null
                
//             }
//         </div>

//         </>
//     )
// }

// export default Modal

import React, {useState, useRef} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useStateValue} from '../Context/StateProvider'
import Modal2 from './Modal2';
import Modal3 from './Modal3'
import Modal4 from './Modal4'

function Modal({showModal, setShowModal}) {
    // const [{term},dispatch] = useStateValue();
    const divRef = useRef(null);
    const divRef2 = useRef(null);
    const divRef3 = useRef(null);
    const [hospital, setHospital] = useState(false);
    const [heli, setHeli] = useState(false);
    const [param, setParam] = useState(false);
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

    const handleParams = () => {
        divRef.current.style.display = 'none'
        setParam(true);
    }

    const goBack = () => {
        if(divRef.current) {
            divRef.current.style.display =''
        }
        setShowModal(true)
        setHospital(false)
        setHeli(false)
        setParam(false);
    }

    const closeModal = e => {
        if (divRef2.current === e.target) {
            setHospital(false)
            setHeli(false)
            setShowModal(false);
            // 
            setParam(false);
        } if(divRef3.current === e.target) {
            setHospital(false)
            setHeli(false)
            setShowModal(false);
            setParam(false);
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
                        {/* <ArrowForwardIosIcon className="icon-0" onClick={handleClick} /> */}
                    </span>
                {/* helicopters */}
                    <span>
                        <div className="icon-title">
                            <AddLocationIcon className="icon-1"/>
                            <h3 onClick={handleHeliClick}>Add Helicopters</h3>
                        </div>
                        {/* <ArrowForwardIosIcon className="icon-0" onClick={handleHeliClick} /> */}
                    </span>
                {/* params */}
                    <span>
                        <div className="icon-title">
                            <AddLocationIcon className="icon-1"/>
                            <h3 onClick={handleParams}>Helicopter Speed</h3>
                        </div>
                        {/* <ArrowForwardIosIcon className="icon-0" onClick={handleParams} /> */}
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
                : param ?
                <div className="background" onClick={closeModal} ref={divRef3}>
                    <div className="modal">
                        <ArrowBackIosIcon onClick={goBack} />
                        <Modal4 />
                    </div> 
                </div>
                : null
            }
        </div>

        </>
    )
}

export default Modal