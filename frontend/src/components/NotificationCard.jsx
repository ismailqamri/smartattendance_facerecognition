import React from 'react';

export const NotificationCard = ({ title, message }) => (
  <div className="border p-4 mb-3 rounded shadow-sm bg-yellow-50">
    <h3 className="font-bold">{title}</h3>
    <p>{message}</p>
  </div>
);
