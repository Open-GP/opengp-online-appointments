import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DoctorView from './components/DoctorsView/DoctorView';
import PatientView from './components/PatientView/PatientView';
import PatientSurvey from './components/PatientView/PatientSurvey';
import Home from './components/Home/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/doctor">
          <DoctorView />
        </Route>
        <Route exact path="/patient-survey">
          <PatientSurvey />
        </Route>
        <Route exact path="/patient/:roomName?">
          <PatientView />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
