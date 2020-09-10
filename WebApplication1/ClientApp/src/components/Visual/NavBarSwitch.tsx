import * as React from "react";
import NavMenu from './NavMenu';
import MobileNavMenu from './MobileNavMenu';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { ApplicationState } from '../../store';
import { RouteComponentProps } from 'react-router';
import * as Session from '../../store/Session';
import { connect } from 'react-redux';

type SessionProps = 
    Session.SessionState &
    typeof Session.actionCreators &
    RouteComponentProps<{}>;

type State = {
    breakpoint:number,
    route:string,
    redirect:boolean,
    cookie:boolean,
}
class NavBarSwitch extends React.Component<SessionProps> {
    readonly state : State = {
        breakpoint: window.innerWidth,
        route:'',
        redirect:false,
        cookie:false,
    }
    handleChange = () => {
        this.setState({breakpoint:window.innerWidth})
    }
    checkLogin = async() => {
        await axios.get('/Account/Login')
        .then(res =>{
           this.setState({cookie:res.data})
        })
        .catch(err =>{
            console.error(err);
        })
        const cookie = this.state.cookie;
        if(cookie){
            axios.get(`/Account/username`)
            .then(res => {
                this.props.sendsession(res.data[0]);
                this.setState({route:res.data[1],redirect:true})
            })
            .catch(err => {
                console.error(err);
            })
        }
    }
    componentDidMount () {
        window.addEventListener('resize', this.handleChange)
        this.handleChange();
        this.checkLogin();
    }

    render() {
        const {breakpoint,route, redirect} = this.state;
        return (breakpoint > 1000 ? (<NavMenu/>) : (<MobileNavMenu/>) ) ||   (redirect ? <Redirect to={route}/> : [])
    }
}
export default connect(
    (state: ApplicationState) => state.session,
    Session.actionCreators
) (NavBarSwitch as any);