import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';

function Header() {
    return (
        <nav className="header">
            <a class="nav-brand" href="/">EMS Calculator</a>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/instructions">Instructions</Link></li>
            </ul>
        </nav>
    )
}

export default Header
