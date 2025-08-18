import React, { useState, useContext } from 'react';
import { teacherService } from '../services/teacherService';
import { AuthContext } from '../context/AuthContext';

const ClassControl = () => {
  const { user } = useContext(AuthContext);
  const [classActive, setClassActive] = useState(false);

  const handleStart = () => {
    teacherService.startClass(user.id)
      .then(() => setClassActive(true))
      .catch(err => console.error(err));
  };

  const handleStop = () => {
    teacherService.stopClass(user.id)
      .then(() => setClassActive(false))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Class Control</h2>
      <div>
        {classActive ? (
          <button onClick={handleStop} className="bg-red-500 text-white px-4 py-2 rounded">
            Stop Class
          </button>
        ) : (
          <button onClick={handleStart} className="bg-green-500 text-white px-4 py-2 rounded">
            Start Class
          </button>
        )}
      </div>
    </div>
  );
};

export default ClassControl;

