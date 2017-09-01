import React, { Component } from 'react';
import store from '../store';
import {fetchSelectedStudent, fetchSelectedCampus} from '../reducers';
import EditStudent from './EditStudent';

export default class EditStudentContainer extends Component {
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
    this.unsubscribe();
  }


  render() {
    const selectedStudent = this.state.selectedStudent;
    const selectedCampus = this.state.selectedCampus;
    return (
      <div>
      <EditStudent selectedStudent={selectedStudent} selectedCampus={selectedCampus} campuses={this.state.campuses} students={this.state.students} />
      </div>
    )
  }

}
