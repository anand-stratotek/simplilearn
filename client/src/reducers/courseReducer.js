import {
  LOAD_COURSES,
  COURSE_ERROR,
  LOAD_PURCHASED_COURSES,
} from '../actions/types';

const initialState = {
  loading: true,
  courses: [],
  course: null,
  error: [],
  purchasedCourses: [],
};

export default function (state = { initialState }, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case LOAD_PURCHASED_COURSES:
      return {
        ...state,
        purchasedCourses: payload,
        loading: false,
      };
    case COURSE_ERROR:
      return {
        ...state,
        loading: false,
        courses: [],
        error: payload,
      };
    default:
      return state;
  }
}
