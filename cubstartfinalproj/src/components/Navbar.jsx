import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/loginPage">Login</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;