import React, {useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
import './modal.css'
import CloseIcon from '@material-ui/icons/Close';

function Modal({showModal, setShowModal}) {
    const animate = useSpring({
        config: {duration:250},
        opacity: showModal? 1: 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
        position: 'fixed',
        top: 0,
        transition: '1s all ease'
    })

    return (
        <div>
        {
            showModal ? 
            <animated.div style={animate}>
            <div className="modal">
                <CloseIcon 
                    onClick={() => setShowModal(prev => !prev)}
                />
            </div>
            </animated.div>            
            :null
        }
        </div>
    )
}

export default Modal
