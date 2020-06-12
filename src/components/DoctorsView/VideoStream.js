import React from "react";
import {fhirVersions, Patient, MedicationStatement} from "fhir-react";
import {Jutsu} from "react-jutsu";
import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';

const VideoStream = ({roomName, patientInformation, appointmentId}) => {
    const patientLink = `https://${window.location.hostname}/patient/${appointmentId}`;

    const {fhirPatient, fhirMedicationStatement} = patientInformation;

    return <div className="doctors-view">
        <div className="video-container">
            <Jutsu roomName={roomName}/>
            <div className="sharing-link"> Link for the patient: <strong>{patientLink}</strong> or share code: <strong>{appointmentId}</strong> </div>
        </div>
        <div className="patient-data-container">
            <Patient fhirResource={fhirPatient} fhirVersion={fhirVersions.STU3}/>
            <MedicationStatement fhirResource={fhirMedicationStatement} fhirVersion={fhirVersions.STU3}/>
        </div>
    </div>;
};

export default VideoStream;