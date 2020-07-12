import * as React from 'react';
import {Col,Container,Row} from 'reactstrap';
import axios from 'axios';

type State = {
    token:string,
    passwd:string,
    redirect:boolean,
}

class LogIn extends React.Component {

    readonly state : State = {
        token: '',
        passwd:'',
        redirect:false,
    }
    sendtoken = () => {
        const apiLink = `https://localhost:44322/api/token`;
        axios.post(apiLink)
        .then(res => {
            this.setState({redirect:true});
        })
        .catch(err => {
            console.error(err);
        })

    }

    render() {
        return(   
            <section>
                <Container>
                    <Row>
                        <Col xs={12}><input type='email' /></Col>
                        <Col xs={12}><input type='password'/></Col>
                        <Col xs={12}><input type='submit'/></Col>
                    </Row>
                </Container>
            </section>
        )
        
    }
}
export default LogIn;
