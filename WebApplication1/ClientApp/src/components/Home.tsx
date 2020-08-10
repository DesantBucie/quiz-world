import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';

//TODO:More Content
const Home : React.FC = () => {
    return (
    <section className="home">
                <div className="home__header">
                    <h1>Witaj na QuizWorld</h1>
                    <Link to='/category'>
                        <button className="home__button">
                            Zaczynajmy <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                        </button>
                    </Link>
                </div>
                <div className="home__header home__header--register">
                    <h2>Zajrejestruj się!</h2>
                    <Link to='/register'>
                        <button className="home__button">
                            Rejestracja <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                        </button>
                    </Link>
                </div>
                <div className="home__header home__header--register">
                    <h2>Zajrejestruj się!</h2>
                    <Link to='/register'>
                        <button className="home__button">
                            Rejestracja <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                        </button>
                    </Link>
                </div>
    </section>
    );

};
export default Home;
