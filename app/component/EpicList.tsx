import React, { useEffect, useState } from "react";
import services from "../services";
import EpicImage from "./EpicImage";
import Slider from "react-slick";
import * as Interface from "@/app/interface/NASAData.interface";

const EpicList = () => {
  const [images, setImages] = useState<Interface.EpicImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    services.NASAAPIService.getEpic()
      .then(setImages)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="text-center text-white py-3">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-danger py-3">Error loading images</div>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container-fluid  text-white py-4">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <Slider {...settings}>
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
      </div>
      <div className="row mt-4">
        <div className="col-md-6 col-lg-4 mx-auto bg-dark p-3 rounded shadow">
          <h2 className="text-center">Image Data</h2>
          <p>🌍 Earth to Sun: 148,090,803 km</p>
          <p>🌕 Earth to Moon: 377,819 km</p>
          <p>🔭 EPIC to Sun: 146,602,872 km</p>
          <p>🚀 EPIC to Moon: 1,283,585 km</p>
          <p>🌎 Earth to EPIC: 1,508,985 km</p>
          <p>📐 SEV Angle: 9.53°</p>
        </div>
      </div>
    </div>
  );
};

export default EpicList;
