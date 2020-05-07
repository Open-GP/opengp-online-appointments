import React, {useState} from "react";
import {Jutsu} from "react-jutsu";
import ChoosePatient from "./choosePatient";
import randomString from "random-string"
import { Patient, fhirVersions } from 'fhir-react';
import Api from "../../api/api";

const DoctorsView = () => {
    const [selectedPatientId, setSelectedPatientId] = useState();
    const [started, setStarted] = useState(false);
    const videoStream = ({roomName}) => {
        const fhirResource = new Api().getPatient(selectedPatientId);
        return <div> Share link with patient: {patientLink}
        <Jutsu roomName={roomName}/>
        <Patient fhirResource={fhirResource} fhirVersion={fhirVersions.STU3} />
        </div>;
    };

    const appointmentDetails = {
          id: randomString(12)
    };

    const patientLink = `http://${window.location.hostname}/patient/${appointmentDetails.id}`;

    const onPatientChoice = (id) => {
        setStarted(true);
        setSelectedPatientId(id)
    };

    if (started) {
        const roomDetails = {
            roomName: `opengp-appointments-${appointmentDetails.id}`
        };
        return videoStream(roomDetails);
    } else {
        return <ChoosePatient onChoice={onPatientChoice}/>;
    }
};


export default DoctorsView;