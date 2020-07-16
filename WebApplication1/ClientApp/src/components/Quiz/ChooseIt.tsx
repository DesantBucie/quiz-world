import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as Category from '../../store/Category';
import './ChooseIt.scss';

type State = {
    category:string,
    redirect:boolean,
}
type CategoryProps =
    Category.CategoryState &
    typeof Category.actionCreators &
    RouteComponentProps<{}>;

class ChoseIt extends React.Component<CategoryProps> {
    readonly state : State = {
        category:'społeczeństwo',
        redirect:false,
    }
    ChooseCategory = async() => {
        const category = this.state.category;
        this.props.getcategory(category);
        await this.setState({redirect:true})
    }
    handleChange = async(event:any) => {
        await this.setState({category: event.target.value});
    }
    
    render()  {
        const redirect = this.state.redirect;
        if(redirect){
            return (<Redirect to='/quiz'/>)
        }
        
        return (
            <section>
                <Container>
                    <Row>

                    <Col xs={12}>Wybierz kategorię:</Col>
                    <form onSubmit={this.ChooseCategory} className="form">
                        <Col xs={12}><select value={this.state.category} onChange={this.handleChange} className="form__select">
                            <option value=''>Wszystkie</option>
                            <option value="społeczeństwo">Społeczeństwo</option>
                            <option value="fakty-autentyczne">Fakty Autentyczne</option>
                            <option value="kinematografia">Kinematografia</option>
                        </select></Col>
                   <Col xs={12}><input className="form__button" type="submit" value="Dalej!" /></Col>
                    </form>
                    </Row>
                </Container>
            </section>
        )
    }
    
}
export default connect(
    (state: ApplicationState) => state.category,
    Category.actionCreators
) (ChoseIt as any);
