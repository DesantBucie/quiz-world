import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie,Cell} from 'recharts';
import { Container,Row,Col } from 'reactstrap';
import './Summary.scss';

const Summary = () =>  {
    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    useEffect(() => loadSum(),[]);
    const loadSum = () => {
        axios.get(`https://localhost:44322/api/Test/summary`,{
        })
        .then (res => {
            setGood(res.data[0])
            setBad(res.data[1])
        })
    }
    const data = [
        { name: 'Poprawne odpowiedzi', value: good }, { name: 'Złe odpowiedzi', value: bad },
    ];
    const screenwidth = window.outerWidth;
    const COLORS = ['#00FF00', '#FF0000'];
        
    return (
            <section className="summary">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <PieChart width={screenwidth/2} height={300}>
                                <Pie
                                data={data}
                                cx={(screenwidth/2) - 150}
                                cy={150}
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                startAngle={180} 
                                endAngle={0}
                                dataKey="value"
                                >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                                </Pie>
                            </PieChart>
                        </Col>
                        <Col xs={12}>
                            Dobrych odpowiedzi: {good} <br/>
                            Złych odpowiedzi: {bad}
                        </Col>
                        <Col xs={12} sm={6}><Link to='/category'><button className="summary__button--green">Spróbuj jeszcze raz!</button></Link></Col>
                        <Col xs={12} sm={6}><Link to='/'><button className="summary__button--red">Wracam do strony głównej</button></Link></Col>
                    </Row>
                </Container>             
            </section>
    );
}
export default connect() (Summary);
