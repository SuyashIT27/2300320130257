import { useEffect, useState } from "react";
import NotificationList from "../components/NotificationList";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const TOKEN = "PASTE_YOUR_ACCESS_TOKEN_HERE";

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);

      const response = await fetch(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      const data = await response.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.log("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }

  const topNotifications = [...notifications]
    .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp))
    .slice(0, 10);

  const filteredNotifications = topNotifications.filter((item) => {
    if (filter === "all") return true;
    return item.Type?.toLowerCase() === filter;
  });

  return (
    <div className="dashboard">
      <div className="hero">
        <h1>Campus Notifications</h1>
        <p>
          Stay updated with important campus alerts, results, events and
          placements.
        </p>
      </div>

      <div className="filter-box">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("result")}>Result</button>
        <button onClick={() => setFilter("event")}>Event</button>
        <button onClick={() => setFilter("placement")}>Placement</button>
      </div>

      {loading ? (
        <h2 className="loading">Loading notifications...</h2>
      ) : (
        <NotificationList notifications={filteredNotifications} />
      )}
    </div>
  );
}

export default Dashboard;
