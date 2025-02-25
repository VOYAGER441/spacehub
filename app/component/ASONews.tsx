/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import styles from "./ASONews.module.css";
import * as Interface from "../interface/NASAData.interface";
import services from "../services";

const ASONews = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [asteroids, setAsteroids] = useState<Interface.IASONews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAsteroids = async () => {
    if (!startDate || !endDate) {
      setError("⚠️ Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setError("");
    setAsteroids([]);

    try {
      const data = await services.NASAAPIService.getASONews(startDate, endDate);

      if (data && Object.keys(data.near_earth_objects).length > 0) {
        const fetchedAsteroids: Interface.IASONews[] = Object.values(data.near_earth_objects)
          .flat()
          .map((neo: any) => ({
            id: neo.id,
            name: neo.name,
            closeApproachDate: neo.close_approach_data?.[0]?.close_approach_date || "N/A",
            diameter: Math.round(neo.estimated_diameter.meters.estimated_diameter_max),
            speed: Math.round(neo.close_approach_data?.[0]?.relative_velocity.kilometers_per_hour || 0),
            missDistance: Math.round(neo.close_approach_data?.[0]?.miss_distance.kilometers || 0),
            hazardous: neo.is_potentially_hazardous_asteroid,
            nasaUrl: neo.nasa_jpl_url
          }));

        setAsteroids(fetchedAsteroids);
      } else {
        setError("⚠️ No asteroid data found for the selected dates.");
      }
    } catch (err) {
      setError("❌ Failed to fetch data. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌠 Asteroid Tracker</h1>

      {/* Date Inputs */}
      <div className={styles.dateInputs}>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button onClick={fetchAsteroids} className={styles.button}>
          🔍 Search
        </Button>
      </div>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Loading Spinner */}
      {loading && <Spinner animation="border" className={styles.spinner} />}

      {/* Asteroid Data Table */}
      {!loading && asteroids.length > 0 && (
        <Table striped bordered hover variant="dark" className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Close Approach</th>
              <th>Diameter (m)</th>
              <th>Speed (km/h)</th>
              <th>Miss Distance (km)</th>
              <th>Hazardous?</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {asteroids.map((asteroid) => (
              <tr key={asteroid.id} className={asteroid.hazardous ? styles.hazardous : ""}>
                <td>{asteroid.name}</td>
                <td>{asteroid.closeApproachDate}</td>
                <td>{asteroid.diameter}</td>
                <td>{asteroid.speed}</td>
                <td>{asteroid.missDistance}</td>
                <td>{asteroid.hazardous ? "⚠️ Yes" : "No"}</td>
                <td>
                  <a href={asteroid.nasaUrl} target="_blank" rel="noopener noreferrer">
                    🔗 NASA
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ASONews;
