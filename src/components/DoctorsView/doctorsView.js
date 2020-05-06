import React, {useState} from "react";
import {Jutsu} from "react-jutsu";
import ChoosePatient from "./choosePatient";
import randomString from "random-string"

const DoctorsView = () => {
    const [started, setStarted] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState();
    const videoStream = ({roomName}) => <div> Share link with patient: {generateLink()} <Jutsu roomName={roomName}/></div>;

    const generateRoomDetails = () => {
      return {
          roomName: `opengp-${randomString(12)}`
      }
    };

    const generateLink = () => {
        return `http://${window.location.hostname}/patient/${generateRoomDetails().roomName}`
    };

    const onPatientChoice = (patientId) => {
        setStarted(true);
        setSelectedPatientId(patientId);
    };

    if (started) {
        const roomDetails = generateRoomDetails();
        return videoStream(roomDetails);
    } else {
        return <ChoosePatient onChoice={onPatientChoice}/>;
    }
};


export default DoctorsView;