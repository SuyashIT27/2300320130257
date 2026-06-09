import { useEffect, useState } from "react";
import NotificationList from "../components/NotificationList";

const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    fetchNotifications();
  }, [filter, page, limit]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      let url = `${BASE_URL}?limit=${limit}&page=${page}`;

      if (filter !== "all") {
        url += `&notification_type=${filter}`;
      }

      const response = await fetch(url, {
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

  return (
    <main className="dashboard">
      <section className="hero">
        <h1>Campus Notifications</h1>
        <p>
          View important campus updates, placement drives, results, and event
          notifications.
        </p>
      </section>

      <div className="controls">
        <div className="filter-box">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("Event")}>Event</button>
          <button onClick={() => setFilter("Result")}>Result</button>
          <button onClick={() => setFilter("Placement")}>Placement</button>
        </div>

        <div className="limit-box">
          <label>Show:</label>

          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {loading && <h2 className="loading">Loading Notifications...</h2>}

      {error && <h2 className="empty">{error}</h2>}

      {!loading && !error && <NotificationList notifications={notifications} />}

      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </main>
  );
}

export default Dashboard;
