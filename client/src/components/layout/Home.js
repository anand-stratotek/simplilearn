import React from 'react';
// import Particles from 'react-particles-js';
import logo from '../../images/logo.png';
import './Home.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
    },
    size: {
      value: 6,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
        color: '#11111',
      },
    },
  },
};

const Home = () => {
  return (
    <>
      {/* <Particles id='particles-js' params={particlesOptions} /> */}
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <div className='logo-login'>
              <img src={logo} style={{ width: 200 }} />
            </div>
            <h1 className='x-large'>Welcome to Simplilearn Hackathon</h1>
            <p className='lead'>Created by Anand Gautam</p>
          </div>
        </div>
      </section>
    </>
  );
};

Home.propTypes = {};

export default Home;
