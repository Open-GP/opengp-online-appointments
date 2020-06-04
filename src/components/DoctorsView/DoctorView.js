import React, {useState} from "react";
import PatientChoice from "./PatientChoice";
import VideoStream from "./VideoStream";

import randomString from "random-string"
import FhirApi from "../../api/FhirApi";
import "./DoctorView.css"

const DoctorView = () => {
    const [fhirResource, setFhirResource] = useState();

    const appointmentDetails = {
        id: randomString(12)
    };

    const onPatientChoice = nhsNo => FhirApi.getFhirPatient(nhsNo).then(setFhirResource);

    if (fhirResource) {
        return <VideoStream roomName={`opengp-appointments-${appointmentDetails.id}`}
                            fhirResource={fhirResource}
                            appointmentId={appointmentDetails.id}/>;
    } else {
        return <PatientChoice onChoice={onPatientChoice}/>;
    }
};


export default DoctorView;