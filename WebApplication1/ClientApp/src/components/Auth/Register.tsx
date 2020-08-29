import * as  React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {ApplicationState} from '../../store';
import {RouteComponentProps} from 'react-router';
import * as Session from '../../store/Session';
import {connect} from 'react-redux';

import {sleep} from '../../modules/Sleep';
import "../../scss/components/Login.scss";
// Redux props
type SessionProps =
    Session.SessionState &
    typeof Session.actionCreators &
    RouteComponentProps<{}>;

type State = {
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword: string,
    route: any,
    redirect: boolean,
    loading: boolean,
    error: boolean,
    errmessage?: any,
}
/*
! SESSION COOKIE IS SET IN VISUAL/NAVBARSWITCH DUE TO COMPONENT ALWAYS ACTIVE
handleSubmit() => checkRoute() 
                    /       \
        invalidLogin()    getUsername()
TODO: AFTER TEST WITH REDUX HOOKS, CHANGE COMPONENT TO FUNCITONAL
*/

class Register extends React.Component<SessionProps> {
    readonly state: State = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        route: '',
        redirect: false,
        loading: false,
        error: false,
        errmessage: []
    }

    handleSubmit = async (e: any) => {
        const {email, confirmEmail, password, confirmPassword} = this.state;
        e.preventDefault();
        this.setState({loading: true, error: false});
        await axios.post(`/Account/Register`, {
            email, confirmEmail, password, confirmPassword
        })
            .then(res => {
                // I used two separate variables depending what resp i will get
                if (typeof res.data == 'string') {
                    this.setState({route: res.data, redirect: true, loading: false})
                }
                else {
                    this.setState({errmessage: res.data, loading: false})
                    this.showError();
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({error: true, loading: false})
            })
    }
    showError = async () => {
        (document.getElementById("login__wrong") as any)!.style.display = "block";
        await sleep(10000);
        (document.getElementById("login__wrong") as any)!.style.display = "none";
    }
    handleMail = async (e: any) => {
        await this.setState({email: e.target.value})
    }
    handlePass = async (e: any) => {
        await this.setState({password: e.target.value})
    }
    handleConfirmMail = async (e: any) => {
        await this.setState({confirmEmail: e.target.value})
    }
    handleConfirmPass = async (e: any) => {
        await this.setState({confirmPassword: e.target.value})
    }
    render() {
        const {email, confirmEmail, password, confirmPassword, redirect, errmessage} = this.state

        if (redirect) {
            return (
                // TODO: possibly later, need to add route, for multple route redirects
                <Redirect to='/' />
            )
        }
        return (
            <section className="loginpageheader">
                <h4>QW</h4>
                <div><p>Panel Logowania</p></div>
                <section className="login">
                    <form id="login__form" onSubmit={this.handleSubmit}>
                        <div id="login__wrong" className="login__wrong">
                            {errmessage.map((error: string, index: number) =>
                                (<p key={index} className="login__bad">error.description</p>))}
                        </div>
                        <div className="login__email">
                            <label htmlFor="email">Email:</label><br />
                            <input
                                value={email}
                                onChange={this.handleMail}
                                type='email'
                                name="email"
                                required />
                        </div>
                        <div className="login__email">
                            <label htmlFor="email">Potwierdź Email:</label><br />
                            <input
                                value={confirmEmail}
                                onChange={this.handleConfirmMail}
                                type='email'
                                name="confirmEmail"
                                required />
                        </div>
                        <div className="login__email">
                            <label htmlFor="password">Hasło:</label><br />
                            <input
                                value={password}
                                onChange={this.handlePass}
                                type='password'
                                name="password"
                                required />
                        </div>
                        <div className="login__email">
                            <label htmlFor="password">Hasło:</label><br />
                            <input
                                value={confirmPassword}
                                onChange={this.handleConfirmPass}
                                type='password'
                                name="password"
                                required />
                        </div>
                        <div className="login__button">
                            <button type="submit">Zaloguj się</button>
                        </div>
                    </form>
                </section>
            </section>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
)(Register as any);
