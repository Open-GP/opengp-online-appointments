import React, {useState} from "react";
import PatientChoice from "./PatientChoice";
import VideoStream from "./VideoStream";

import randomString from "random-string"
import FhirApi from "../../api/FhirApi";
import "./DoctorView.css"

const DoctorView = () => {
    const [patientInformation, setPatientInformation] = useState();

    const appointmentDetails = {
        id: randomString(12)
    };

    const onPatientChoice = nhsNo => FhirApi.getPatientInformation(nhsNo).then(setPatientInformation);

    if (patientInformation) {
        return <VideoStream roomName={`opengp-appointments-${appointmentDetails.id}`}
                            patientInformation={patientInformation}
                            appointmentId={appointmentDetails.id}/>;
    } else {
        return <PatientChoice onChoice={onPatientChoice}/>;
    }
};


export default DoctorView;