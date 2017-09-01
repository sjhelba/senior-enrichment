import axios from 'axios';
import getSelectedCampus from './index';

// ACTION TYPES
const GET_CAMPUSES = 'GET_CAMPUSES'
const ADD_CAMPUS = 'ADD_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'
const EDIT_CAMPUS = 'EDIT_CAMPUS'

// ACTION CREATORS
export function getCampuses (campuses) {
  const action = {type: GET_CAMPUSES, campuses};
  return action;
}

export function addCampus (campus) {
  return {
    type: ADD_CAMPUS,
    campus
  }
}

export function removeCampus (id) {
  return {
    type: REMOVE_CAMPUS,
    id
  }
}

export function editCampus (campus){
  return {
    type: EDIT_CAMPUS,
    campus
  }
}

// THUNK CREATORS
export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(getCampuses(campuses)))
      .catch(err => console.error(err))
  }
}

export function createNewCampus (campusData) {
  return function thunk (dispatch) {
    return axios.post('/api/campuses', campusData)
      .then(res => res.data)
      .then(campus => dispatch(addCampus(campus)))
      .catch(err => console.error(err))
  }
}

export function deleteCampus (campusId) {
  return function thunk (dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(() => dispatch(removeCampus(campusId)))
      .catch(err => console.error(err))
  }
}

export function updateCampus (campusData) {
  return function thunk (dispatch) {
    console.log('campus data I\'m passing to back', campusData)
    return axios.put(`http://localhost:1337/api/campuses/${campusData.id}`, campusData)
      .then(res => res.data)
      .then(campus => {
        console.log('campus', campus)
        dispatch(editCampus(campus))
      })
      .catch(err => console.error(err))
  }
}

// REDUCER
export default function campusesReducer (campuses = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...campuses, action.campus];
    case REMOVE_CAMPUS:
      return campuses.filter((campus) => campus.id !== action.id)
    case EDIT_CAMPUS:
      return campuses.map((campus) => {
        if (campus.id === action.campus.id) {
          return action.campus;
        } else {
          return campus;
        }
      })
    default: return campuses
  }
}

