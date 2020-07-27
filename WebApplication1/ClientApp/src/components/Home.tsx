import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';


const Home = () => {
    return (
    <section>
                <div className="header">
                    <h1>Witaj na QuizWorld</h1>
                    <Link to='/category'><button className="header__button">Zaczynajmy <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/></button></Link>
                </div>
    </section>
    );

};
export default Home;
