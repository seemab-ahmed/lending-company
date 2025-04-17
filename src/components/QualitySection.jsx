import React, { lazy, Suspense } from "react";
import "../css/QualitySection.css"; 

const LazyImage = lazy(() => import("./LazyImage"));

const QualitySection = ({ preHeader, mainHeading, description, buttonText, buttonLink, backgroundImage }) => {
  return (
    <section
      className="quality"
      style={{
        backgroundImage: `linear-gradient(rgba(47, 62, 71, 0.706), rgba(47, 62, 71, 0.706)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="quality-top">
          <span className="pre-header" data-aos="fade-up">{preHeader}</span>
          <h2 className="secondry-heading" data-aos="fade-up">{mainHeading}</h2>
          <p className="default-text" data-aos="fade-up">{description}</p>
          {buttonText && buttonLink && (
          <a href={buttonLink} className="secondry-btn">
            {buttonText}
          </a>
          )}
        </div>
      </div>

      {/* Lazy Load Image */}
      <Suspense fallback={<div style={{ height: "100px" }} />}>
        <LazyImage src={backgroundImage} alt={mainHeading} loading="lazy" />
      </Suspense>
    </section>
  );
};

export default QualitySection;
