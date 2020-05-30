import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class ChoseIt extends React.Component {
    render()  {

        return (
            <section>Wybierz kategorię:
                <form>
                <select name="categories" className="categories">
                    <option value="Kinematografia">Kinematografia</option>
                    <option value="Chmitrails">Chmitrails</option>
                </select>
                <Link to='/quiz'><button type="submit">Wybierz!</button></Link>
                </form>
            </section>
        )
    }
    
}
export default connect() (ChoseIt);