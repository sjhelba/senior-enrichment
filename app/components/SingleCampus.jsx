import React, { Component } from 'react';
import Axios from 'axios';

export default class SingleCampus extends Component {
  constructor() {
    super()

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/campses" >Campuses</Link>
        <Link to="/students" >Students</Link>
        <div>
          <Switch>
            <Route exact path='/campuses' component={Campuses}/>
            <Route exact path='/students' component={Students}/>
          </Switch>
        </div>
      </div>
    )
  }
}
