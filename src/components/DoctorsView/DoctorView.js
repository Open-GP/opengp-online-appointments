import React, { useState } from 'react';
import randomString from 'random-string';
import PatientChoice from './PatientChoice';
import VideoStream from './VideoStream';

import FhirApi from '../../api/FhirApi';
import './DoctorView.scss';

const DoctorView = () => {
  const [patientInformation, setPatientInformation] = useState();

  const appointmentDetails = {
    id: randomString(12),
  };

  const onPatientChoice = (nhsNo) => FhirApi.getPatientInformation(nhsNo)
    .then(setPatientInformation);

  if (patientInformation) {
    return (
      <VideoStream
        roomName={`opengp-appointments-${appointmentDetails.id}`}
        patientInformation={patientInformation}
        appointmentId={appointmentDetails.id}
      />
    );
  }

  return <PatientChoice onChoice={onPatientChoice} />;
};

export default DoctorView;
