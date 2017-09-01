import React, { Component } from 'react';
import store from '../store';
import {updateCampus, updateStudent, fetchSelectedStudent} from '../reducers';
import { Link } from 'react-router-dom';


export default class EditCampus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.selectedCampus.name,
      image: this.props.selectedCampus.image,
      students: this.props.students.filter((student) => student.campusId === this.props.selectedCampus.id),
      changesSavedHidden: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleStudentsChange = this.handleStudentsChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault()
    const name = event.target.name.value
    const image = event.target.image.value
    const id = this.props.selectedCampus.id
    store.dispatch(updateCampus({
      id,
      name,
      image
    }))
    this.setState({name, image, changesSavedHidden: false});
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  handleImageChange (event) {
    this.setState({
      image: event.target.value
    });
  }

  handleStudentDelete (event) {
    const studentId = event.target.studentMove.value
    store.dispatch(updateStudent({
      id: studentId,
      campusId: event.target.newCampusSelect.options[event.target.newCampusSelect.selectedIndex].value
    }))
      .then(this.setState({
        students: this.state.students.filter((student) => student.id !== studentId)
      }))
  }

  handleStudentAdd(event){
    const id = event.target.studentAdd.options[event.target.studentAdd.selectedIndex].value;
    store.dispatch(updateStudent({
      id,
      campusId: this.props.selectedCampus.id
    }))
      .then(dispatch(fetchSelectedStudent(id)))
      .then(this.setState({
        students: [...this.state.students, this.props.selectedStudent]
    }))
  }

  render() {
    const selectedCampus = this.props.selectedCampus;
    const campuses = this.props.campuses;
    const filteredStudents = this.state.students;
    const otherCampusStudents = this.props.students.filter((student) => student.campusId !== selectedCampus.id);
    return (
      <div>
      <Link to={`/campuses/${selectedCampus.id}`}>{`Back to ${selectedCampus.name} details`}</Link>
        <div>
          <form onSubmit={this.handleSubmit}>

            <h4>Name</h4>
            <input onChange={this.handleNameChange} value={this.state.name} name="name" />
            <h4>Image</h4>
            <input onChange={this.handleImageChange} value={this.state.image} name="image" />

            <h4>Students</h4>
            <button onClick={this.toggleAddStudentForm}>{`Move Student to ${selectedCampus.name} Campus`}</button>
              <ol>
              {
                filteredStudents.map((student) => {
                  return (
                    <li key={student.id}>
                      <h4>{student.name}</h4>
                      <form onSubmit={this.handleStudentDelete} name="studentMove" value={student.id}>
                        <h5>Campus</h5>
                        <select name="newCampusSelect" defaultValue={selectedCampus.id}>
                          {campuses.map((campus) => {
                            return <option value={campus.id}>{campus.name}</option>
                          })}
                        </select>
                        <button>Move Student</button>
                      </form>
                    </li>
                  )
                })
              }
            </ol>
            <form onSubmit={this.handleStudentAdd}>
              <select name="studentAdd">
                {otherCampusStudents.map((student) => {
                  return (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  )
                })}
              </select>
              <button>Add Student</button>
            </form>
            <button>Submit Campus Changes</button>
            <p hidden={this.state.changesSavedHidden}>Changes Saved</p>
          </form>
        </div>
      </div>
    )
  }
}

