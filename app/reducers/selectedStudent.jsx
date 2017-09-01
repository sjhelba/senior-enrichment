import axios from 'axios';

// ACTION TYPES
const GET_SELECTED_STUDENT = 'GET_SELECTED_STUDENT'


// ACTION CREATORS
export function getSelectedStudent(student) {
  return {type: GET_SELECTED_STUDENT, student};
}


// THUNK CREATORS
export function fetchSelectedStudent (studentId) {
  return function thunk (dispatch) {
    return axios.get(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(student => dispatch(getSelectedStudent(student)))
      .catch((err) => console.error(err))
}}

// REDUCER
export default function selectedStudentReducer (student = {}, action) {
  switch (action.type) {
    case GET_SELECTED_STUDENT:
      return action.student;
    default: return student;
  }
}

