function NotificationCard({ notification }) {
  return (
    <div className="notification-card">
      <div className="card-top">
        <span className={`badge ${notification.Type?.toLowerCase()}`}>
          {notification.Type}
        </span>
        <span className="time">
          {new Date(notification.Timestamp).toLocaleString()}
        </span>
      </div>

      <h3>{notification.Message}</h3>

      <p>
        This notification is related to campus activity and has been fetched
        from the official notification API.
      </p>
    </div>
  );
}

export default NotificationCard;
