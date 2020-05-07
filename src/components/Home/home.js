import {Link, useLocation} from "react-router-dom";
import React, {useState} from "react";

const PatientRoomName = () => {
    const [roomName, setRoomName] = useState("");
    return <div>
        <div className={"label"}>Enter room name you received from the doctor</div>
        <input className="input" type="text" placeholder="Enter room name" value={roomName}
               onChange={({target: {value}}) => setRoomName(value)}/>
        <Link to={`/patient/${roomName}`}>
            <button className={"button"}>Connect</button>
        </Link>
    </div>;
};


const Home = () => {
    const {hash} = useLocation();

    const isPatient = hash === "#patient";

    return <div><h1> Are you a ... ?</h1>
        <Link to={"/doctor"}>
            <button className={"button"} disabled={isPatient}> Doctor</button>
        </Link>

        <Link to={"#patient"}>
            <button className={"button"} disabled={isPatient}> Patient</button>
        </Link>

        {isPatient && <PatientRoomName/>}
    </div>
};

export default Home;