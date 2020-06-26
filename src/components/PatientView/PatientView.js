import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Jutsu } from 'react-jutsu';
import './PatientView.scss';

const PatientRoomName = () => {
  const [roomName, setRoomName] = useState('');
  return (
    <>
      <div className="label">Enter room name you received from the doctor</div>
      <input
        className="input"
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={({ target: { value } }) => setRoomName(value)}
      />
      <div className="level">
        <Link to={`/patient/${roomName}`}>
          <button type="button" className="button is-warning">Connect to online consultation</button>
        </Link>
      </div>
    </>
  );
};

const PatientView = () => {
  const { roomName } = useParams();
  const hasRoomNumber = roomName !== undefined;

  return (
    hasRoomNumber
      ? <Jutsu roomName={`opengp-appointments-${roomName}`} />
      : (
        <div className="columns">
          <div className="column is-offset-4 is-4"><PatientRoomName /></div>
        </div>
      )
  );
};

export default PatientView;
