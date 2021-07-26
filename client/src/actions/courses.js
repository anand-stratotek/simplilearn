import axios from 'axios';
import { LOAD_COURSES, COURSE_ERROR, LOAD_PURCHASED_COURSES } from './types';

//Loading  all Matches information
export const getAllCourses = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json'
    );
    dispatch({
      type: LOAD_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: {
        mgs: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const purchaseCourse = (data) => async (dispatch) => {
  // console.log('DATA=>', data);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('api/payment/purchase-course', data, config);
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: {
        mgs: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
export const getAllPurchasedCourses = (email) => async (dispatch) => {
  // console.log('DATA=>', data);

  const data = {
    email,
  };
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('api/payment/purchased-courses', data, config);
    dispatch({
      type: LOAD_PURCHASED_COURSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_ERROR,
      payload: {
        mgs: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
