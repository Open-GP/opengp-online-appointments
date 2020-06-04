import React, {useState} from "react";
import ChoosePatient from "./choosePatient";
import randomString from "random-string"
import Api from "../../api/api";
import "./DoctorsView.css"
import VideoStream from "./VideoStream";

const DoctorsView = () => {
    const [fhirResource, setFhirResource] = useState();

    const appointmentDetails = {
        id: randomString(12)
    };

    const onPatientChoice = nhsNo => Api.getFhirPatient(nhsNo).then(setFhirResource);

    if (fhirResource) {
        return <VideoStream roomName={`opengp-appointments-${appointmentDetails.id}`}
                            fhirResource={fhirResource}
                            appointmentId={appointmentDetails.id}/>;
    } else {
        return <ChoosePatient onChoice={onPatientChoice}/>;
    }
};


export default DoctorsView;