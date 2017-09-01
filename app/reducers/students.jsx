import axios from 'axios';

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS'
const ADD_STUDENT = 'ADD_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'
const EDIT_STUDENT = 'EDIT_STUDENT'


// ACTION CREATORS
export function getStudents (students) {
  return {
    type: GET_STUDENTS,
    students
  }
}

export function addStudent (student) {
  return {
    type: ADD_STUDENT,
    student
  }
}

export function removeStudent (id) {
  return {
    type: REMOVE_STUDENT,
    id
  }
}

export function editStudent (student){
  return {
    type: EDIT_STUDENT,
    student
  }
}

// THUNK CREATORS
export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
      .catch(err => console.error(err))
  }
}

export function createNewStudent (studentData) {
  return function thunk (dispatch) {
    return axios.post('./api/students', studentData)
      .then(res => res.data)
      .then(student => dispatch(addStudent(student)))
      .catch(err => console.error(err))
  }
}

export function deleteStudent (studentId) {
  return function thunk (dispatch) {
    return axios.delete(`./api/students/${studentId}`)
      .then(res => res.data)
      .then(id => dispatch(removeStudent(id)))
      .catch(err => console.error(err))
  }
}

export function updateStudent (studentData) {
  return function thunk (dispatch) {
    return axios.put(`http://localhost:1337/api/students/${studentData.id}`, studentData)
      .then(res => res.data)
      .then(student => {
        dispatch(editStudent(student))})
      .catch(err => console.error(err))
  }
}

// REDUCER
export default function studentsReducer (students = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...students, action.student];
    case REMOVE_STUDENT:
      return students.filter((student) => student.id !== action.id)
    case EDIT_STUDENT:
      return students.map((student) => {
        if (student.id === action.student.id) {
          return action.student;
        } else {
          return student;
        }
      })
    default:
      return students;
  }
}
