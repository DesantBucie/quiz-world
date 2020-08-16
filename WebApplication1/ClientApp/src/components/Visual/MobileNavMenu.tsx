import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faQuestion,faInfoCircle,faMoon,faSun,faBars,faSortDown,faSortUp,faTimes } from '@fortawesome/free-solid-svg-icons';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';
import './MobileNavMenu.scss';

type SessionProps = 
    Session.SessionState &
    typeof Session.actionCreators &
    RouteComponentProps<{}>;

type State = {
    icon:boolean,
    userIcon:boolean,
    session:boolean,
}

class MobileNavMenu extends React.Component<SessionProps> {
    readonly state : State = {
        icon:true,
        userIcon:true,
        session:false,
    }
    toggleUser = () => {
        const userIcon = this.state.userIcon;
        (userIcon ? this.setState({userIcon:false}) : this.setState({userIcon:true}) )
    }
    openNavBar = () => {
        document.getElementById("mobileNavbar__menu")!.style.display="block";
    }
    closeNavbar = () => {
        document.getElementById("mobileNavbar__menu")!.style.display="none";
    }
    toggleModes = (icon?:any) => {
       document.body.classList.toggle('darkmode'); 
   	}
    render() {
        const {userIcon,icon} = this.state;
        const {username,session} = this.props;
        return (
        <nav className="mobileNavbar">
            <div className="mobileNavbar__logo"><Link to="/"><h5>QW</h5></Link></div>

            <div className="mobileNavbar__trigger" onClick={this.openNavBar}>Menu <FontAwesomeIcon icon={faBars}/></div>
            <div id="mobileNavbar__menu" className="mobileNavbar__menu">
                <div><FontAwesomeIcon onClick={this.closeNavbar} className="mobileNavbar__close" icon={faTimes}/></div>
                <div><Link to="/"> Strona Główna <FontAwesomeIcon icon={faHome}/></Link></div>
                <div><Link to="/category">Quiz <FontAwesomeIcon icon={faQuestion}/></Link></div>
                <div><Link to="/help">Pomoc <FontAwesomeIcon icon={faInfoCircle}/></Link></div>
                <div><FontAwesomeIcon className="navbar__icon" onClick={this.toggleModes} icon={icon ? faMoon : faSun}/>&ensp;&ensp;

                <div style={{display: session ? 'none' : 'inline'}} className="mobileNavbar__authpanel">
                    <div><Link to="/login">Login &ensp;</Link></div>
                    <div><Link to="/register">Zarejestruj się!</Link></div>
                </div>
                <div style={{display: session ? 'inline' : 'none'}}className="mobileNavbar__user" onClick={this.toggleUser}>{username} 
                    <div><FontAwesomeIcon className="mobileNavbar__user" icon={userIcon ? faSortDown : faSortUp}/></div>
                </div></div>
            </div>
        </nav>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
) (MobileNavMenu as any);