import React, { Component } from 'react';
import store from '../store';
import {fetchSelectedCampus} from '../reducers'
import { Link } from 'react-router-dom';


export default class SingleCampus extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
  }


  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    const campusId = Number(this.props.match.params.campusId);
    const thunk = fetchSelectedCampus(campusId);
    store.dispatch(thunk);
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const selectedCampus = this.state.selectedCampus;
    const students = this.state.students;
    const filteredStudents = students.filter(student => student.campusId === selectedCampus.id);
    return (
      <div>
        <h1>{`${selectedCampus.name} Campus`}</h1>
        <Link to={`/campuses/edit/${selectedCampus.id}`}>edit</Link>
        <img src={selectedCampus.image} height="200" width="400" />
        <ol>
          {
            filteredStudents.map((student) => {
              return (
                <li key={student.id}>
                  <h4><Link to={`/students/${student.id}`}>{student.name}</Link></h4>
                </li>
              )
            })
          }
        </ol>
      </div>
    )
  }
}
