import React from "react";
import {fhirVersions, Patient} from "fhir-react";
import {Jutsu} from "react-jutsu";

const VideoStream = ({roomName, fhirResource, appointmentId}) => {
    const patientLink = `https://${window.location.hostname}/patient/${appointmentId}`;

    return <div className="doctors-view">
        <div className="sharing-link"> Link for the patient: <strong>{patientLink}</strong> or share code: <strong>{appointmentId}</strong> </div>
        <div className="video-container">
            <Jutsu roomName={roomName}/>
            <Patient fhirResource={fhirResource} fhirVersion={fhirVersions.STU3}/>
        </div>
    </div>;
};

export default VideoStream;