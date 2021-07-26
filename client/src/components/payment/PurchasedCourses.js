import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const PurchasedCourses = ({ location }) => {
  const courses = location?.state?.purchasedCourses;
  const [purchasedCourses, setpurchasedCourses] = useState([]);

  useEffect(() => {
    if (courses) {
      const data = _.uniqBy(courses, 'courseId');
      setpurchasedCourses(data);
    }
  }, [courses]);
  //   console.log('PURCHASED COURSES=>', purchasedCourses);

  const renderPurchasedCourses = (purchasedCourses) => {
    if (purchasedCourses) {
      return purchasedCourses.map((course) => {
        return (
          <div>
            <Link>{course.courseId}</Link>
          </div>
        );
      });
    } else {
      return <div>No Courses Purchased</div>;
    }
  };

  return (
    <div>
      <div>Course Purchased</div>
      {renderPurchasedCourses(purchasedCourses)}
    </div>
  );
};

export default PurchasedCourses;
