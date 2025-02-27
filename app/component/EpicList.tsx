/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import services from "../services";
import EpicImage from "./EpicImage";
import Slider from "react-slick";
import * as Interface from "@/app/interface/NASAData.interface";
import styles from "./EpicList.module.css";

const AU = 149600000; // 1 Astronomical Unit (Earth to Sun distance)
const MOON_AVG_DIST = 384400; // Average Earth-Moon distance in km

const EpicList = () => {
  const [images, setImages] = useState<Interface.EpicImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active image index

  useEffect(() => {
    services.NASAAPIService.getEpic()
      .then(setImages)
      .catch((err) => setError(err.message || "Failed to load images"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center text-white py-3">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-danger py-3">
        Error loading images: {error}
      </div>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setActiveIndex(index), // Update activeIndex when slide changes
  };

  const activeImage = images[activeIndex] || {}; // Fallback to empty object if no image data

  // Extract NASA data and normalize distances
  const earthToSun = activeImage.dscovr_j2000_position?.x
    ? AU
    : "149.6 million"; // Approximate 1 AU if missing
  const earthToMoon = activeImage.dscovr_j2000_position?.y
    ? Math.abs(activeImage.dscovr_j2000_position.y).toFixed(0)
    : MOON_AVG_DIST;

  const epicToSun = activeImage.dscovr_j2000_position?.x
    ? Math.abs(activeImage.dscovr_j2000_position.x).toFixed(0)
    : "Unknown";

  const epicToMoon = activeImage.lunar_j2000_position?.x
    ? Math.abs(activeImage.lunar_j2000_position.x).toFixed(0)
    : "Unknown";

  const earthToEpic = activeImage.lunar_j2000_position?.y
    ? Math.abs(activeImage.lunar_j2000_position.y).toFixed(0)
    : "Unknown";

  // Fix SEV Angle Calculation
  const sevAngleRaw = activeImage?.sun_j2000_position?.z || 0;
  let sevAngle = "Unknown";
  if (Math.abs(sevAngleRaw) > 1000) {
    // If value is too large, scale it down (adjust factor as needed)
    sevAngle = (sevAngleRaw / 1e6).toFixed(2) + "°";
  } else {
    // Convert radians to degrees
    sevAngle = (sevAngleRaw * (180 / Math.PI)).toFixed(2) + "°";
  }
  return (
    <div className={`${styles.epicContainer} container-fluid`}>
      <div className="row d-flex flex-column flex-md-row align-items-center">
        {/* Left - Image Slider */}
        <div className="col-md-6">
          <Slider {...settings} className={styles.epicSlider}>
            {images.map((img) => (
              <EpicImage
                key={img.identifier}
                image={img.image}
                caption={img.caption}
                date={img.date.split(" ")[0]}
              />
            ))}
          </Slider>
        </div>

        {/* Right - Data Section (Dynamically Updated) */}
        <div className="col-md-6">
          <div className={styles.dataCard}>
            <h2 className="text-center">Image Data</h2>
            {activeImage && (
              <>
                <p>🌍 Earth to Sun: {earthToSun} km</p>
                <p>🌕 Earth to Moon: {earthToMoon} km</p>
                <p>🔭 EPIC to Sun: {epicToSun} km</p>
                <p>🚀 EPIC to Moon: {epicToMoon} km</p>
                <p>🌎 Earth to EPIC: {earthToEpic} km</p>
                <p>📐 SEV Angle: {sevAngle}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicList;
