import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/login">login</Link></li>
                <li><Link to="/">home</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;