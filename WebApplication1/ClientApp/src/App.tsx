import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Help from './components/Help';
import Quiz from './components/Quiz';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/quiz' component={Quiz}/>
        <Route path='/counter' component={Counter} /> {/*do usunięcia po poznaniu metod*/} 
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} /> {/* tak samo do usuniecia po przejrzeniu*/}
        <Route path='/help' component={Help} />
    </Layout>
);
