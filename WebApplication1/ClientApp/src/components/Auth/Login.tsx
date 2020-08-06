import * as  React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';
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

    handleSubmit = async (evt:any) =>{
        const {email,password} = this.state;
        evt.preventDefault();
        this.setState({loading:true,error:false});
        await axios.post(`https://localhost:44322/Account/Login`,{
        email,password
        })
        .then (res => {
           this.setState({route:res.data,})
           this.props.sendsession(email);
           this.setState({redirect:true,loading:false})
        })
        .catch(err => {
            console.error(err);
            this.setState({error:true,loading:false})
        })
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
                <form onSubmit={this.handleSubmit}>
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