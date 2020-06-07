import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
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
        const category= this.state.category;
        const apiLink = `https://localhost:44322/api/Test/` + category;
        console.log(apiLink);
        axios.post(apiLink,{
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
        const styles= {
            form: {
                width:'100%',
                textAlign: 'center' as 'center',
            },
            form__select:{
                display:'block',
                width:'100%',
                padding: '.6em 1.4em',
                color: '#444',
                boxSizing: 'border-box' as 'border-box',
                margin: 0,
                border: '1px solid #aaa',
                boxShadow: '0 1px 0 1px rgba(0,0,0,.04)',
                borderRadius: '.5em',
                marginBottom: '1em',
            },
            form__button: {
                width:'70%',
                padding:'1.5em',
				border:'1px solid transparent',
				borderRadius:'4px',
            }
        }
        return (
            <section>
                <Container>
                    <Row>

                    <Col xs={12}>Wybierz kategorię:</Col>
                    <form onSubmit={this.ChooseCategory} style={styles.form}>
                        <Col xs={12}><select value={this.state.category} onChange={this.handleChange} style={styles.form__select}>
                            <option value="społeczeństwo">Społeczeństwo</option>
                            <option value="fakty-autentyczne">Fakty Autentyczne</option>
                            <option value="kinematografia">Kinematografia</option>
                        </select></Col>
                   <Col xs={12}><input style={styles.form__button} type="submit" value="Dalej!" /></Col>
                    </form>
                    </Row>
                </Container>
            </section>
        )
    }
    
}
export default ChoseIt;