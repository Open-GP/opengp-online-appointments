import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FhirApi from '../../api/FhirApi';

const PatientChoice = ({ onChoice }) => {
  const [selectedChoice, setSelectedChoice] = useState();
  const [patients, setPatients] = useState([]);

  const onPatientChange = (event) => setSelectedChoice(event.target.value);

  const onClick = () => onChoice(selectedChoice);

  useEffect(() => {
    FhirApi.getPatientSummaries().then((patientSummaries) => {
      setPatients(patientSummaries);
      setSelectedChoice(
        patientSummaries.length > 0 ? patientSummaries[0].nhsNo : undefined,
      );
    });
  }, []);

  return (
    <div>
      Select a patient and start a video call
      <div className="patient-selection">
        <div className="select">
          <select onChange={onPatientChange} value={selectedChoice}>
            {!selectedChoice && <option>Loading patients...</option>}
            {patients.map((patient) => (
              <option value={patient.nhsNo} key={patient.nhsNo}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="button is-link"
          onClick={onClick}
          disabled={!selectedChoice}
        >
          Create video session
        </button>
      </div>
    </div>
  );
};

PatientChoice.propTypes = {
  onChoice: PropTypes.func.isRequired,
};

export default PatientChoice;
