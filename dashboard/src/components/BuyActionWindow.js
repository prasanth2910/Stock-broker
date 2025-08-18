import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

// 👇 fallback should be your backend port (not same as frontend 3000)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";
console.log("BACKEND_URL:", BACKEND_URL);

const BuyActionWindow = ({ uid, token }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ useContext should be here (top-level of component)
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = async () => {
    if (!token) {
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/newOrder`,
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "BUY",
          status: "pending"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Order placed successfully:", result.data);

      // ✅ no hook call inside handler
      generalContext.closeBuyWindow();
    } catch (error) {
      console.error("Error placing order:", error);
      setError(error.response?.data?.error || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow(); // ✅ no hook call inside handler
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link
            className="btn btn-blue"
            onClick={handleBuyClick}
            style={{ pointerEvents: loading ? "none" : "auto" }}
          >
            {loading ? "Processing..." : "Buy"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
