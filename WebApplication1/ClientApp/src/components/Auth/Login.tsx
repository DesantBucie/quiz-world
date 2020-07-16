import React,{useState} from 'react';
import axios from 'axios';
import "./Login.scss";

const Login = () => {
    const [login,setLogin] = useState('');
    const [token,setToken] = useState('');

    const handleChange= (evt:any) => {
        evt.preventDefault();
        axios.post(`https:localhost:44322/api/Account/Login`)
        .then (res => {
            console.log(res.data);
        })
        .catch(err => {
            console.error(err);
        })
    }
    return(
        <section>
            <form onSubmit={handleChange}>
                <div>
                    <input 
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    placeholder="Email" 
                    type='email' />
                </div>
                <div>
                    <input
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="Password" 
                    type='password'/>
                </div>
                <div>
                    <input 
                    value="Zaloguj się!" 
                    type='submit'/>
                </div>
            </form>
        </section>
    )
}
export default Login;
