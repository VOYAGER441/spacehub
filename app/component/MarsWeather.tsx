"use client";
import React, { useEffect, useState } from "react";
import services from "../services";
import styles from "./MarsWeather.module.css";
import * as Interface from "@/app/interface/NASAData.interface";

const MarsWeather = () => {
  const [weather, setWeather] = useState<Interface.IMarsWeatherData>();

  useEffect(() => {
    const getWeather = async () => {
      const data = await services.NASAAPIService.getMarsWeather();
      if (data) setWeather(data);
    };
    getWeather();
  }, []);

  return (
    <div className={`container-fluid ${styles.backgroundStyle}`}>
      <h2 className={styles.heading}>Mars Weather Report</h2>
      <div className="row justify-content-center">
        {weather ? (
          Object.keys(weather)
            .slice(0, 5)
            .map((sol) => (
              <div key={sol} className="col-12 col-md-4">
                <div className={`${styles.cardStyle}`}>
                  <h4>Sol {sol} (Earth Date: {new Date(weather[sol].First_UTC).toDateString()})</h4>
                  <p className={styles.temp}>High: {weather[sol].AT.mx.toFixed(1)}°F</p>
                  <p className={styles.temp}>Low: {weather[sol].AT.mn.toFixed(1)}°F</p>
                  <p>Average: {weather[sol].AT.av.toFixed(1)}°F</p>
                  <p>Pressure: {weather[sol].PRE.av.toFixed(1)} Pa</p>
                  <p>Wind Speed: {weather[sol].HWS.av.toFixed(1)} m/s</p>
                  <p>Wind Direction: {weather[sol].WD.most_common.compass_point}</p>
                  <p>Season: {weather[sol].Season} ({weather[sol].Northern_season} - North, {weather[sol].Southern_season} - South)</p>
                </div>
              </div>
            ))
        ) : (
          <p className={styles.loading}>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default MarsWeather;