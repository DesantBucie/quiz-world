import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as Category from '../../store/Category';

import '../../scss/components/ChooseIt.scss';

type State = {
    category:string,
    redirect:boolean,
}
type CategoryProps =
    Category.Category &
    typeof Category.actionCreators &
RouteComponentProps<{}>;

//TODO: Change select option to normal divs, throwed by api

class ChoseIt extends React.Component<CategoryProps> {
    readonly state : State = {
        category:'społeczeństwo',
        redirect:false,
    }
    //Sends category to redux, when redirected, quiz components gets it value
    ChooseCategory = async() => {
        console.log("Clock")
        const category = this.state.category;
        this.props.getCategory(category);
        await this.setState({redirect:true})
    }
    handleChange = async(event:any) => {
        console.log("Click");
        console.log(event.target.value);
        await this.setState({category: event.target.value});
        this.ChooseCategory();
    }

    render()  {
        const redirect = this.state.redirect;
        if(redirect){
            return (<Redirect to='/quiz'/>)
        }

        return (
            <section className="chooseit">

                <h2>Wybierz kategorię:</h2>
                    <form className="form">
                        <div className="home__header home__header--option2">
                            <h1>Wszystkie</h1>
                            <Link to='/category'>
                                <button type="submit" onClick={this.handleChange} value=" " className="home__button">
                                    Wybierz <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                                </button>	
                            </Link>
                        </div>
                        <div className="home__header home__header--option1">
                            <h1>Społeczeństwo</h1>
                            <Link to='/category'>
                                <button type="submit" onClick={this.handleChange} value="społeczeństwo" className="home__button">
                                    Wybierz <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                                </button>	
                            </Link>
                        </div>
                        <div className="home__header home__header--option2">
                            <h1>Fakty(Autentyczne)</h1>
                            <Link to='/category'>
                                <button type="submit" onClick={this.handleChange} value="fakty-autentyczne" className="home__button">
                                    Wybierz <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                                </button>	
                            </Link>
                        </div>
                        <div className="home__header home__header--option1">
                            <h1>Kinematografia</h1>
                            <Link to='/category'>
                                <button type="submit" onClick={this.handleChange} value="kinematografia"className="home__button">
                                    Wybierz <FontAwesomeIcon className="arrowRight" icon={faArrowRight}/>
                                </button>	
                            </Link>
                        </div>
                </form>

            </section>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.category,
    Category.actionCreators
) (ChoseIt as any);
