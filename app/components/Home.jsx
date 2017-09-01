import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';



export default class Home extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

  }


  render() {
    return (
        <div>
          <NavLink to="/" activeClassName="active"><span><h2>HOME</h2></span></NavLink>
          <div>
            <div>
              <NavLink to="/campuses" activeClassName="active">
                <span>
                  <h3>Campuses</h3>
                </span>
              </NavLink>
              <NavLink to="/students" activeClassName="active">
                <span>
                  <h3>Students</h3>
                </span>
              </NavLink>
            </div>
          </div>
        </div>
    )
  }
}
