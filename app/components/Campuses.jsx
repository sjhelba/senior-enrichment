import React, { Component } from 'react';
// import {SingleCampus} from './SingleCampus'
import { NavLink, Link } from 'react-router-dom';
import {createNewCampus, fetchCampuses, deleteCampus, fetchSelectedCampus} from '../reducers';
import store from '../store';

export default class Campuses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addformHidden: true,
      nameInput: ''
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
  }

  toggleForm () {
    this.setState({addformHidden: !this.state.addformHidden});
  }

  handleSubmit (event) {
    event.preventDefault()
    this.toggleForm();
    store.dispatch(createNewCampus({name: event.target.name.value}))
    this.setState({
      nameInput: ''
    });
  }

  handleDelete (campusId){
    console.log('running')
    store.dispatch(deleteCampus(campusId))
  }

  handleChange (event) {
    this.setState({
      nameInput: event.target.value,
    });
  }

  render() {
    const campuses = this.props.campuses
    return (
      <div>
        <h3>CAMPUSES</h3>
        <div>
          <button onClick={this.toggleForm}>Add Campus on Newly Discovered Planet</button>
          <span hidden={this.state.addformHidden}>
            <form onSubmit={this.handleSubmit}>
              <h4>Campus:</h4>
              <input onChange={this.handleChange} placeholder="Campus Name" name ="name" value={this.state.nameInput} />
              <button>Submit</button>
            </form>
          </span>
        </div>
      <div>
      {campuses.map(campus => {
        return (
          <div key={campus.id} >
            <button onClick={() => this.handleDelete(campus.id)}>X</button>
            <NavLink to={`/campuses/${campus.id}`}>
            <h4>{campus.name}</h4>
            <img src={campus.image} height="200" width="400" />
            </NavLink>
          </div>
      )})}
      </div>
      </div>
    )
  }
}
