import React from "react";
import {fhirVersions, Patient, MedicationStatement} from "fhir-react";
import {Jutsu} from "react-jutsu";
import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';

const VideoStream = ({roomName, patientInformation, appointmentId}) => {
    const patientLink = `https://${window.location.hostname}/patient/${appointmentId}`;

    const {fhirPatient, fhirMedicationStatements} = patientInformation;

    return <div className="doctors-view">
        <div className="video-container">
            <Jutsu roomName={roomName}/>
            <div className="sharing-link"> Link for the patient: <strong>{patientLink}</strong> or share code: <strong>{appointmentId}</strong> </div>
        </div>
        <div className="patient-data-container">
            <Patient fhirResource={fhirPatient} fhirVersion={fhirVersions.STU3}/>
            <div className="patient-Mediation-Statements">
            {fhirMedicationStatements.map((fhirMedicationStatement, index) =>
                <MedicationStatement fhirResource={fhirMedicationStatement} key={index} fhirVersion={fhirVersions.STU3}/>   
            )}
            </div>
        </div>
    </div>;
};

export default VideoStream;