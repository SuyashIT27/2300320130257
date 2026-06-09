import NotificationCard from "./NotificationCard";

function NotificationList({ notifications }) {
  if (notifications.length === 0) {
    return <p className="empty">No notifications found.</p>;
  }

  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <NotificationCard key={notification.ID} notification={notification} />
      ))}
    </div>
  );
}

export default NotificationList;
