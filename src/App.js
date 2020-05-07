import React from 'react';
import './App.scss';
import DoctorsView from "./components/DoctorsView/doctorsView";
import PatientView from "./components/PatientView/patientView";
import {Route, BrowserRouter, Switch} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path={"/doctor"}>
                  <DoctorsView/>
              </Route>
              <Route path={"/patient/:roomName"}>
                  <PatientView/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
