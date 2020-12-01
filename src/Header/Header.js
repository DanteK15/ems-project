import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';

function Header() {
    return (
        <nav className="header">
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/instructions">instructions</Link></li>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    )
}

export default Header
