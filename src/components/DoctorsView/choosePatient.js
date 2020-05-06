import React, {useState} from "react";

const ChoosePatient = ({onChoice}) => {

    const [selectedChoice, setSelectedChoice] = useState("1");

    const onPatientChange = (event) => {
        console.log(event.target.value);
        setSelectedChoice(event.target.value);
    };

    const onClick = () => {
        onChoice(selectedChoice);
    };

    return <div>Select a patient and start a video call
        <select onChange={onPatientChange} value={selectedChoice}>
            <option value={"1"}>Test Testerson</option>
            <option value={"2"}>Someone else</option>
        </select>
        <button onClick={onClick}>Create video session</button>
    </div>
};

export default ChoosePatient;