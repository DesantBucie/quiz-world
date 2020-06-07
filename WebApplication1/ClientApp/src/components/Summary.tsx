import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { PieChart, Pie,Cell} from 'recharts';
import { Container,Row,Col } from 'reactstrap';

type State = {
    test?:any,
    chart:any,
    good:number,
    bad:number
}
class Summary extends React.Component<State> {
    readonly state : State = {
        test:'',
        chart:'',
        good:0,
        bad:0,
    }
    loadSum = async () => {
        await axios.get(`https://localhost:44322/api/Test/summary`,{
        })
        .then (res => {
            this.setState({
                good:res.data[0],
                bad:res.data[1],
            })           
        })
    };
    componentDidMount(){
        this.loadSum();
    }
    render()  {
        const {good, bad} = this.state;
        const data = [
            { name: 'Poprawne odpowiedzi', value: good }, { name: 'Złe odpowiedzi', value: bad },
          ];
        const screenwidth = window.screen.width;
       console.log(screenwidth);
        const COLORS = ['#00FF00', '#FF0000'];
        const styles = {
            button: {
                width:'50%',
                padding:'1.5em',
				border:'1px solid transparent',
                borderRadius:'4px',
                marginTop:'.3em',
            },
            section:{
                textAlign: 'center' as 'center',
            }
        }
        return (
            <section style={styles.section}>
                <Container>
                    <Row>
                {this.state.test}
                <Col xs={12}><PieChart width={screenwidth} height={300}>
                    <Pie
                    data={data}
                    cx={screenwidth/2 - 150}
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
                </PieChart></Col>
                <Col xs={12}>
                    Dobrych odpowiedzi: {good} <br/>
                    Złych odpowiedzi: {bad}
                </Col>
                <Col xs={12} sm={6}><Link to='/quiz'><button style={styles.button}>Spróbuj jeszcze raz!</button></Link></Col>
                <Col xs={12} sm={6}><Link to='/'><button style={styles.button}>Wracam do strony głównej</button></Link></Col>
                </Row>
                </Container>             
            </section>
        )

    }
}
export default connect() (Summary);