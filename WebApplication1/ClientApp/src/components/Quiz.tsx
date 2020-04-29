import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col, Button } from 'reactstrap';
import axios from 'axios';

const state = {
    question: [],
    answer1: 'd',
    answer2: 'u',
    answer3: 'p',
    answer4: 'a',
    error:'',
};
axios.get('https://localhost:44322/api/Test',{})
.then(resp => {
    console.log(resp.data);
    console.log(resp.data.Object('0'))
})
.catch(err => {
   state.error = err;
});
const styles = {
    answers:{
        
    },
    buttons: {
        width:"100%",
    }
}


const Quiz = () => (
    <section>
    <Container>
        <Row>
            <Col sm={12}>
                <p>{state.question}</p>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>A.{state.answer1}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>B.{state.answer2}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>C.{state.answer3}</Button>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <Button style={styles.buttons}>D.{state.answer4}</Button>
                </div>
            </Col>
        </Row>
    </Container> 
    </section>
)

export default connect() (Quiz);