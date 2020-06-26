import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import '../../App.scss';
import './home.scss';

const Home = () => {
  const { hash } = useLocation();

  const isPatient = hash === '#patient';

  return (
    <div>
      <div className="columns">
        <div className="column is-half is-offset-one-quarter top"> Are you a ... ?</div>
      </div>
      <div className="columns">
        <div className="column is-offset-4 is-4">
          <div className="level">
            <div className="level-left">
              <Link to="/doctor">
                <button type="button" className="button is-info is-light is-medium" disabled={isPatient}>
                  Doctor
                </button>
              </Link>
            </div>
            <div className="level-right">
              <Link to="/patient-survey">
                <button type="button" className="button is-success is-light is-medium"> Patient</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
