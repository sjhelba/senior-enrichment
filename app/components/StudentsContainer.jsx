import React, { Component } from 'react';
import store from '../store';
import Students from './Students';

export default class studentsContainer extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
      <Students students={this.state.students} campuses={this.state.campuses} />
      </div>
    )
  }

}
