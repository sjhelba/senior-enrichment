import React, { Component } from 'react';
import {SingleCampus} from './SingleCampus'
// import Axios from 'axios';

export default class Campuses extends Component {
  constructor() {
    super()
    this.state = {
      campuses: [{id: 1, name: 'Fancy', image: '../../public/fancy.jpeg'}, {id: 2, name: 'Crappy', image: '../../public/crappy.jpeg'}]
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const campuses = this.state.campuses;
    return (
      <div>
        <h2>CAMPUSES COMPONENT</h2>
      <div>
      {campuses.map(campus => {
        return (
          <link key={campus.id} to={SingleCampus}>
            <img src={campus.image} />
          </link>
      )})}
      </div>
      </div>
    )
  }
}
