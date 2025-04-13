import React, { useState } from "react";
import Hero from "../components/Hero";
import QualitySection from "../components/QualitySection";
import NewsletterSection from "../components/NewsletterSection";
import backgroundImage from "../assets/palace-1366178.webp";
import "../css/FAQs.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "What is The Lending Company?",
    answer:
      "The Lending Company is a fee-free brokerage service that helps you compare and secure the best mortgage and bridging finance options from trusted lenders.",
  },
  {
    question: "Do I need to pay for your services?",
    answer:
      "No, our services are 100% free. We do not charge any brokerage fees to our clients.",
  },
  {
    question: "What types of loans do you offer?",
    answer:
      "We specialise in bridging finance, residential mortgages, buy-to-let mortgages, commercial mortgages, and first-time buyer mortgages.",
  },
  {
    question: "How quickly can I get a bridging loan?",
    answer:
      "Typically, bridging loans can be arranged within 3–14 days, depending on your circumstances and the lender’s process.",
  },
  {
    question: "Will using your service affect my credit score?",
    answer:
      "No, our initial process doesn’t affect your credit score. Only when you proceed with a full application to a lender might a credit check be conducted.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Hero
        title="FAQs"
        subHeading="Your Mortgage Questions, Answered"
        detail="From bridging loans to fixed-rate reminders, we’ve got answers to your most common mortgage and financing questions."
        className="hero-4"
        imageUrl={backgroundImage}
      />

      <section className="faqs-container">
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="faq-icon" />
                ) : (
                  <FaChevronDown className="faq-icon" />
                )}
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <QualitySection
        preHeader="Need More Help?"
        mainHeading="Still Have Questions?"
        description="If your question isn’t answered here, don’t hesitate to reach out. We’re here to make property financing easy, transparent, and stress-free."
        buttonText="Contact Us"
        buttonLink="/configure"
        backgroundImage={backgroundImage}
      />

      <NewsletterSection />
    </>
  );
};

export default FAQs;