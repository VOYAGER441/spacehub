"use client";
import React from "react";
import VantaWaves from "../component/VantaWaves";
import AstronomyPictureOfTheDay from "../component/PicOfTheDay";
import SpaceNavbar from "../component/SpaceNavbar";
import ASONews from "../component/ASONews";
import DonkiComponent from "../component/DonkiComponent";

function Page() {
  return (
    <div className="container" style={{ width: "100vw", height: "100vh" }}>
      <VantaWaves />
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
        className="row"
      >
        <div className={` `}>
          <SpaceNavbar />
          <AstronomyPictureOfTheDay />
          <h1 className="display-5 fw-bold mb-3 border-bottom pb-2 text-center text-white">
            Other Application
          </h1>
          <ASONews/>
          <DonkiComponent/>
        </div>
      </div>
    </div>
  );
}

export default Page;
