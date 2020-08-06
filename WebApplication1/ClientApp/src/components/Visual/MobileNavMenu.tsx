import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faQuestion,faInfoCircle,faMoon,faSun,faBars,faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';


const MobileNavMenu = () => {
    return (
        <nav className="mobileNavbar">
            <div className="mobileNavbar__logo"><Link to="/"><h5>QW</h5></Link></div>

            <div className="mobileNavbar__menu">Menu <FontAwesomeIcon icon={faBars}/></div>
        </nav>
    )
}
export default MobileNavMenu;