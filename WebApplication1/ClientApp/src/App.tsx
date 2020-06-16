import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Help from './components/Help';
import Quiz from './components/Quiz';
import Summary from './components/Summary';
import Category from './components/ChoseIt';
import './custom.scss'

export default () => (
    <Layout>
        <Route exact path = '/' component           = {Home} />
        <Route path       = '/category' component   = {Category}/>
        <Route path       = '/quiz' component       = {Quiz}/>
        <Route path       = '/help' component       = {Help} />
        <Route path       = '/summary' component    = {Summary}/>
    </Layout>
);
