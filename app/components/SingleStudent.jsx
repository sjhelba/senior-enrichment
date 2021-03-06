import React, { Component } from 'react';
import store from '../store';
import {fetchSelectedStudent, fetchSelectedCampus} from '../reducers';
import { Link } from 'react-router-dom';

export default class SingleStudent extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const studentId = Number(this.props.match.params.studentId);
    store.dispatch(fetchSelectedStudent(studentId))
      .then(() => {
        store.dispatch(fetchSelectedCampus(this.state.selectedStudent.campusId))
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const selectedStudent = this.state.selectedStudent;
    const selectedCampus = this.state.selectedCampus;
    return (
      <div>
        <div>
          <h3>{selectedStudent.name}</h3>
          <h4>{`Email: ${selectedStudent.email || 'currently unprovided'}`}</h4>
          <h4><Link to={`/campuses/${selectedStudent.campusId}`}>{`Campus: ${selectedCampus.name}`}</Link></h4>
        </div>
        <Link to={`/students/edit/${selectedStudent.id}`}>edit</Link>
      </div>
    )
  }
}
