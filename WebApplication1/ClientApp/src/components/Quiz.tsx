import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col } from 'reactstrap';

fetch('http://localhost:44322/api/Test', {
    method: 'GET',
})
.then(response => response.json())
.then(json => console.log(json))

const Quiz = () => (
    <section>
    <Container>
        <Row>
            <p>{state.question}</p>
            <Col sm={6}>
                <div style={styles.answers}>
                    <p>{state.answer1}</p>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <p>{state.answer2}</p>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <p>{state.answer3}</p>
                </div>
            </Col>
            <Col sm={6}>
                <div style={styles.answers}>
                    <p>{state.answer4}</p>
                </div>
            </Col>
        </Row>
    </Container> 
    </section>

);
let state = {
    question: '',
    answer1: 'd',
    answer2: 'u',
    answer3: 'p',
    answer4: 'a',
    error:'',
}
const styles = {
    answers: {
        border: "1px solid black",
    }
}
export default connect() (Quiz);