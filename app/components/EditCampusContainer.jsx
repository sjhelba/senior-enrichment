import React, { Component } from 'react';
import store from '../store';
import {fetchSelectedCampus} from '../reducers';
import EditCampus from './EditCampus';

export default class EditCampusContainer extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const campusId = Number(this.props.match.params.campusId);
    store.dispatch(fetchSelectedCampus(campusId))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    const selectedCampus = this.state.selectedCampus;
    const selectedStudent = this.state.selectedStudent
    return (
      <div>
      <EditCampus selectedStudent={selectedStudent} selectedCampus={selectedCampus} campuses={this.state.campuses} students={this.state.students} />
      </div>
    )
  }

}
