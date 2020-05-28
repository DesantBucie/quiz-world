import * as React from 'react';
import { connect } from 'react-redux';

class ChoseIt extends React.Component {
    render()  {
        return (

            <section>Wybierz kategorię:
                <input type="text"></input>
            </section>

        )
    }
    
}
export default connect() (ChoseIt);