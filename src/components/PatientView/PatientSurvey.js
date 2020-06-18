import React  from "react";
import { useHistory } from "react-router-dom";
import * as Survey from "survey-react";
import {Transform} from '../../utils/FhirQuestionnaire/ToSurvey'
import Questions from './SampleFhirQuestionnaire.json';
import "survey-react/survey.css";


const PatientSurvey = () => {
    var questions = Transform(Questions);
    let model = new Survey.Model(questions);
    let history = useHistory();

    const onComplete = (survey, options) =>{
        console.log("Survey results: " + JSON.stringify(survey.data));
        history.push("/patient/#survey-complete")
    }

    return (
        <div className="patient-survey-container">
            <h3>Please answer the following questions:</h3>
            <Survey.Survey model={model} onComplete={onComplete} showProgressBar="top"/>
        </div>
    );
};

export default PatientSurvey;