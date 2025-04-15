
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";
import Hero from "../components/Hero";
import QualitySection from "../components/QualitySection";
import NewsletterSection from "../components/NewsletterSection";
import LoanImage from "../assets/loan-img.webp";
import backgroundImage1 from "../assets/palace-1366178.webp"; // Import the image for QualitySection
import "../css/FormStyles.css";
import "../css/Configure.css"; // Import your CSS file for styling
import { BASE_URL } from "../services/apiService";
const Configure = () => {
  const [formData, setFormData] = useState({
    service: "",
    fullName: "",
    contactInfo: "",
    dob: "",
    ownershipType: "",
    companyName: "",
    mortgageName: "",
    jointMortgageNames: "",
    limitedTimeOffer: "",
    notes: "",
  });

  const location = useLocation();
  const lender = location.state?.lender; // Retrieving state passed via Link
  const searchParams = new URLSearchParams(location.search);
  const productCode = searchParams.get("product");

  const [contactMethod, setContactMethod] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const [bestTimeToCall, setBestTimeToCall] = useState("");
  const [otherDate, setOtherDate] = useState("");
  const [otherDateTimeSlot, setOtherDateTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [otherDates, setOtherDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    console.log("Lender Data:", lender); // Debugging: Check if data is coming correctly
  }, [lender]);

  useEffect(() => {
    generateTimeSlots();
    generateOtherDates();
  }, []);  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateTimeSlots = () => {
    const today = new Date();
    let currentDay = today.getDay();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();
  
    const officeHours = {
      1: { start: 9, end: 21 },
      2: { start: 9, end: 21 },
      3: { start: 9, end: 21 },
      4: { start: 9, end: 21 },
      5: { start: 9, end: 21 },
      6: { start: 9, end: 18 },
    };
  
    const getNextAvailableDay = (day) => {
      let nextDay = day;
      let daysChecked = 0;
      while (daysChecked < 7) {
        nextDay = (nextDay + 1) % 7;
        if (nextDay !== 0 && officeHours[nextDay]) return nextDay;
        daysChecked++;
      }
      return null;
    };
  
    const prepTimeInMinutes = 30;
    let adjustedMinutes = currentMinute + prepTimeInMinutes;
    let adjustedHour = currentHour;
  
    if (adjustedMinutes >= 60) {
      adjustedHour += 1;
      adjustedMinutes -= 60;
    }
  
    let startHour = Math.max(adjustedHour, officeHours[currentDay]?.start || 0);
    let startMinute = adjustedMinutes > 0 ? 30 : 0;
    let slots = [];
    let daysGenerated = 0;
  
    while (slots.length < 6 && daysGenerated < 7) {
      if (!officeHours[currentDay]) {
        currentDay = getNextAvailableDay(currentDay);
        if (currentDay === null) break;
        today.setDate(today.getDate() + ((currentDay - today.getDay() + 7) % 7));
        startHour = officeHours[currentDay].start;
        startMinute = 0;
        daysGenerated++;
        continue;
      }
  
      if (startHour + 2 <= officeHours[currentDay].end) {
        const slotStartFormatted = formatTime(startHour, startMinute);
        const slotEndFormatted = formatTime(startHour + 2, 0);
        slots.push(`${formatDate(today)}, ${slotStartFormatted} - ${slotEndFormatted}`);
        startHour += 2;
        startMinute = 0;
      } else {
        currentDay = getNextAvailableDay(currentDay);
        if (currentDay === null) break;
        today.setDate(today.getDate() + ((currentDay - today.getDay() + 7) % 7));
        startHour = officeHours[currentDay].start;
        startMinute = 0;
        daysGenerated++;
      }
    }
    setTimeSlots(slots);
  };
  
  const generateOtherDates = () => {
    let today = new Date();
    let dates = [];
    let daysAdded = 0;
    while (dates.length < 7 && daysAdded < 14) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0) {
        dates.push(formatDate(today));
      }
      daysAdded++;
    }
    setOtherDates(dates);
  };
  
  const generateTimeSlotsForDate = (selectedDateString) => {
    const dayName = selectedDateString.split(" ")[0];
    const dayMap = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
  
    const dayOfWeek = dayMap[dayName];
    let slots = [];
  
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      slots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "1:00 PM - 3:00 PM",
        "3:00 PM - 5:00 PM",
        "5:00 PM - 7:00 PM",
        "7:00 PM - 9:00 PM",
      ];
    } else if (dayOfWeek === 6) {
      slots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "1:00 PM - 3:00 PM",
        "3:00 PM - 5:00 PM",
        "5:00 PM - 7:00 PM",
      ];
    }
  
    return slots;
  };
  
  const formatTime = (hour, minute = 0) => {
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${adjustedHour}:${formattedMinute} ${period}`;
  };
  
  const formatDate = (date) => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const suffix =
      dateNum === 1 || dateNum === 21 || dateNum === 31 ? "st"
      : dateNum === 2 || dateNum === 22 ? "nd"
      : dateNum === 3 || dateNum === 23 ? "rd"
      : "th";
    return `${day} ${dateNum}${suffix} ${month}`;
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const API_URL = `${BASE_URL}/submit-loan-application`;
    const cleanedData = {
      type: "loan_application",
      ...formData,
      contactInfo: formData.contactInfo,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      // const result = await response.json();
      if (response.ok) {
        setMessage("✅ Loan application submitted successfully!");
        setFormData({
          service: "",
          fullName: "",
          contactInfo: "",
          dob: "",
          ownershipType: "",
          companyName: "",
          mortgageName: "",
          jointMortgageNames: "",
          limitedTimeOffer: "",
          notes: "",
          bestTimeToCall: "",
          otherDate: "",
          otherDateTimeSlot: "",

        });
        setContactMethod("");
        setOwnershipType("");
      } else {
        setMessage("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      setMessage("⚠️ Error submitting form. Please check your internet connection.");
      console.error("❌ Submission error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Hero
        title="Apply for Your Loan or Mortgage with Confidence"
        subHeading="The Lending Company – Your Trusted Partner in Financing"
        detail="We offer tailored loan and mortgage solutions to help you achieve your dreams. Our process is simple, transparent, and secure."
        className="hero-2"
        imageUrl={LoanImage}
      />


      {lender ? (
        <div className="loan-details-container">
          <div className="loan-details">
            <h2 className="loan-title">Loan Details</h2>
            <table className="loan-table">
              <thead>
                <tr>
                  <th>Product Fee</th>
                  <th>Monthly Cost</th>
                  <th>Total Cost</th>
                  <th>Lender Name</th>
                  <th>Interest Rate</th>
                  <th>Rate Type</th>
                  <th>Initial Period</th>
                  <th>Revert Rate</th>
                  <th>Valuation Fee (Est.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{lender.fee || "N/A"}</td>
                  <td>{lender.monthlyCost || "N/A"}</td>
                  <td>{lender.totalCost || "N/A"}</td>
                  <td>{lender.name || "N/A"}</td>
                  <td>{lender.rate ? `${lender.rate}` : "N/A"}</td>
                  <td>{lender.mortgageClass || "N/A"}</td>
                  <td>
                    {lender.initialRatePeriodMonths ? `${lender.initialRatePeriodMonths} months` : "N/A"}
                    {lender.ltv ? ` (${lender.ltv})` : ""}
                  </td>
                  <td>{lender.standardVariableRate ? `${lender.standardVariableRate}` : "N/A"}</td>
                  <td>{lender.valuationFee || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        ) : productCode ? (
          <p className="loading-message">
            <span className="loading-icon">⏳</span> Loading loan details for Product Code: {productCode}...
          </p>
        ) : null}







      <div className="form-container" style={{ paddingBottom: "60px", backgroundColor: "#fff", minHeight: "120vh" }}>
        <div className="form-box">
          <h2 className="form-title">Loan Application</h2>
          <p className="form-subtext">
            Fill in your details, and our expert advisors will guide you through the best financing options available.
          </p>
          {message && <p className="submission-message">{message}</p>}

          <form onSubmit={handleSubmit} className="styled-form">
            <div className="form-group">
              <label className="form-label">Preferred Contact Method:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Phone"
                    onChange={(e) => setContactMethod(e.target.value)}
                    checked={contactMethod === "Phone"}
                  />
                  Phone
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Email"
                    onChange={(e) => setContactMethod(e.target.value)}
                    checked={contactMethod === "Email"}
                  />
                  Email
                </label>
              </div>
            </div>

            {contactMethod && (
              <div className="form-group">
                <label className="form-label">What service is this about?</label>
                <select className="form-input" name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service</option>
                  <option value="Bridging">Bridging</option>
                  <option value="Buy to Let">Buy to Let</option>
                  <option value="Residential Mortgage">Residential Mortgage</option>
                  <option value="Commercial Mortgage">Commercial Mortgage</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            )}

{contactMethod === "Phone" && (
  <>
    <div className="form-group">
      <label className="form-label">What's the best time to call?</label>
      <select
        name="bestTimeToCall"
        className="form-input"
        value={bestTimeToCall}
        onChange={(e) => {
          const value = e.target.value;
          setBestTimeToCall(value);
          if (value !== "Other") {
            setOtherDate("");
            setAvailableTimeSlots([]);
            setOtherDateTimeSlot("");
          }
        }}
        required
      >
        <option value="">Select Time</option>
        {timeSlots.map((slot, index) => (
          <option key={index} value={slot}>{slot}</option>
        ))}
        <option value="Other">Other</option>
      </select>
    </div>

    {bestTimeToCall === "Other" && (
      <>
        <div className="form-group">
          <label className="form-label">Select a date for availability</label>
          <select
            name="otherDate"
            className="form-input"
            value={otherDate}
            onChange={(e) => {
              const date = e.target.value;
              setOtherDate(date);
              setAvailableTimeSlots(generateTimeSlotsForDate(date));
              setOtherDateTimeSlot("");
            }}
            required
          >
            <option value="">Select Date</option>
            {otherDates.map((date, index) => (
              <option key={index} value={date}>{date}</option>
            ))}
          </select>
        </div>

        {otherDate && (
          <div className="form-group">
            <label className="form-label">Available Time Slots for {otherDate}</label>
            <select
              name="otherDateTimeSlot"
              className="form-input"
              value={otherDateTimeSlot}
              onChange={(e) => setOtherDateTimeSlot(e.target.value)}
              required
            >
              <option value="">Select Slot</option>
              {availableTimeSlots.map((slot, index) => (
                <option key={index} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        )}
      </>
    )}
  </>
)}

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            {contactMethod && (
              <div className="form-group">
                <label className="form-label">{contactMethod === "Phone" ? "Phone Number" : "Email Address"}</label>
                <input className="form-input" type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input className="form-input" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Ownership Type</label>
              <select className="form-input" name="ownershipType" value={ownershipType} onChange={(e) => setOwnershipType(e.target.value)} required>
                <option value="">Select Ownership Type</option>
                <option value="Limited Company">Limited Company</option>
                <option value="Personal - Single">Personal - Single</option>
                <option value="Personal - Joint">Personal - Joint</option>
              </select>
            </div>

            {ownershipType === "Limited Company" && (
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input className="form-input" type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
              </div>
            )}

            {ownershipType === "Personal - Single" && (
              <div className="form-group">
                <label className="form-label">Mortgage Name</label>
                <input className="form-input" type="text" name="mortgageName" value={formData.mortgageName} onChange={handleChange} required />
              </div>
            )}

            {ownershipType === "Personal - Joint" && (
              <div className="form-group">
                <label className="form-label">Names on Mortgage</label>
                <input className="form-input" type="text" name="jointMortgageNames" value={formData.jointMortgageNames} onChange={handleChange} required />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Would you like a Limited Time Offer?</label>
              <select className="form-input" name="limitedTimeOffer" value={formData.limitedTimeOffer} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              {loading ? "Submitting..." : "Submit"} <FaCaretRight />
            </button>
          </form>
        </div>
      </div>

      <QualitySection
        preHeader="Tailored to Meet Urgent Needs"
        mainHeading="Flexible Financing for Immediate Property Needs"
        description="Our remortgage solutions are crafted for property owners needing fast, flexible capital. Whether you’re managing a switch to a better deal or need to release equity, our team offers support at every stage. With transparent terms and a focus on quick processing, we ensure you get the right remortgage solution for your needs."
        buttonText="Get Started"
        buttonLink="/"
        backgroundImage={backgroundImage1}
      />

      <NewsletterSection />
    </>
  );
};

export default Configure;
