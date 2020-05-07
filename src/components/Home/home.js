import {Link, useLocation} from "react-router-dom";
import React, {useState} from "react";
import "../../App.scss"
import "./home.scss"

const PatientRoomName = () => {
    const [roomName, setRoomName] = useState("");
    return <>
        <div className={"label"}>Enter room name you received from the doctor</div>
        <input className="input" type="text" placeholder="Enter room name" value={roomName}
               onChange={({target: {value}}) => setRoomName(value)}/>
        <div className={"level"}>
            <Link to={`/patient/${roomName}`}>
                <button className={"button is-warning"}>Connect to online consultation</button>
            </Link>
        </div>
    </>;
};


const Home = () => {
    const {hash} = useLocation();

    const isPatient = hash === "#patient";

    return <div>
        <div className={"columns"}>
            <div className={"column is-half is-offset-one-quarter top"}> Are you a ... ?</div>
        </div>
        <div className={"columns"}>
            <div className={"column is-offset-4 is-4"}>
                <div className={"level"}>
                    <div className={"level-left"}>
                        <Link to={"/doctor"}>
                            <button className={"button is-info is-light is-medium"} disabled={isPatient}> Doctor
                            </button>
                        </Link>
                    </div>
                    <div className={"level-right"}>
                        <Link to={"#patient"}>
                            <button className={"button is-success is-light is-medium"}> Patient</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        {isPatient && <div className={"columns"}>
            <div className={"column is-offset-4 is-4"}><PatientRoomName/></div>
        </div>}
    </div>
};

export default Home;