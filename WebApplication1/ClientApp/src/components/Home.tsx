import * as React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.scss';
const Home = () => (
    <section>
        <h1>Siema z tej strony Sebastian Ślemp</h1>
        <Link to='/quiz'><Button variant="primary">Zacznij Quiz</Button></Link>{/*Needs react-router-dom import*/}
    </section>

);

export default connect()(Home);
