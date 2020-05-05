import * as React from 'react';
import { Button, Container,Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => (
    <section>
        <Container>
            <Row>
                <h1>Witaj na platoformie QuizWorld</h1>
                <Link to='/quiz'><Button color="primary">Zacznij Quiz</Button></Link>
            </Row>
        </Container>
    </section>

);
const styles = {

}
export default connect()(Home);
