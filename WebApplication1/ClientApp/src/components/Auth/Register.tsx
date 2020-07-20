import React,{useState} from 'react';
import axios from 'axios';

const Register = () => {
    const [mail,setMail] = useState('');
    const [mailconf, setMailconf] = useState('');
    const [pass, setPass] = useState('');
    const [passconf, setPassconf] = useState('');

    const handleChange = (evt:any) => {
        evt.preventDefault();
        axios.post(`https://ocalhost:44322/Account/Register`,{mail,pass,passconf
        })
        .then(res => {
            console.log(res.data);
        })
    }
    return (
    <section>
        <form onSubmit={handleChange}>
            <div>
                <input
                placeholder="Nick" 
                type="text"/>
            </div>
            <div>
                <input 
                value={mail}
                onChange={e => setMail(e.target.value)}
                placeholder="Email"
                type="email"/>
            </div>
            <div>
                <input
                value={mailconf}
                onChange={e => setMailconf(e.target.value)} 
                placeholder="Potwierdź Email" 
                type="email"/>
            </div>
            <div>
                <input 
                value={pass} 
                onChange={e => setPass(e.target.value)}
                placeholder="Hasło" 
                type="password"/>
            </div>
            <div>
                <input 
                value={passconf} 
                onChange={e => setPassconf(e.target.value)}
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
