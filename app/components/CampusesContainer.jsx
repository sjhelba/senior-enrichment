import React, { Component } from 'react';
import store from '../store';
import Campuses from './Campuses';
import {fetchCampuses} from '../reducers';


export default class CampusesContainer extends Component {
  constructor() {
    super()
    this.state = store.getState()
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  update () {
    this.setState(store.getState())
  }


  render() {
    return (
      <div>
      <Campuses campuses={this.state.campuses} students={this.state.students} />
      </div>
    )
  }

}
