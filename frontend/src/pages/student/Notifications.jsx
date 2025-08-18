import React, { useEffect, useState, useContext } from 'react';
import { notificationService } from '../services/notificationService';
import { AuthContext } from '../context/AuthContext';
import { NotificationCard } from '../components/NotificationCard';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationService.getNotifications(user.id)
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      {notifications.map((note, idx) => (
        <NotificationCard key={idx} title={note.title} message={note.message} />
      ))}
    </div>
  );
};

export default Notifications;
