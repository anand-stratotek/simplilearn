import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllCourses, getAllPurchasedCourses } from '../actions/courses';
import { Link } from 'react-router-dom';

const Overview = (props) => {
  const dispatch = useDispatch();
  const allcourses = useSelector((state) => state.courseReducer.courses);
  const userEmail = useSelector((state) => state.authReducer?.user?.email);
  const [courses, setcourses] = useState([]);

  useEffect(() => {
    dispatch(getAllCourses());
    dispatch(getAllPurchasedCourses(userEmail));
  }, []);

  useEffect(() => {
    if (allcourses) {
      setcourses(allcourses);
    }
  }, [allcourses]);

  // console.log('ALL COURSES=>', courses);

  const renderAllCourse = (courses) => {
    if (courses.length !== 0) {
      return courses.map((course) => {
        return (
          <>
            <div className='card' key={course?.id}>
              <img
                className='card-img-top'
                src={course?.thumbnailURL}
                alt='Card image cap'
                style={{ height: 150 }}
              />
              <div className='card-body'>
                <p
                  className='card-text'
                  style={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                  {course?.title}
                </p>
                <p
                  className='card-text'
                  style={{ textAlign: 'center', fontWeight: 'bold' }}
                >
                  Price:₹{course?.price}
                </p>
              </div>
              <div className='buy-button'>
                <Link
                  to={{ pathname: '/payment', state: { course } }}
                  type='button'
                  class='btn btn-primary '
                >
                  BUY
                </Link>
              </div>
            </div>
          </>
        );
      });
    } else {
      <div>NO COURSES AVALIABLE TO PURCHASE!!</div>;
    }
  };

  return (
    <>
      <div
        style={{
          margin: 30,
          display: 'grid',
          gridTemplateColumns: 'auto auto auto auto',
          gap: '10px',
        }}
      >
        {renderAllCourse(courses)}
      </div>
    </>
  );
};

Overview.propTypes = {};

export default Overview;
