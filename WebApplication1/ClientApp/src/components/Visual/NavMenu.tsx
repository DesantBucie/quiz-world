import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faQuestion,faInfoCircle,faMoon,faSun,faBars } from '@fortawesome/free-solid-svg-icons';
import './NavMenu.scss';


const NavMenu = () => {

    const [icon,setIcon] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1000;

    useEffect( () => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    });

    const togglemodes = () => {
        document.body.classList.toggle('darkmode');
        (icon ? setIcon(false) : setIcon(true) );
    }
    if (width > breakpoint) {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/"><h5>QW</h5></Link>
            </div>

            <div className="navbar__menu">
              <Link to="/"> Strona Główna <FontAwesomeIcon icon={faHome}/></Link>&ensp;
                <Link to="/category">Quiz <FontAwesomeIcon icon={faQuestion}/></Link>&ensp;
                <Link to="/help">Pomoc <FontAwesomeIcon icon={faInfoCircle}/></Link>&ensp;
            </div>

            <div className="navbar__login">
                <FontAwesomeIcon className="navbar__icon" onClick={togglemodes} icon={icon ? faMoon : faSun}/>&ensp;
                <Link to="/login">Login &ensp;</Link>
                <Link to="/register">Zarejestruj się!</Link>
            </div>

        </nav>
    )
}
    else {
    return (
        <nav className="mobileNavbar">
            <div className="mobileNavbar__logo"><Link to="/"><h5>QW</h5></Link></div>

            <div className="mobileNavbar__menu"><FontAwesomeIcon icon={faBars}/></div>
        </nav>
    )
    }
}
export default NavMenu;
