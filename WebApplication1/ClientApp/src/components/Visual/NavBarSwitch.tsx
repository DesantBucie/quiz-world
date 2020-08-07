import * as React from "react";
import NavMenu from './NavMenu';
import MobileNavMenu from './MobileNavMenu';
import { throws } from "assert";
type State = {
    breakpoint:number,
}
class NavBarSwitch extends React.Component {
    readonly state : State = {
        breakpoint: window.innerWidth
    }
    handleChange = () => {
        this.setState({breakpoint:window.innerWidth})
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleChange)
        this.handleChange();
    }
    render() {
        const breakpoint = this.state.breakpoint;
        //!"Expression expected" breakpoint > 1000 ? return (<NavMenu/>) : return (<MobileNavMenu/>)
        if(breakpoint > 1000){
            return (<NavMenu/>)
        }
        else {
            return (<MobileNavMenu/>)
        }
    }
}
export default NavBarSwitch;