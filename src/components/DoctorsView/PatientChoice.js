import React, {useEffect, useState} from "react";
import FhirApi from "../../api/FhirApi";

const PatientChoice = ({onChoice}) => {

    const [selectedChoice, setSelectedChoice] = useState();
    const [patients, setPatients] = useState([]);

    const onPatientChange = event => setSelectedChoice(event.target.value);

    const onClick = () => onChoice(selectedChoice);

    useEffect(() => {
       FhirApi.getPatientSummaries().then(patients => {
           setPatients(patients);
           setSelectedChoice(patients.length > 0 ? patients[0].nhsNo : undefined);
       });
    }, []);

    return <div>Select a patient and start a video call
        <div className="patient-selection">
            <div className={"select"}>
                <select onChange={onPatientChange} value={selectedChoice}>
                    {!selectedChoice && <option>Loading patients...</option>}
                    {patients.map(patient => <option value={patient.nhsNo} key={patient.nhsNo}>{patient.name}</option>)}
                </select>
            </div>
            <button className={"button is-link"} onClick={onClick} disabled={!selectedChoice}>Create video session</button>
        </div>
    </div>
};

export default PatientChoice;