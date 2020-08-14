import * as  React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';

import {sleep} from '../../modules/Sleep';
import "./Login.scss";

type SessionProps = 
    Session.SessionState &
    typeof Session.actionCreators &
    RouteComponentProps<{}>;

type State = {
    email:string,
    password:string,
    route:string,
    redirect:boolean,
    loading:boolean,
    error:boolean,
}
class Login extends React.Component<SessionProps> {
    readonly state : State = {
        email:'',
        password:'',
        route:'',
        redirect:false,
        loading:false,
        error:false,
    }
    componentDidMount() {
    }
        
    handleSubmit = async (evt:any) =>{
        const {email,password} = this.state;
        evt.preventDefault();
        this.setState({loading:true,error:false});
        await axios.post(`/Account/Login`,{
        email,password
        })
        .then (res => {
            this.setState({route:res.data})
        })
        .catch(err => {
            console.error(err);
            this.setState({error:true,loading:false})
        })
        this.checkRoute();
    }
    checkRoute = () => {
        const route:string = this.state.route;
        console.log("Checking Route...", route);
        (route === "/InvalidLogin" ? this.invalidLogin() : this.getUsername())
    }
    getUsername = async () => {
        console.log("Getting username")
        await axios.get('/Account/username')
        .then(res =>{
            this.props.sendsession(res.data[0]);
            this.setState({redirect:true,route:res.data[1],loading:false,error:false})
        })
    }
    invalidLogin = async () => {
        (document.getElementById("login__form") as any).reset();
        (document.getElementById("login__wrong") as any )!.style.display="block";
        await sleep(10000);
        (document.getElementById("login__wrong") as any )!.style.display="none";
    }
    handleMail = async(e:any) => {
        await this.setState({
            email:e.target.value
        })
    }
    handlePass = async (e:any) => {
        await this.setState({
            password:e.target.value
        })
    } 
    render() {
        const {email,password,redirect,route} = this.state
        if(redirect) {
            return (
                <Redirect to={route}/>
            )
        }
        return (
        <section className="loginpageheader">
            <h4>QW</h4>
            <div><p>Panel Logowania</p></div>
            <section className="login">
                <form id="login__form" onSubmit={this.handleSubmit}>
                    <div id="login__wrong" className="login__wrong">
                        <p>Zły email lub hasło!</p>
                    </div>
                    <div className="login__email">
                        <label htmlFor="email">Email:</label><br/>
                        <input
                        value={email}
                        onChange={this.handleMail}
                        type='email'
                        name="email"
                        required/>
                    </div>
                    <div className="login__email">
                        <label htmlFor="password">Hasło:</label><br/>
                        <input
                        value={password}
                        onChange={this.handlePass}
                        type='password'
                        name="password"
                        required/>
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
) (Login as any);