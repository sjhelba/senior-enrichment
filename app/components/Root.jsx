import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import CampusesContainer from './CampusesContainer'
import StudentsContainer from './StudentsContainer'
import EditCampusContainer from './EditCampusContainer'
import EditStudentContainer from './EditStudentContainer'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent'
import store from '../store';
import { fetchCampuses, fetchStudents } from '../reducers';

export default class Root extends Component {

  componentDidMount () {
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    const studentsThunk = fetchStudents();
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <h1>Margaret Hamilton Interplanetary Academy of JavaScript</h1>
          <div>
            <Home />
          </div>
          <div>
            <Route exact path='/campuses' component={CampusesContainer} />
            <Route exact path='/students' component={StudentsContainer} />
            <Route exact path='/students/:studentId' component={SingleStudent} />
            <Route exact path='/campuses/:campusId' component={SingleCampus} />
            <Route path='/students/edit/:studentId' component={EditStudentContainer}/>
            <Route path='/campuses/edit/:campusId' component={EditCampusContainer}/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
