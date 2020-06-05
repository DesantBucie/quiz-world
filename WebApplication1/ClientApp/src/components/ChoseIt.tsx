import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

type State = {
    category:string,
    redirect:boolean,
}
class ChoseIt extends React.Component {
    readonly state : State = {
        category:'społeczeństwo',
        redirect:false,
    }
    ChooseCategory = async() => {
        const category= this.state.category
        console.log(category);
        axios.post(`https://localhost:44322/api/Test/category`,{
            category
        })
        .then(res => {console.log(res.data);})
        .catch(err => {console.error(err);})
        await this.setState({redirect:true})
    }
    handleChange = async(event:any) => {
        await this.setState({category: event.target.value});
    }
    
    render()  {
        const redirect = this.state.redirect;
        if(redirect){
            return (<Redirect to='/quiz'/>)
        }
        return (
            <section>Wybierz kategorię:
                <form onSubmit={this.ChooseCategory}>
                    <label>
                    Pick your favorite flavor:
                    <select value={this.state.category} onChange={this.handleChange}>
                        <option value="społeczeństwo">Społeczeństwo</option>
                        <option value="fakty autentyczne">Fakty Autentyczne</option>
                        <option value="kinematografia">Kinematografia</option>
                    </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </section>
        )
    }
    
}
export default ChoseIt;