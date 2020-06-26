import React from 'react';
import PropTypes from 'prop-types';
import { fhirVersions, Patient, MedicationStatement } from 'fhir-react';
import { Jutsu } from 'react-jutsu';
import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';

const VideoStream = ({ roomName, patientInformation, appointmentId }) => {
  const patientLink = `https://${window.location.hostname}/patient/${appointmentId}`;

  const { fhirPatient, fhirMedicationStatements } = patientInformation;

  return (
    <div className="doctors-view">
      <div className="video-container">
        <Jutsu roomName={roomName} />
        <div className="sharing-link">
          {' '}
          Link for the patient:
          <strong>{patientLink}</strong>
          {' '}
          or share code:
          <strong>{appointmentId}</strong>
        </div>
      </div>
      <div className="patient-data-container">
        <Patient fhirResource={fhirPatient} fhirVersion={fhirVersions.STU3} />
        <div className="patient-Mediation-Statements">
          {fhirMedicationStatements
            .map((fhirMedicationStatement) => (
              <MedicationStatement
                fhirResource={fhirMedicationStatement}
                key={fhirMedicationStatement.id}
                fhirVersion={fhirVersions.STU3}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

VideoStream.propTypes = {
  roomName: PropTypes.string.isRequired,
  patientInformation: PropTypes.shape({
    fhirPatient: PropTypes.object,
    fhirMedicationStatements: PropTypes.array,
  }).isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default VideoStream;
