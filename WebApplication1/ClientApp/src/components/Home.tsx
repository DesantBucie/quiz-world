import * as React from 'react';
import { Button, Container,Row,Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const Home = () => (
    <section style={styles.back}>
        <Container>
                <div style={styles.header}>
                    <h1>Witaj na QuizWorld</h1>
                    <Link to='/category'><button style={styles.button}>Zaczynajmy!</button></Link>
                </div>
        </Container>
    </section>

);
const styles = {
    header: {
        textAlign:'center' as 'center',
        background:'#dadedf',
        padding:'40px'
    },
    button: {
        borderRadius:'4px',
        background:'lightblue',
        border:'1px solid transparent',
        padding:'20px',
        paddingTop:'15px',
        paddingBottom:'15px',
        marginTop:'10px'
    },
    back: {
    }
}
export default connect()(Home);
