import React, { useState, useEffect, useRef } from "react";
import { FaCaretRight } from "react-icons/fa";
import Hero from "../components/Hero";
import CtaSection from "../components/CtaSection";
import QualitySection from "../components/QualitySection";
import NewsletterSection from "../components/NewsletterSection";
import "../css/ProgramPage.css";
import "../css/commercialmortgages.css"; // You might need a different CSS file
import ForeignNationalImg from "../assets/property-img.webp"; // or choose a suitable one
import CtaImg1 from "../assets/street-4763625.webp";
import CtaImg2 from "../assets/building-img2.webp";
import CtaImg3 from "../assets/architecture-3121009.webp";
import CtaImg4 from "../assets/city-building2.webp";
import backgroundImage from "../assets/property-img.webp";

const TypingText = () => {
  const fullMessageList = [
    ["Moving to the UK?", "We can help you buy."],
    ["Non-UK Resident?", "Mortgage advice available."],
    ["International Buyer?", "Your UK property journey starts here."],
    ["Overseas Investor?", "UK property mortgages made simple."],
    ["Relocating for Work?", "Mortgage solutions for foreign nationals."],
    ["Expanding your Portfolio?", "Financing UK property as a non-resident."],
    ["Navigating UK Property?", "Expert guidance for foreign buyers."],
    ["Your UK Home Awaits.", "Specialist mortgage advice."],
    ["Cross-Border Mortgages.", "Tailored for your needs."],
    ["Investing in the UK?", "We understand your unique requirements."]
  ];

  const getRandomMessage = () => fullMessageList[Math.floor(Math.random() * fullMessageList.length)];
  const [currentMessage, setCurrentMessage] = useState(getRandomMessage());
  const [displayedText, setDisplayedText] = useState(["", ""]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  const [fontSize, setFontSize] = useState(1.5);
  const [maxFontSize, setMaxFontSize] = useState(1.5);
  const containerRef = useRef(null);
  const lineRefs = [useRef(null), useRef(null)];

  const updateMaxFontSize = () => {
    const screenWidth = window.innerWidth;
    const maxSize = screenWidth >= 1500 ? 3.0 : 1.5;
    setMaxFontSize(maxSize);
    setFontSize(maxSize);
  };

  const adjustFontSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1150) return;

    if (!containerRef.current || !lineRefs[0].current || !lineRefs[1].current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const lineWidths = lineRefs.map((ref) => ref.current.offsetWidth);
    const maxWidth = Math.max(...lineWidths);

    if (maxWidth > containerWidth && fontSize > 1.0) {
      setFontSize((prev) => parseFloat((prev - 0.1).toFixed(2)));
    }
  };

  useEffect(() => {
    updateMaxFontSize();
    window.addEventListener("resize", updateMaxFontSize);
    return () => window.removeEventListener("resize", updateMaxFontSize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => adjustFontSize(), 100);
    return () => clearTimeout(timeout);
  }, [displayedText]);

  useEffect(() => {
    if (pause) return;

    const currentLineText = currentMessage[lineIndex];
    let timeout;

    if (!isDeleting) {
      if (charIndex <= currentLineText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const updated = [...prev];
            updated[lineIndex] = currentLineText.substring(0, charIndex);
            return updated;
          });
          setCharIndex((prev) => prev + 1);
        }, 50);
      }

      if (charIndex > currentLineText.length) {
        if (lineIndex < currentMessage.length - 1) {
          setCharIndex(0);
          setLineIndex((prev) => prev + 1);
        } else {
          setPause(true);
          setTimeout(() => {
            setIsDeleting(true);
            setPause(false);
            setCharIndex(currentLineText.length);
          }, 20000);
        }
      }
    } else {
      if (charIndex >= 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => {
            const updated = [...prev];
            updated[lineIndex] = currentLineText.substring(0, charIndex);
            return updated;
          });
          setCharIndex((prev) => prev - 1);
        }, 40);
      }

      if (charIndex < 0) {
        if (lineIndex > 0) {
          setLineIndex((prev) => prev - 1);
          setCharIndex(currentMessage[lineIndex - 1].length);
        } else {
          setIsDeleting(false);
          setCharIndex(0);
          setLineIndex(0);
          setCurrentMessage(getRandomMessage());
          setFontSize(maxFontSize);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, lineIndex, isDeleting, pause, currentMessage]);

  return (
    <div className="typing-container" ref={containerRef} style={{ fontSize: `${fontSize}rem` }}>
      {/* <div className="typing-line" ref={lineRefs[0]}>{displayedText[0]}<span className="blinking-cursor">|</span></div>
      <div className="typing-line" ref={lineRefs[1]}>{displayedText[1]}<span className="blinking-cursor">|</span></div> */}
      <div className="typing-line" ref={lineRefs[0]}>
        {displayedText[0]}
        {lineIndex === 0 && <span className="blinking-cursor">|</span>}
      </div>
      <div className="typing-line" ref={lineRefs[1]}>
        {displayedText[1]}
        {lineIndex === 1 && <span className="blinking-cursor">|</span>}
      </div>
    </div>
  );
};

const animationStyle = `
.typing-container {
  position: absolute;
  top: 40%;
  left: 80%;
  transform: translate(-50%, -50%);
  font-weight: 770;
  color: #ffffff;
  z-index: 9;
  pointer-events: none;
  text-align: center;
  line-height: 1.4;
  max-width: 40vw;
}
.typing-line {
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.blinking-cursor {
  font-weight: 100;
  font-size: 1em;
  color: white;
  animation: blink 1s infinite;
  margin-left: 5px;
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
@media screen and (max-width: 1149px) {
  .typing-container {
    display: none;
  }
}
`;

const ForeignNationals = () => {
  const [contactMethod, setContactMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationality: "",
    passportNumber: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bestTimeToCall, setBestTimeToCall] = useState("");
  const [otherDate, setOtherDate] = useState("");
  const [otherDateTimeSlot, setOtherDateTimeSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [otherDates, setOtherDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

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
    while (dates.length < 7 && daysAdded < 14) { // prevent infinite loop
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0) { // Skip Sunday
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
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

    if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday - Friday
      slots = [
        "9:00 AM - 11:00 AM",
        "11:00 AM - 1:00 PM",
        "1:00 PM - 3:00 PM",
        "3:00 PM - 5:00 PM",
        "5:00 PM - 7:00 PM",
        "7:00 PM - 9:00 PM",
      ];
    } else if (dayOfWeek === 6) { // Saturday
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
      setContactMethod(value);
      return;
    }

    // Default case: update formData
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const API_URL = "http://localhost:3000/submit-foreign-national"; // Change the endpoint

    const cleanedData = {
      type: "foreign_national_request", // Add a type field
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationality: formData.nationality,
      passportNumber: formData.passportNumber,
      email: contactMethod === "Email" ? formData.email : "",
      phoneNumber: contactMethod === "Phone" ? formData.phoneNumber : "",
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
    } catch (error) {
      setMessage("⚠️ Error submitting form. Please check your internet connection.");
      console.error("❌ Submission error:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <style>{animationStyle}</style>
      { <Hero
        title="Helping Foreign Nationals Buy Property in the UK"
        subHeading="Specialist Support for Non-UK Residents"
        detail="We specialise in helping foreign nationals navigate the UK mortgage process. Whether you're relocating or investing, our expert brokers simplify the journey for you."
        className="hero-1"
        imageUrl={ForeignNationalImg}
        id="hero"
        />}

      {/* Form Section */}
      <div className="form-container">
        <div className="form-box">
          <h2 className="form-title">Get a Personalised Quote</h2>
          <p className="form-subtext">
            Please fill in your details to receive a personalized quote from our FCA-regulated brokers.
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
                    onChange={handleChange}
                  /> Phone
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="Email"
                    onChange={handleChange}
                  /> Email
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Nationality</label>
              <input className="form-input" type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label className="form-label">Passport Number</label>
              <input className="form-input" type="text" name="passportNumber" value={formData.passportNumber} onChange={handleChange} required />
            </div>

            {contactMethod === "Phone" && (
              <>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

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

            {contactMethod === "Email" && (
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"} <FaCaretRight />
            </button>
          </form>
        </div>
      </div>

      <QualitySection
        preHeader="Helping Foreign Nationals Buy Property in the UK"
        mainHeading="Your Path to UK Property Ownership"
        description="We specialize in assisting non-UK residents with their property purchases. Our expert brokers understand the unique challenges and requirements of foreign buyers, from navigating UK property laws to securing the right financing. We offer tailored solutions, competitive rates, and personalized advice to make your investment in the UK property market smooth and successful."
        backgroundImage={backgroundImage}
      />

      <CtaSection
        ctaDirection="reverse light"
        ctaHeading="Why Choose Our Services for Foreign Nationals?"
        ctaParagraph="We understand the complexities foreign nationals face when buying property in the UK. Our dedicated team provides expert guidance on visas, tax implications, and mortgage options tailored to your specific situation."
        ctaImg1={CtaImg1}
        ctaImg2={CtaImg2}
        altText1="UK Flags"
        altText2="UK Flags"
        id="cta-1"
      />

      <CtaSection
        ctaDirection=""
        ctaHeading="Navigating UK Property Laws for Foreign Buyers"
        ctaParagraph="Our team keeps up-to-date with the latest regulations affecting foreign property buyers in the UK.  We'll guide you through stamp duty, residency requirements, and any other legal considerations."
        ctaImg1={CtaImg3}
        ctaImg2={CtaImg4}
        altText1="UK Flags"
        altText2="UK Flags"
        btnClass="secondry-btn"
        id="cta-2"
      />

      <NewsletterSection id="newsletter" />
    </>
  );
};

export default ForeignNationals;