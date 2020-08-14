import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PieChart, Pie,Cell} from 'recharts';
import './Summary.scss';
// TODO: styling, possibly redux;


const Summary : React.FC = () =>  {
    const [good, setGood] = useState(0);
    const [bad, setBad] = useState(0);
    useEffect(() => loadSum(),[]);
    const loadSum = () => {
        axios.get( `/api/Test/summary`,{
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
                <span>Dobrych odpowiedzi: {good}
                Złych odpowiedzi: {bad}</span>
                <Link to='/category'><button className="summary__button--green">Spróbuj jeszcze raz!</button></Link>
                <Link to='/'><button className="summary__button--red">Wracam do strony głównej</button></Link>
            </section>
    );
}
export default connect() (Summary);
