import React from 'react';
import { Link } from 'react-router-dom';
//FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faQuestion,
    faInfoCircle,
    faMoon,
    faSun,
    faBars,
    faSortDown,
    faSortUp,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

//Redux
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';

//scss
import '../../scss/layout/MobileNavMenu.scss';

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
        document.getElementById("mobile-navbar__menu")!.style.display="block";
    }

    closeNavbar = () => {
        document.getElementById("mobile-navbar__menu")!.style.display="none";
    }

    toggleModes = (icon?:any) => {
       document.body.classList.toggle('darkmode'); 
   	}

    render() {
        const {userIcon,icon} = this.state;
        const {username,session} = this.props;

        return (

        <nav className="mobile-navbar">
            <div className="mobile-navbar__logo">
                <Link to="/"><h5>QW</h5></Link>
            </div>

            <div className="mobile-navbar__trigger" onClick={this.openNavBar}>
                Menu <FontAwesomeIcon icon={faBars}/>
            </div>
            <div id="mobile-navbar__menu" className="mobile-navbar__menu">
                <div><FontAwesomeIcon onClick={this.closeNavbar} className="mobile-navbar__close" icon={faTimes}/></div>
                <div><Link to="/"> Strona Główna <FontAwesomeIcon icon={faHome}/></Link></div>
                <div><Link to="/category">Quiz <FontAwesomeIcon icon={faQuestion}/></Link></div>
                <div><Link to="/help">Pomoc <FontAwesomeIcon icon={faInfoCircle}/></Link></div>
                <div><FontAwesomeIcon className="navbar__icon" onClick={this.toggleModes} icon={icon ? faMoon : faSun}/>&ensp;&ensp;</div>

                <div style={{display: session ? 'none' : 'inline'}} className="mobile-navbar__authpanel">
                    <div><Link to="/login">Login &ensp;</Link></div>
                    <div><Link to="/register">Zarejestruj się!</Link></div>
                </div>
                <div style={{display: session ? 'inline' : 'none'}}className="mobile-navbar__user" onClick={this.toggleUser}>{username} 
                    <div><FontAwesomeIcon className="mobile-navbar__user" icon={userIcon ? faSortDown : faSortUp}/></div>
                </div>
            </div>
        </nav>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
) (MobileNavMenu as any);
