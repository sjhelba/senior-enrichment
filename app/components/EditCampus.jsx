import React, { Component } from 'react';
import store from '../store';
import {updateCampus, updateStudent, fetchSelectedStudent, fetchSelectedCampus} from '../reducers';
import { Link } from 'react-router-dom';


export default class EditCampus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.selectedCampus.name,
      image: this.props.selectedCampus.image,
      students: this.props.students.filter((student) => student.campusId === this.props.selectedCampus.id),
      changesSavedHidden: true,
      addStudentForm: true,
      removeStudentForm: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.handleStudentAdd = this.handleStudentAdd.bind(this);
    this.toggleAddStudentForm = this.toggleAddStudentForm.bind(this);
    this.toggleRemoveStudentForm = this.toggleRemoveStudentForm.bind(this);
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
      .then(store.dispatch(fetchSelectedCampus(id)))
      .then(this.setState({
        name,
        image,
        changesSavedHidden: false,
      }
    ))
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

  handleStudentDelete (event, id) {
    event.preventDefault()
    const studentId = id
    console.log('sending to update:', {
      id: studentId,
      campusId: event.target.newCampusSelect.options[event.target.newCampusSelect.selectedIndex].value
    })
    store.dispatch(updateStudent({
      id: studentId,
      campusId: event.target.newCampusSelect.options[event.target.newCampusSelect.selectedIndex].value
    }))
      .then(this.setState({
        students: this.state.students.filter((student) => student.id !== studentId)
      }))
  }

  handleStudentAdd(event){
    event.preventDefault()
    const id = event.target.studentAdd.options[event.target.studentAdd.selectedIndex].value;
    store.dispatch(updateStudent({
      id,
      campusId: this.props.selectedCampus.id
    }))
      .then(store.dispatch(fetchSelectedStudent(id)))
      .then(this.setState({
        students: [...this.state.students, this.props.selectedStudent]
    }))
  }

  toggleAddStudentForm () {
    this.setState({
      addStudentForm: !this.state.addStudentForm
    })
  }

  toggleRemoveStudentForm (){
    this.setState({
      removeStudentForm: !this.state.removeStudentForm
    })
  }



  render() {
    const selectedCampus = this.props.selectedCampus;
    const campuses = this.props.campuses;
    const filteredStudents = this.state.students;
    const otherCampusStudents = this.props.students.filter((student) => student.campusId !== selectedCampus.id);
    return (
      <div>
      <Link to={`/campuses/${selectedCampus.id}`}>{'<== Back to campus details'}</Link>
        <div>

          <form onSubmit={this.handleSubmit}>
            <h4>Name</h4>
            <input onChange={this.handleNameChange} value={this.state.name} name="name" />
            <h4>Image</h4>
            <input onChange={this.handleImageChange} value={this.state.image} name="image" />
            <button className="btn btn-primary" type="submit">Submit Campus Changes</button>
            <p hidden={this.state.changesSavedHidden}>Changes Saved</p>
          </form>

            <div>
              <h4>Students</h4>
              <button onClick={this.toggleAddStudentForm}>{`Add Student to ${selectedCampus.name} Campus`}</button>
              <button onClick={this.toggleRemoveStudentForm}>{`Move a ${selectedCampus.name} Student to Another Campus`}</button>
              <div>
                <form hidden={this.state.addStudentForm} onSubmit={this.handleStudentAdd}>
                  <select name="studentAdd">
                    {otherCampusStudents.map((student) => {
                      return (
                        <option key={student.id} value={student.id}>{student.name}</option>
                      )
                    })}
                  </select>
                  <button className="btn btn-primary" type="submit">Add Student</button>
                </form>
              </div>
              <div hidden={this.state.removeStudentForm}>
                <ol>
                {
                  filteredStudents.map((student) => {
                    return (
                      <li key={student.id}>
                        <h4>{student.name}</h4>

                        <form onSubmit={(event) => this.handleStudentDelete(event, student.id)}>
                          <span >
                            <h5>Campus</h5>
                            <select name="newCampusSelect" defaultValue={selectedCampus.id}>
                              {campuses.map((campus) => {
                                return <option key={campus.id} value={campus.id}>{campus.name}</option>
                              })}
                            </select>
                            <button>Move Student</button>
                          </span>
                        </form>

                      </li>
                    )
                  })
                }
                </ol>
              </div>
            </div>

        </div>
      </div>
    )
  }
}

