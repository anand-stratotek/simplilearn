import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import store from './store';
import setToken from './utils/setToken';
import PrivateRoute from './routing/PrivateRoute';

//Importing from components
import Navigation from './components/layout/Navigation';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/layout/Home';
import Overview from './components/Overview';
import Alert from './components/layout/Alert';
import PaymentPage from './components/PaymentPage';
import { loadUser } from './actions/auth';
import CustomPayment from './components/payment/CustomPayment';
import PurchasedCourses from './components/payment/PurchasedCourses';
import PurchasedCourseDetail from './components/payment/PurchasedCourseDetail';

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Navigation />
        <Alert />
        <section className='container'>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/overview' component={Overview} />
            <PrivateRoute exact path='/payment' component={CustomPayment} />
            <PrivateRoute
              exact
              path='/purchased-courses'
              component={PurchasedCourses}
            />
            <PrivateRoute
              exact
              path='/purchased-courses-detail'
              component={PurchasedCourseDetail}
            />
          </Switch>
        </section>
      </Router>
    </>
  );
}

export default App;
