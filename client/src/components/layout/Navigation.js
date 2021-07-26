import React from 'react';
import PropTypes from 'prop-types';
import { Nav, Navbar } from 'react-bootstrap';
import { logout } from '../../actions/auth';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Navigation = ({ logout, auth: { isAuth, isAdmin } }) => {
  const purchasedCourses = useSelector(
    (state) => state.courseReducer?.purchasedCourses
  );
  const authLinks = () => {
    return (
      <>
        <Navbar bg='light' expand='lg' sticky='top'>
          <Link to='/overview'>
            <img src={logo} alt='logo of ipl' style={{ width: 100 }} />
          </Link>
          <Link
            to={{ pathname: '/purchased-courses', state: { purchasedCourses } }}
          >
            Purchased Courses
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Nav.Link>
            <i class='fas fa-sign-out-alt' onClick={(e) => logout()}>
              LogOut
            </i>
          </Nav.Link>
        </Navbar>
      </>
    );
  };

  const nonAuthLinks = () => {
    return (
      <>
        <Navbar bg='light' expand='lg' sticky='top'>
          <Link to='/home'>
            <img
              src={logo}
              alt='logo of ipl'
              style={{ width: '100px', height: '70px' }}
            />
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'></Nav>
          </Navbar.Collapse>
          <Nav.Link>
            <Link to='/register'>
              <i class='fas fa-cash-register'>Register</i>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to='/login'>
              <i class='fas fa-sign-out-alt'>Login</i>
            </Link>
          </Nav.Link>
        </Navbar>
      </>
    );
  };

  return <>{isAuth ? authLinks() : nonAuthLinks()}</>;
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Navigation);
