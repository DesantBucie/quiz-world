import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.scss';
import { Spring } from 'react-spring/renderprops';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faQuestion,faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };
    readonly styles = {
        toggler: {
            border:'1px transparent solid'
        }
    }
    public render() {
        return (
            <header>
                <Spring
                from={{ marginTop:-200 }}
                to={{ marginTop: 0}}
                config={{duration:500,}}>
                {props => (
                    <Navbar style={props} className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">QZWRDL.</NavbarBrand>
                            <NavbarToggler style={this.styles.toggler} onClick={this.toggle} className="mr-2"/>
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Strona Główna <FontAwesomeIcon icon={faHome}/></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/quiz">Quiz <FontAwesomeIcon icon={faQuestion}/></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/help">Pomoc <FontAwesomeIcon icon={faInfoCircle}/></NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>)}
                </Spring>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
