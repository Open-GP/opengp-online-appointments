import React from 'react';
import './App.scss';
import DoctorsView from "./components/DoctorsView/doctorsView";
import PatientView from "./components/PatientView/patientView";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home/home";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path={"/"}>
                  <Home/>
              </Route>
              <Route exact path={"/doctor"}>
                  <DoctorsView/>
              </Route>
              <Route exact path={"/patient/:roomName"}>
                  <PatientView/>
              </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
