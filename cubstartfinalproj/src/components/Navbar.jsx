import React from 'react';
import {Link} from 'react-router-dom';
<<<<<<< Updated upstream
import "./Navbar.css";  
=======
import "./Navbar.css";
>>>>>>> Stashed changes

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/aboutus" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/loginPage" className="nav-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;