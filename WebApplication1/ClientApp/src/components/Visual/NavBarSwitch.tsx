import * as React from "react";
import NavMenu from './NavMenu';
import MobileNavMenu from './MobileNavMenu';
type State = {
    breakpoint:number,
}
class NavBarSwitch extends React.Component {
    readonly state : State = {
        breakpoint: window.innerWidth
    }
    async componentDidUpdate() {
        await this.setState({
            breakpoint:window.innerWidth
        })
    }
    render() {
        const breakpoint = this.state.breakpoint;
        if(breakpoint > 1000){
            return (
                <NavMenu/>
            )
        }
        else {
            return (
                <MobileNavMenu/>
            )
        }
    }
}
export default NavBarSwitch;