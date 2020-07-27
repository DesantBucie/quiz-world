import React,{useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [Email,setEmail] = useState('');
    const [ConfirmEmail, setConfirmEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const handleChange = (evt:any) => {
        evt.preventDefault();
        axios.post(`https://localhost:44322/Account/Register`,{Email,Password,ConfirmPassword})
        .then(res => {
            console.log(res.data);
        })
    }
    return (
    <section className="loginpageheader">
        <h4>QW</h4>
        <p>Zarejestruj się!</p>
        <section className="login">
        <form onSubmit={handleChange}>
            <div>
                <label htmlFor="email">Email:</label><br/>
                <input 
                value={Email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"/>
            </div>
            <div>
                <label htmlFor="emailconf">Potwierdź Email:</label><br/>
                <input
                value={ConfirmEmail}
                onChange={e => setConfirmEmail(e.target.value)} 
                name="emailconf"
                type="email"/>
            </div>
            <div>
                <label htmlFor="password">Hasło:</label><br/>
                <input 
                value={Password} 
                onChange={e => setPassword(e.target.value)}
                name="password" 
                type="password"/>
            </div>
            <div>
                <label htmlFor="confpassword">Potwierdź Hasło:</label><br/>
                <input
                value={ConfirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                name="password"
                type="password"/>
            </div>
            <div className="login__button">
                <button
                type="submit">Zarejestruj się</button>
            </div>
        </form>
        </section>
    </section>
    )
}

export default Register;
