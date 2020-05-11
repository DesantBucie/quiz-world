import * as React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

type State = {
    test:any
}
class Summary extends React.Component {
    readonly state : State = {
        test:'',
    }
    loadSum = async () => {
        await axios.get(`localhost:44322/api/Test/summary`,{
        })
        .then (res => {
            this.setState({
                test:res.data
            })           
        })
    };
    componentDidMount(){
        this.loadSum();
    }
    render()  {
        return (
            <section>
               {this.state.test}
            </section>
        )

    }
}
export default connect() (Summary);