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
    <section>
        <form onSubmit={handleChange}>
            <div>
                <input 
                value={Email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                type="email"/>
            </div>
            <div>
                <input
                value={ConfirmEmail}
                onChange={e => setConfirmEmail(e.target.value)} 
                placeholder="Potwierdź Email" 
                type="email"/>
            </div>
            <div>
                <input 
                value={Password} 
                onChange={e => setPassword(e.target.value)}
                placeholder="Hasło" 
                type="password"/>
            </div>
            <div>
                <input 
                value={ConfirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Potwierdź Hasło"
                type="password"/>
            </div>
            <div>
                <input 
                value="Zarejestruj się" 
                type="submit"/>
            </div>
        </form>
    </section>
    )
}

export default Register;
