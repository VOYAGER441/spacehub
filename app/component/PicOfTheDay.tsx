/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import React, { useEffect, useState } from "react";
import styles from "./PicOfTheDay.module.css";
import services from "../services";
import * as Interface from '@/app/interface/NASAData.interface'

const AstronomyPictureOfTheDay =  () => {

  const [data, setData] = useState<Interface.IPicOfTheDay|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await services.NASAAPIService.getPicOfTheDay();
  
        if (fetchedData) {
          setData(fetchedData); // Set fetched object directly
        } else {
          console.warn("Fetched data is invalid or empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  


  
  


  return (
    <div className="container py-2" >
      <section
        className="row justify-content-center align-items-center text-center text-white"
        style={{
          backgroundImage: `url(${data?.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          borderRadius: "20px",
          position: "relative",
          overflow: "hidden",
          // height:"80vh"
        }}
      >
        <div className={styles.overlay}></div>

        <div className={`col-lg-6 col-md-8 col-sm-10 p-4 ${styles.main}`}>
          <h1 className="display-5 fw-bold mb-3 border-bottom pb-2">Astronomy Picture of the Day</h1>
          <h2 className="h3 fw-semibold mb-4">{data?.title}</h2>

          <p className="lead text-justify" style={{ lineHeight: 1.8 }}>{data?.explanation}</p>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <small className="text-muted"> {data?.date}</small>
            <span className="badge bg-success">© {data?.copyright}</span>
          </div>

          <a
            href={data?.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info mt-4"
          >
            View HD Image
          </a>
        </div>
      </section>
    </div>
  );
};

export default AstronomyPictureOfTheDay;
