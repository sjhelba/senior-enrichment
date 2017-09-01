import React, { Component } from 'react';
import store from '../store';
import {updateStudent} from '../reducers';
import { Link } from 'react-router-dom';


export default class EditStudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.selectedStudent.name,
      email: this.props.selectedStudent.email,
      campusId: this.props.selectedStudent.campusId,
      changesSavedHidden: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const campusId = Number(event.target.campusId.options[event.target.campusId.selectedIndex].value)
    const id = this.props.selectedStudent.id
    store.dispatch(updateStudent({
      id,
      name,
      email,
      campusId
    }))
    this.setState({name, email, campusId, changesSavedHidden: false});
  }

  handleNameChange (event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEmailChange (event) {
    this.setState({
      email: event.target.value
    });
  }

  handleCampusChange (event) {
    this.setState({
      campusId: event.target.options[event.target.selectedIndex].value,
    });
  }

  render() {
    const selectedStudent = this.props.selectedStudent;
    const campuses = this.props.campuses;
    return (
      <div>
      <Link to={`/students/${selectedStudent.id}`}>{`Back to ${selectedStudent.name} details`}</Link>
        <div>
          <form onSubmit={this.handleSubmit}>

            <h4>Name</h4>
            <input onChange={this.handleNameChange} value={this.state.name} name="name" />
            <h4>Email</h4>
            <input onChange={this.handleEmailChange} value={this.state.email} name="email" />

            <h4>Campus</h4>
            <select name="campusId" onChange={this.handleCampusChange} defaultValue={this.state.campusId}>
              {campuses.map((campus) => {
                  return <option value={campus.id} key={campus.id}>{campus.name}</option>
              })}
            </select>

            <button>Submit</button>
            <p hidden={this.state.changesSavedHidden}>Changes Saved</p>
          </form>
        </div>
      </div>
    )
  }
}
