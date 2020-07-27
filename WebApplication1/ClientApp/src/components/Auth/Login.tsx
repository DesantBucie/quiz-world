import React,{useState} from 'react';
import axios from 'axios';
import "./Login.scss";

const Login = () => {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');

    const handleChange= (evt:any) => {
        evt.preventDefault();
        axios.post(`https://localhost:44322/Account/Login`,{
        Email,Password
        })
        .then (res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        })
    }
    return(
        <section className="loginpageheader">
            <h4>QW</h4>
            <div><p>Panel Logowania</p></div>
        <section className="login">
            <form onSubmit={handleChange}>
                <div className="login__email">
                    <label htmlFor="email">Email:</label><br/>
                    <input
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                    type='email'
                    name="email"/>
                </div>
                <div className="login__email">
                    <label htmlFor="password">Hasło:</label><br/>
                    <input
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
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
export default Login;
