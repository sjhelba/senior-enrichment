import { combineReducers } from 'redux'
import students from './students';
import campuses from './campuses'
import selectedCampus from './selectedCampus'
import selectedStudent from './selectedStudent'


const rootReducer = combineReducers({
  students,
  campuses,
  selectedCampus,
  selectedStudent
});


export default rootReducer


// export action creators
export * from './students';
export * from './campuses';
export * from './selectedCampus';
export * from './selectedStudent';
