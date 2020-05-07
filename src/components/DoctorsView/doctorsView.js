import React, {useState} from "react";
import {Jutsu} from "react-jutsu";
import ChoosePatient from "./choosePatient";
import randomString from "random-string"

const DoctorsView = () => {
    const [started, setStarted] = useState(false);
    const videoStream = ({roomName}) => <div> Share link with patient: {patientLink} <Jutsu roomName={roomName}/></div>;

    const appointmentDetails = {
          id: randomString(12)
    };

    const patientLink = `http://${window.location.hostname}/patient/${appointmentDetails.id}`;

    const onPatientChoice = () => {
        setStarted(true);
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