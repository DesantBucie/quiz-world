import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col, Button } from 'reactstrap';
import axios from 'axios';
import {createStore} from 'redux';
let id:number
let category:string
let correctId:number
let answer1:string

class Quiz extends React.Component {

render() {
    const apiLink = 'https://localhost:44322/api/Test';
    
    axios.get(apiLink,{
            headers: {
                'Content-Type': 'aplication/json'
            }
    })
    .then( resp => {
            console.log(resp.data)
            id = resp.data[0].id
            category = resp.data[0].question.content
            correctId = resp.data[0].question.correctId
    })
    .catch (err => {
            console.log(err);
    });   
    const styles = {
        answers:{
            marginBottom:"20px",
        },
        buttons: {
            width:"100%",
        },
        
    }; 
    console.log(id,category);       
    return (
    <section>
    <Container>
        <Row>
            <Col sm={12}>
                <p>{category}</p>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>A.{answer1}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>B.</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>C.{}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>D.{}</Button>
                </div>
            </Col>
        </Row>
    </Container> 
    </section>
        );
    };
}

export default connect() (Quiz);