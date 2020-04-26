import * as React from 'react';
import { connect } from 'react-redux';

const Help = () => (
    <section>
        <h1>So, you need help</h1>
        <p><b>The page is under heavy development,</b>but it should give you random question and give you 4 answers from the database. Every bug you can report on our form, though check your internet connection first please.</p>
        <form>
        </form>
    </section>
);

export default connect()(Help);
