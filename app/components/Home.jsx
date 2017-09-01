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
          <NavLink className="nav-link" to="/" activeClassName="active"><span><h2>HOME</h2></span></NavLink>
          <div>
            <div>
              <NavLink className="nav-link active" to="/campuses" activeClassName="active">
                <span>
                  <h3>Campuses</h3>
                </span>
              </NavLink>
              <NavLink className="nav-link active" to="/students" activeClassName="active">
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
