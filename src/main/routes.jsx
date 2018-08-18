import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Util from '../util/util' 
import About from '../about/about'

export default props => (
    <Router history={hashHistory}>
        <Route path='/utils' component={Util} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/utils' />
    </Router> 
)