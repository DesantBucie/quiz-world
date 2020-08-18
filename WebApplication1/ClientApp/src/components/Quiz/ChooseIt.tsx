import * as React from 'react';
import { Redirect } from 'react-router-dom';
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

                   Wybierz kategorię:
                    <form onSubmit={this.ChooseCategory} className="form">
                        <select value={this.state.category} onChange={this.handleChange} className="form__select">
                            <option value=''>Wszystkie</option>
                            <option value="społeczeństwo">Społeczeństwo</option>
                            <option value="fakty-autentyczne">Fakty Autentyczne</option>
                            <option value="kinematografia">Kinematografia</option>
                        </select>
                   <button className="form__button" type="submit">Dalej!</button>
                   </form>
            </section>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.category,
    Category.actionCreators
) (ChoseIt as any);
