/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import services from "../services";
import * as Interface from "@/app/interface/NASAData.interface";
import utils from "../utils";
const MarsPhotos = () => {
  const [photos, setPhotos] = useState<Interface.IMarsPhoto[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      const date = utils.generateDate();
      const data = await services.NASAAPIService.getMarsRoverPic(date);

      if (data && Array.isArray(data.photos)) {
        setPhotos(data.photos);
      } else {
        setPhotos([]); // Ensure it's always an array
        console.error("Unexpected API response:", data);
      }
    };
    getPhotos();
  }, []);

  return (
    <div
      className="container text-center py-4"
      style={{ color: "white" }}
    >
      <h1 className="mb-4">Mars Rover Photos</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {Array.isArray(photos) && photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="col">
              <div className="card bg-dark text-white shadow-lg">
                <img
                  src={photo.img_src}
                  alt={photo.camera.full_name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{photo.camera.full_name}</h5>
                  <p className="card-text">
                    <strong>Rover:</strong> {photo.rover.name}
                  </p>
                  <p className="card-text">
                    <strong>Earth Date:</strong> {photo.earth_date}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading or no data available...</p>
        )}
      </div>
    </div>
  );
};

export default MarsPhotos;
