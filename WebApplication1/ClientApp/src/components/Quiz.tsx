import * as React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col } from 'reactstrap';

fetch('http://localhost:44348/api/Test', {
    method: 'GET',
})
.then(response => response.json())
.then(json => console.log(json))

const Quiz = () => (
    <section>
    <Container>
        <Row>
        <p>{state.question}</p>
        <p></p>
        </Row>
    </Container> 
    </section>

);
let state = {
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    error:'',
}
export default connect() (Quiz);