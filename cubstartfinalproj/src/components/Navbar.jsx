import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
            <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                
        
                <li className="nav-item">
                    <Link to="/loginPage" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/aboutus" className="nav-link">About Us</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;