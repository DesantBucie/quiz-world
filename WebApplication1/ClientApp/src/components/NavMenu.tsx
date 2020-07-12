import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faQuestion,faInfoCircle,faMoon,faSun } from '@fortawesome/free-solid-svg-icons';
import './NavMenu.scss';

export default class NavMenu extends React.PureComponent<{},{icon:boolean}> {
    public state = {
        icon: true,
    };
    readonly styles = {
    }
    public render() {
        const icon = this.state.icon;
        return (
            <nav className="navbar">
                <div className="navbar__logo">
                    <Link to="/"><h5>QW</h5></Link>
                </div>

                <div className="navbar__menu">
                    <Link to="/">Strona Główna <FontAwesomeIcon icon={faHome}/></Link>&ensp;
                    <Link to="/category">Quiz <FontAwesomeIcon icon={faQuestion}/></Link>&ensp;
                    <Link to="/help">Pomoc <FontAwesomeIcon icon={faInfoCircle}/></Link>&ensp;
                </div>

                <div className="navbar__login">
                    <FontAwesomeIcon  onClick={this.togglemodes} icon={icon ? faMoon : faSun}/>&ensp;
                    <Link to="/login">Login &ensp;</Link>
                    <Link to="/register">Zarejestruj się!</Link>
                </div>

            </nav>
        );
    }

    private togglemodes = async () => {
        document.body.classList.toggle('darkmode');
        const icon = this.state.icon;
        (icon ? await this.setState({icon:false}) : await this.setState({icon:true}) );
    }
}
