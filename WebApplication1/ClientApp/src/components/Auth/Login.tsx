import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";
type State = {
    email:string,
    password:string,
    redirect:boolean,
    route:string,
}

class Login extends React.PureComponent {
    readonly state : State = {
        email:'',
        password:'',
        redirect:false,
        route:''
    }
    handleEmailChange = (e:any) => {
        this.setState({email:e.target.value})
    }
    handlePassChange = (e:any) => {
        this.setState({password:e.target.value})
    }
    handleSubmit = async() => {
        const {email,password} = this.state;
        await axios.post(`https://localhost:44322/Account/Login`,{
            email,password
        })
        .then (res => {
            this.setState({
                route:res.data,
                redirect:true
            })
        })
        .catch(err => {
            console.error(err);
        })
    }

    render() {
        const {email,password} = this.state;
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
                    onChange={this.handleEmailChange}
                    type='email'
                    name="email"/>
                </div>
                <div className="login__email">
                    <label htmlFor="password">Hasło:</label><br/>
                    <input
                    value={password}
                    onChange={this.handlePassChange}
                    type='password'
                    name="password"/>
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
export default Login;
