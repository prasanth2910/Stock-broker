import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
console.log("BACKEND_URL:", BACKEND_URL);
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const getModeColor = (mode) => {
    switch (mode?.toLowerCase()) {
      case "buy":
        return "mode-buy";
      case "sell":
        return "mode-sell";
      default:
        return "mode-neutral";
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
        </div>
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={fetchOrders} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
        </div>
        <div className="no-orders">
          <div className="no-orders-icon">📋</div>
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders today</p>
          <p className="sub-text">Your order history will appear here once you start trading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders</h2>
        <div className="orders-actions">
          <button onClick={fetchOrders} className="refresh-button">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Stock Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="order-row">
                <td className="order-id">{order._id.slice(-8)}</td>
                <td className="stock-name">{order.name}</td>
                <td className="quantity">{order.qty.toLocaleString()}</td>
                <td className="price">₹{order.price.toLocaleString()}</td>
                <td>
                  <span className={`mode-badge ${getModeColor(order.mode)}`}>
                    {order.mode?.toUpperCase() || "N/A"}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {order.status || "Pending"}
                  </span>
                </td>
                <td className="datetime">
                  {new Date(order.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="total-value">
                  ₹{(order.qty * order.price).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="orders-summary">
        <div className="summary-item">
          <span className="summary-label">Total Orders:</span>
          <span className="summary-value">{orders.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Buy Orders:</span>
          <span className="summary-value buy">
            {orders.filter((order) => order.mode?.toLowerCase() === "buy").length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Sell Orders:</span>
          <span className="summary-value sell">
            {orders.filter((order) => order.mode?.toLowerCase() === "sell").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
