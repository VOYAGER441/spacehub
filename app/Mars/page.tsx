"use client";
import MarsWeather from "../component/MarsWeather";
import SpaceNavbar from "../component/SpaceNavbar";
import VantaWaves from "../component/VantaWaves";

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
         <MarsWeather/>
        </div>
      </div>
    </div>
  );
}

export default Page;
