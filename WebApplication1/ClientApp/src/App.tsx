import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Help from './components/Help';
import Quiz from './components/Quiz/Quiz';
import Summary from './components/Quiz/Summary';
import Category from './components/Quiz/ChooseIt';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './custom.scss'

export default () => (
    <Layout>
        <Route exact path = '/' component            = {Home} />
        <Route path       = '/category' component    = {Category}/>
        <Route path       = '/quiz' component        = {Quiz}/>
        <Route path       = '/help' component        = {Help} />
        <Route path       = '/summary' component     = {Summary}/>
        <Route path       = '/login' component       = {Login}/>
        <Route path       = '/register' component    = {Register}/>
    </Layout>
);
