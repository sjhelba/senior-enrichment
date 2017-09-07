import React, { Component } from 'react';
import {createNewStudent, fetchStudents, deleteStudent} from '../reducers';
import store from '../store';
import { Link } from 'react-router-dom';

// import Axios from 'axios';

export default class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formHidden: true,
      nameInput: ''
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  toggleForm (){
    this.setState({formHidden: !this.state.formHidden})
  }

  // componentWillUpdate () {
  //   store.dispatch(fetchStudents())
  // }

  handleSubmit (event) {
    event.preventDefault()
    this.toggleForm();
    const name = event.target.name.value
    const campusId = Number(event.target.campusId.options[event.target.campusId.selectedIndex].value)
    store.dispatch(createNewStudent({
      name,
      campusId
    }))
    this.setState({
      nameInput: '',
    });
  }

  handleDelete (studentId){
    console.log(studentId, Number(studentId))
    store.dispatch(deleteStudent(studentId))
  }

  handleChange (event) {
    this.setState({
      nameInput: event.target.value,
    });
  }

  render() {
    const students = this.props.students;
    return (
      <div>
        <h3>STUDENTS</h3>
        <button onClick={this.toggleForm}>Add Student</button>
        <br />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Campus</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              console.log(student)
              return (
                <tr key={student.id}>
                <th>{index + 1}</th>
                <th><Link to={`/students/${student.id}`} >{student.name}</Link></th>
                <th><Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></th>
                <th>
                  <button onClick={() => this.handleDelete(student.id)}>X</button>
                </th>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div hidden={this.state.formHidden}>
          <form onSubmit={this.handleSubmit}>
              <h4>Name</h4>
              <input  onChange={this.handleChange} value={this.state.nameInput} placeholder="Student Name" name="name" />
              <h4>Campus</h4>
              <select name="campusId">
                {this.props.campuses.map((campus) => {
                  return <option value={campus.id} key={campus.id}>{campus.name}</option>
                })}
              </select>
              <button className="btn btn-primary" type="submit" >Submit</button>
          </form>
        </div>
      </div>
    )
  }

}
