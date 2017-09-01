import axios from 'axios';

// ACTION TYPES
const GET_SELECTED_CAMPUS = 'GET_SELECTED_CAMPUS'


// ACTION CREATORS
export function getSelectedCampus(campus) {
  return {type: GET_SELECTED_CAMPUS, campus};
}


// THUNK CREATORS
export function fetchSelectedCampus (campusId) {
  return function thunk (dispatch) {
    return axios.get(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(campus => dispatch(getSelectedCampus(campus)))
      .catch((err) => console.error(err))
}}

// REDUCER
export default function selectedCampusReducer (campus = {}, action) {
  switch (action.type) {
    case GET_SELECTED_CAMPUS:
      return action.campus;
    default: return campus;
  }
}

