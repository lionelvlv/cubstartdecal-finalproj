import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/loginPage">login</Link></li>
                <li><Link to="/">home</Link></li>
                <li><Link to="/reset">reset</Link></li>
                <li><Link to="/register">register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;