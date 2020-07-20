import React,{useState} from 'react';
import axios from 'axios';
import "./Login.scss";

const Login = () => {
    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');

    const handleChange= (evt:any) => {
        evt.preventDefault();
        axios.post(`https:localhost:44322/Account/Login`,{
        Email,Password
        })
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
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    type='email' />
                </div>
                <div>
                    <input
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
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
