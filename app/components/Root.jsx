import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import Campuses from './Campuses'
import Students from './Students'

export default class Root extends Component {
  constructor() {
    super()

  }

  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div>
            <Home />
          </div>
          <div>
            <Route path='/campuses' component={Campuses} />
            <Route path='/students' component={Students} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
