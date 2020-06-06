import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { PieChart, Pie,Cell} from 'recharts';

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
        const COLORS = ['#00FF00', '#FF0000'];
        return (
            <section>
                {this.state.test}
                <PieChart width={400} height={400}>
                    <Pie
                    data={data}
                    cx={200}
                    cy={200}
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
                <Link to='/quiz'><button>Spróbuj jeszcze raz!</button></Link>
                <Link to='/'><button>Wracam do strony głównej</button></Link>             
            </section>
        )

    }
}
export default connect() (Summary);