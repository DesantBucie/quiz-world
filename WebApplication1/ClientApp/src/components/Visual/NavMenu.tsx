import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faQuestion,faInfoCircle,faMoon,faSun,faBars,faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';
import {toggleModes} from '../../modules/NavFunctions';
import './NavMenu.scss';

type SessionProps = 
    Session.SessionState &
    typeof Session.actionCreators &
    RouteComponentProps<{}>;

type State = {
    icon:boolean,
    userIcon:boolean,
    session:boolean,
}
class NavMenu extends React.Component <SessionProps> {
    readonly state : State = {
        icon:true,
        userIcon:true,
        session:false,
    }
    toggleUser = () => {
        const userIcon = this.state.userIcon;
        (userIcon ? this.setState({userIcon:false}) : this.setState({userIcon:true}) )
    }
    render() {
        const {session,username} = this.props;
        const {icon,userIcon} = this.state;
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
                <FontAwesomeIcon className="navbar__icon" onClick={toggleModes} icon={icon ? faMoon : faSun}/>&ensp;&ensp;
                <span style={{display: session ? 'none' : 'inline'}} className="navbar__authpanel">
                    <Link to="/login">Login &ensp;</Link>
                    <Link to="/register">Zarejestruj się!</Link>
                </span>
                <span style={{display: session ? 'inline' : 'none'}}className="navbar__user" onClick={this.toggleUser}>{username} 
                    <FontAwesomeIcon className="navbar__user" icon={userIcon ? faSortDown : faSortUp}/>
                </span>
                <div className="navbar__userbar"></div>
            </div>

        </nav>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
) (NavMenu as any);