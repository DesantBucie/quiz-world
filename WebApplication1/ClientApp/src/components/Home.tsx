import * as React from 'react';
import { Button, Container,Row,Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.scss';


const Home = () => {
    return (
    <section>
        <Container>
                <div className="header">
                    <h1>Witaj na QuizWorld</h1>
                    <Link to='/category'><button className="header__button">Zaczynajmy!</button></Link>
                </div>
        </Container>
    </section>
    );

};
export default connect()(Home);
