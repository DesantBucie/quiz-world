import * as React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import './Home.scss';

const Home = () => (
    <section>
        <h1>Witaj w œwiecie quizu</h1>
        <Button variant="primary">Zacznij Quiz</Button>
    </section>

);

export default connect()(Home);
