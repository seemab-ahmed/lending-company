import React, { useState } from "react";
import Hero from "../components/Hero";
import QualitySection from "../components/QualitySection";
import CtaSection from "../components/CtaSection";
import NewsletterSection from "../components/NewsletterSection";
import backgroundImage from "../assets/palace-1366178.webp";
import "../css/FormStyles.css";
import { BASE_URL } from "../services/apiService";
const FixedRateReminder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    expiryDate: "",
    lender: "",
    serviceType: "Buy to Let"
  });
  
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (formData.expiryDate <= today) {
      setError("Fixed Rate Expiry Date must be in the future.");
      return;
    }

    setError("");

    try {
      const response = await fetch(`${BASE_URL}/submit-fixed-rate-reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting form: " + result.error);
      }
    } catch (error) {
      alert("Error submitting form. Please try again later.");
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <Hero
        title="Fixed Rate Reminder"
        subHeading="Stay Ahead of Your Mortgage Expiry Date"
        detail="Get notified before your fixed rate mortgage expires so you can secure the best deal in time."
        className="hero-4"
        imageUrl={backgroundImage}
      />

      <div className="form-container">
        <div className="form-box">
          <h2 className="form-title">Fixed Rate Reminder</h2>
          <p className="form-subtext">Never miss your fixed rate mortgage expiry date. Set a reminder and stay ahead of your financial decisions.</p>
          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email Address:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fixed Rate Expiry Date:</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
              {error && <p className="error-message">{error}</p>}
            </div>
            <div className="form-group">
              <label>Current Lender Name:</label>
              <input type="text" name="lender" value={formData.lender} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Service Type:</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                <option value="Buy to Let">Buy to Let</option>
                <option value="Residential">Residential</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      <QualitySection
        preHeader="Supporting Your Financial Goals"
        mainHeading="Why Set a Fixed Rate Reminder?"
        description="Avoid costly surprises by staying informed about your mortgage expiration date. Our reminder service helps you plan ahead and secure the best refinancing deals."
        backgroundImage={backgroundImage}
      />
      <NewsletterSection/>
    </>
  );
};

export default FixedRateReminder;