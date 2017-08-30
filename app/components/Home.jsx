import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }



  render() {
    return (
        <div>
          <h1>HOME</h1>
          <div>
            <div>
              <Link to="/campuses">Campuses</Link>
            </div>
            <div>
              <Link to="/students">Students</Link>
            </div>
          </div>
        </div>
    )
  }
}
