import { useEffect, useMemo, useState } from "react";
import NotificationList from "../components/NotificationList";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch notifications");
        }

        setNotifications(data.notifications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [ACCESS_TOKEN]);
  console.log(import.meta.env.VITE_ACCESS_TOKEN);
  const filteredNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp))
      .slice(0, 10)
      .filter((item) => {
        if (filter === "all") return true;
        return item.Type?.toLowerCase() === filter;
      });
  }, [notifications, filter]);

  return (
    <main className="dashboard">
      <section className="hero">
        <h1>Campus Notifications</h1>
        <p>
          A clean notification dashboard showing the latest campus updates,
          results, events and placement alerts.
        </p>
      </section>

      <section className="filter-box">
        {["all", "result", "event", "placement"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={filter === type ? "active-filter" : ""}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </section>

      {loading && <h2 className="loading">Loading notifications...</h2>}

      {error && <h2 className="empty">{error}</h2>}

      {!loading && !error && (
        <NotificationList notifications={filteredNotifications} />
      )}
    </main>
  );
}

export default Dashboard;
