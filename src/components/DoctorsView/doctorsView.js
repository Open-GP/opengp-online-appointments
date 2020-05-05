import React from "react";
import {Jutsu} from "react-jutsu";

const DoctorsView = () => {
    return <div>
        <div>Select a patient and start a video call</div>
        <Jutsu roomName="testing-opengp-random"/>
    </div>
};

export default DoctorsView;