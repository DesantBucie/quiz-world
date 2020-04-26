import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
    <section>
        <h1>Welcome to the Quiz World!</h1>
    </section>
);

export default connect()(Home);
