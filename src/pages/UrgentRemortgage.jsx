import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import QualitySection from "../components/QualitySection";
import CtaSection from "../components/CtaSection";
import NewsletterSection from "../components/NewsletterSection";

// Assets
import backgroundImage from "../assets/street-4763625.webp";
import backgroundImage1 from "../assets/palace-1366178.webp";
import CtaImg1 from "../assets/palace-1366178.webp";
import CtaImg2 from "../assets/lending-bg-1.webp";
import CtaImg3 from "../assets/building-img.webp";
import CtaImg4 from "../assets/building-img2.webp";
import "../css/FormStyles.css";
import { BASE_URL } from "../services/apiService";

const UrgentRemortgage = () => {
  const [formData, setFormData] = useState({
    contactMethod: "Phone",
    fullName: "",
    serviceType: "Buy to Let",
    dob: "",
    ownershipType: "Personal - Single",
    companyName: "",
    limitedTimeOffer: "No",
  });
  const [bestTimeToCall, setBestTimeToCall] = useState("");
  const [otherDate, setOtherDate] = useState("");
  const [otherDateTimeSlot, setOtherDateTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [otherDates, setOtherDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    generateTimeSlots();
    generateOtherDates();
  }, []);

  // Generate 6 available time slots dynamically
  function generateTimeSlots() {
    const today = new Date();
    let currentDay = today.getDay();
    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();

    const officeHours = {
      1: { start: 9, end: 21 }, // Monday
      2: { start: 9, end: 21 }, // Tuesday
      3: { start: 9, end: 21 }, // Wednesday
      4: { start: 9, end: 21 }, // Thursday
      5: { start: 9, end: 21 }, // Friday
      6: { start: 9, end: 18 }, // Saturday
    };

    const getNextAvailableDay = (day) => {
      let nextDay = day;
      let daysChecked = 0;
      while (daysChecked < 7) {
        nextDay = (nextDay + 1) % 7;
        if (nextDay !== 0 && officeHours[nextDay]) {
          // Skip Sunday
          return nextDay;
        }
        daysChecked++;
      }
      return null; // No available day found
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
  }

  // Generate the next 7 available dates
  function generateOtherDates() {
    let today = new Date();
    let dates = [];
    let daysAdded = 0;
    while (dates.length < 7 && daysAdded < 14) {
      // prevent infinite loop
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0) {
        // Skip Sunday
        dates.push(formatDate(today));
      }
      daysAdded++;
    }
    setOtherDates(dates);
  }

  function formatTime(hour, minute = 0) {
    const period = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${adjustedHour}:${formattedMinute} ${period}`;
  }

  function formatDate(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const suffix =
      dateNum === 1 || dateNum === 21 || dateNum === 31
        ? "st"
        : dateNum === 2 || dateNum === 22
        ? "nd"
        : dateNum === 3 || dateNum === 23
        ? "rd"
        : "th";
    return `${day} ${dateNum}${suffix} ${month}`;
  }

  // Function to generate time slots for a given date
  function generateTimeSlotsForDate(selectedDateString) {
    // Try to parse the day name from the string
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
      // Monday - Friday
      slots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "1:00 PM - 3:00 PM",
        "3:00 PM - 5:00 PM",
        "5:00 PM - 7:00 PM",
        "7:00 PM - 9:00 PM",
      ];
    } else if (dayOfWeek === 6) {
      // Saturday
      slots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "1:00 PM - 3:00 PM",
        "3:00 PM - 5:00 PM",
        "5:00 PM - 7:00 PM",
      ];
    }

    return slots;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "otherDate") {
      setOtherDate(value);
      const generatedSlots = generateTimeSlotsForDate(value);
      setAvailableTimeSlots(generatedSlots);
      setOtherDateTimeSlot(""); // Reset selected time slot
      return;
    }

    if (name === "otherDateTimeSlot") {
      setOtherDateTimeSlot(value);
      return;
    }

    if (name === "bestTimeToCall") {
      setBestTimeToCall(value);
      if (value !== "Other") {
        setOtherDate("");
        setAvailableTimeSlots([]);
        setOtherDateTimeSlot("");
      }
      return;
    }

    if (name === "contactMethod") {
      setFormData({ ...formData, contactMethod: value });
      return;
    }

    // Default case: update formData
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const API_URL = `${BASE_URL}/submit-urgent-remortgage`;

    const cleanedData = {
      type: "urgent_remortgage_request",
      contactMethod: formData.contactMethod,
      fullName: formData.fullName,
      serviceType: formData.serviceType,
      dob: formData.dob,
      ownershipType: formData.ownershipType,
      companyName: formData.companyName,
      limitedTimeOffer: formData.limitedTimeOffer,
      bestTimeToCall: bestTimeToCall,
      otherDate: otherDate,
      otherDateTimeSlot: otherDateTimeSlot,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const result = await response.json();
      setMessage(result.message ? "✅ Request submitted successfully!" : "❌ Submission failed. Please try again.");
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting form: " + result.error);
      }
    } catch (error) {
      setMessage("⚠️ Error submitting form. Please check your internet connection.");
      console.error("Submission error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Hero
        title="Urgent Remortgage"
        subHeading="Fast and Flexible Remortgage Solutions"
        detail="If you need urgent remortgaging solutions, we offer fast, flexible financing options tailored to your needs."
        className="hero-4"
        imageUrl={backgroundImage}
      />

      {/* Remortgage Form */}
      <div className="form-container" style={{ paddingBottom: "60px", backgroundColor: "#fff" }}>
        <div className="form-box">
          <h2 className="form-title">Urgent Remortgage Application</h2>
          <p className="form-subtext">
            Need to remortgage quickly? Fill out the form below and our experts will get in touch to provide the best remortgage solution.
          </p>
          {message && <p className="submission-message">{message}</p>}
          <form onSubmit={handleSubmit} className="styled-form">
            {/* Preferred Contact Method */}
            <div className="form-group">
              <label>Preferred Contact Method:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Phone"
                    checked={formData.contactMethod === "Phone"}
                    onChange={handleChange}
                  />
                  Phone
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Email"
                    checked={formData.contactMethod === "Email"}
                    onChange={handleChange}
                  />
                  Email
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Service Type:</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                <option value="Buy to Let">Buy to Let</option>
                <option value="Residential Mortgage">Residential Mortgage</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Ownership Type:</label>
              <select name="ownershipType" value={formData.ownershipType} onChange={handleChange} required>
                {formData.serviceType === "Buy to Let" && <option value="Limited Company">Limited Company</option>}
                <option value="Personal - Single">Personal - Single</option>
                <option value="Personal - Joint">Personal - Joint</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                {formData.ownershipType === "Limited Company"
                  ? "Company Name:"
                  : formData.ownershipType === "Personal - Single"
                  ? "Mortgage Name:"
                  : "Names on Mortgage:"}
              </label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Would you like a limited time offer?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="limitedTimeOffer"
                    value="Yes"
                    checked={formData.limitedTimeOffer === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label style={{ marginLeft: "20px" }}>
                  <input
                    type="radio"
                    name="limitedTimeOffer"
                    value="No"
                    checked={formData.limitedTimeOffer === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            {formData.contactMethod === "Phone" && (
              <>
                {/* Best Time to Call Selection */}
                <div className="form-group">
                  <label className="form-label">
                    What's the best time to call? <span className="required">*</span>
                  </label>
                  <select
                    name="bestTimeToCall"
                    className="form-input"
                    value={bestTimeToCall}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* If "Other" is selected, show 7 date options */}
                {bestTimeToCall === "Other" && (
                  <>
                    <div className="form-group">
                      <label className="form-label">
                        Select a date for availability <span className="required">*</span>
                      </label>
                      <select
                        name="otherDate"
                        className="form-input"
                        value={otherDate}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Date</option>
                        {otherDates.map((date, index) => (
                          <option key={index} value={date}>
                            {date}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* If a date is selected, show available time slots */}
                    {otherDate && (
                      <div className="form-group">
                        <label className="form-label">
                          Available Time Slots for {otherDate} <span className="required">*</span>
                        </label>
                        <select
                          name="otherDateTimeSlot"
                          className="form-input"
                          value={otherDateTimeSlot}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Slot</option>
                          {availableTimeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {/* Quality Section */}
      <QualitySection
        preHeader="Tailored to Meet Urgent Needs"
        mainHeading="Flexible Financing for Immediate Property Needs"
        description="Our remortgage solutions are crafted for property owners needing fast, flexible capital. Whether you’re managing a switch to a better deal or need to release equity, our team offers support at every stage. With transparent terms and a focus on quick processing, we ensure you get the right remortgage solution for your needs."
        backgroundImage={backgroundImage1}
      />

      {/* CTA 1 */}
      <CtaSection
        ctaDirection="reverse light"
        ctaHeading="Why Choose Us for Urgent Remortgage?"
        ctaParagraph="Our urgent remortgage service is designed to deliver results quickly and efficiently. We simplify the application process and provide transparent advice to help you remortgage without stress. Whether it's securing a better rate or releasing funds quickly, we tailor solutions to you."
        ctaImg1={CtaImg3}
        ctaImg2={CtaImg4}
        altText1="Quick Remortgage Processing"
        altText2="Dedicated Support Team"
        id="cta-urgent-1"
      />

      {/* CTA 2 */}
      <CtaSection
        ctaDirection=""
        ctaHeading="Our Remortgage Approach"
        ctaParagraph="We take a client-first approach, focusing on fast turnarounds and tailored deals. Our goal is to find the right lender, terms, and strategy to suit your timeline. Trust The Lending Company to help bridge your remortgage goals with expert guidance."
        ctaImg1={CtaImg1}
        ctaImg2={CtaImg2}
        altText1="Remortgage Strategy"
        altText2="Tailored Lending Solutions"
        btnClass="secondry-btn"
        id="cta-urgent-2"
      />

      <NewsletterSection />
    </>
  );
};

export default UrgentRemortgage;