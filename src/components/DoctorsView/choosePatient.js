import React, {useState} from "react";
import Api from "../../api/api";

const ChoosePatient = ({onChoice}) => {

    const [selectedChoice, setSelectedChoice] = useState("1");

    const onPatientChange = (event) => {
        console.log(event.target.value);
        setSelectedChoice(event.target.value);
    };

    const onClick = () => {
        onChoice(selectedChoice);
    };

    const patients = new Api().getPatients();

    return <div>Select a patient and start a video call
        <div className="patient-selection">
            <div className={"select"}>
                <select onChange={onPatientChange} value={selectedChoice}>
                    {patients.map(patient => <option value={patient.id}>{patient.name}</option>)}
                </select>
            </div>
            <button className={"button is-link"} onClick={onClick}>Create video session</button>
        </div>
    </div>
};

export default ChoosePatient;